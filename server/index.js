/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";
import dotenv from "dotenv";

dotenv.config();
import crypto from "crypto";

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function generateToken(payload) {
  const header = Buffer.from(
    JSON.stringify({ alg: "HS256", typ: "JWT" }),
  ).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const secret = process.env.JWT_SECRET || "super_secret_school_key";
  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${header}.${body}`)
    .digest("base64url");
  return `${header}.${body}.${signature}`;
}

function verifyToken(token) {
  try {
    const [header, body, signature] = token.split(".");
    const secret = process.env.JWT_SECRET || "super_secret_school_key";
    const expectedSig = crypto
      .createHmac("sha256", secret)
      .update(`${header}.${body}`)
      .digest("base64url");
    if (signature !== expectedSig) return null;
    return JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch (e) {
    return null;
  }
}

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      return next();
    }
  }

  // Fallback to body/query requester_id for backward compatibility
  const requesterId = req.body?.requester_id || req.query?.requester_id;
  if (requesterId) {
    const user = await UserModel.findOne({ id: requesterId }).lean();
    if (user) {
      req.user = { id: user.id, email: user.email, role: user.role };
      return next();
    }
  }

  return res
    .status(401)
    .json({ error: "Unauthorized. Valid authentication session required." });
};

import { GoogleGenAI, Type } from "@google/genai";

import { connectDB } from "./db.js";
import {
  UserModel,
  ApplicationModel,
  SchoolCardModel,
  AuditLogModel,
  TeacherProfileModel,
  ClassItemModel,
  SchoolInfoModel,
  SignatureModel,
  ParentModel,
} from "./models.js";

let geminiClient = null;
function getGeminiClient() {
  if (!geminiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    geminiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

async function generateContentWithFallback(aiClient, params) {
  const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite"];
  let lastError = null;
  for (const model of modelsToTry) {
    const maxRetries = 2; // Try up to 2 times (3 attempts total) for each model
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        console.log(
          `Querying Gemini API using model: ${model} (attempt ${attempt + 1})`,
        );
        const response = await aiClient.models.generateContent({
          ...params,
          model,
        });
        return response;
      } catch (error) {
        lastError = error;
        console.warn(
          `Attempt ${attempt + 1} with model ${model} failed. Error:`,
          error.message || error,
        );
        const isRetryable =
          error.status === 503 ||
          error.status === 429 ||
          (error.message &&
            (error.message.includes("503") ||
              error.message.includes("429") ||
              error.message.includes("UNAVAILABLE") ||
              error.message.includes("RESOURCE_EXHAUSTED") ||
              error.message.includes("overloaded") ||
              error.message.includes("demand")));
        if (!isRetryable && attempt === maxRetries) {
          break;
        }
        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 1000 + Math.random() * 500;
          console.log(`Waiting ${delay.toFixed(0)}ms before retrying...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }
  }
  throw lastError || new Error("All model attempts failed");
}

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// --- INITIAL DATA ---
const initialUsers = [
  {
    id: "usr_admin",
    first_name: "Sarah",
    last_name: "Ouédraogo",
    email: "admin@school.edu",
    role: "admin",
    preferred_language: "en",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "usr_student1",
    first_name: "Ibrahim",
    last_name: "Sawadogo",
    email: "student@school.edu",
    role: "student",
    preferred_language: "fr",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "usr_student2",
    first_name: "Adama",
    last_name: "Kaboré",
    email: "adama.kabore@school.edu",
    role: "student",
    preferred_language: "fr",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "usr_student3",
    first_name: "Mariam",
    last_name: "Diallo",
    email: "mariam.diallo@school.edu",
    role: "student",
    preferred_language: "en",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "usr_student4",
    first_name: "Fatoumata",
    last_name: "Traoré",
    email: "fatoumata.traore@school.edu",
    role: "student",
    preferred_language: "fr",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "usr_teacher1",
    first_name: "Salif",
    last_name: "Barro",
    email: "teacher@school.edu",
    role: "teacher",
    preferred_language: "en",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "usr_teacher2",
    first_name: "Boubacar",
    last_name: "Compaoré",
    email: "feynman@school.edu",
    role: "teacher",
    preferred_language: "en",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "usr_principal",
    first_name: "Alassane",
    last_name: "Sana",
    email: "principal@school.edu",
    role: "principal",
    preferred_language: "en",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const initialApplications = [
  {
    id: "app_student1",
    student_id: "usr_student1",
    target_class: "Grade 10-A",
    last_school_name: "Lycée Philippe Zinda Kaboré",
    last_general_grade: 11.5,
    transcript_file_name: "releve_de_notes_ibrahim.pdf",
    payment_receipt_name: "recu_inscription_ibrahim.png",
    recommendation_letter_name: "lettre_recommandation_ibrahim.pdf",
    status: "pending",
    rejection_reason: null,
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: "app_student2",
    student_id: "usr_student2",
    target_class: "Grade 11-A",
    last_school_name: "Lycée Municipal de Ouagadougou",
    last_general_grade: 18.2,
    transcript_file_name: "transcript_adama.pdf",
    payment_receipt_name: "receipt_adama.png",
    recommendation_letter_name: "recommendation_adama.pdf",
    status: "approved",
    rejection_reason: null,
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  {
    id: "app_student3",
    student_id: "usr_student3",
    target_class: "Grade 12-A",
    last_school_name: "Collège de la Salle Ouagadougou",
    last_general_grade: 19.5,
    transcript_file_name: "transcript_mariam.pdf",
    payment_receipt_name: "receipt_mariam.png",
    recommendation_letter_name: "recommendation_mariam.pdf",
    status: "approved",
    rejection_reason: null,
    created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
  },
  {
    id: "app_student4",
    student_id: "usr_student4",
    target_class: "Grade 10-B",
    last_school_name: "Lycée Ouezzin Coulibaly de Bobo",
    last_general_grade: 8.5,
    transcript_file_name: "releve_fatoumata.pdf",
    payment_receipt_name: "recu_fatoumata.pdf",
    recommendation_letter_name: "lettre_fatoumata.pdf",
    status: "rejected",
    rejection_reason:
      "The academic transcripts show a general grade below our minimum threshold of 10.00/20.00.",
    created_at: new Date(Date.now() - 3600000 * 96).toISOString(),
  },
];

const initialSchoolCards = [
  {
    id: "card_student2",
    student_id: "usr_student2",
    profile_photo_url: "",
    card_status: "generated",
    generated_pdf_url: "/api/id-cards/download/usr_student2",
    created_at: new Date().toISOString(),
    valid_until: "2027-06-30",
  },
];

const initialAuditLogs = [
  {
    id: "log_pre_1",
    timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
    user_id: "usr_admin",
    user_email: "admin@school.edu",
    user_role: "admin",
    action: "SYSTEM_START",
    details:
      "Lycée Privé Alassane Sana Student Information System initialized successfully.",
  },
  {
    id: "log_pre_2",
    timestamp: new Date(Date.now() - 3600000 * 36).toISOString(),
    user_id: "usr_admin",
    user_email: "admin@school.edu",
    user_role: "admin",
    action: "SCHOOL_SETTINGS_CHANGED",
    details:
      'School general configuration updated: Motto set to "Excellence, Discipline, Progress".',
  },
  {
    id: "log_pre_3",
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    user_id: "usr_admin",
    user_email: "admin@school.edu",
    user_role: "admin",
    action: "TEACHER_ADDED",
    details:
      "Teacher Sarah Ouédraogo profile created with assigned curriculum details.",
  },
];

const initialTeacherProfiles = [
  {
    id: "usr_teacher1",
    qualifications: "Ph.D. in Theoretical Physics",
    experience_years: 15,
    curriculum_notes:
      "Teaching advanced quantum electrodynamics and thermodynamics syllabus tracking.",
    assigned_classes: ["Grade 12-A", "Grade 11-A"],
    assigned_courses: ["Physics", "Advanced Mathematics"],
  },
  {
    id: "usr_teacher2",
    qualifications: "Ph.D. in Physics (Nobel Laureate)",
    experience_years: 12,
    curriculum_notes:
      "Focusing on conceptual physics, quantum mechanics, and interactive student seminars.",
    assigned_classes: ["Grade 10-A", "Grade 11-B"],
    assigned_courses: ["Physics", "Chemistry"],
  },
];

const initialClasses = [
  {
    id: "c1",
    name: "Grade 10-A",
    capacity: 30,
    subjects: ["Physics", "Chemistry", "Advanced Mathematics"],
    teachers: [
      { teacher_id: "usr_teacher2", topic: "Chemistry" },
      { teacher_id: "usr_teacher1", topic: "Physics" },
    ],
  },
  {
    id: "c2",
    name: "Grade 10-B",
    capacity: 30,
    subjects: ["Physics", "Chemistry"],
    teachers: [],
  },
  {
    id: "c3",
    name: "Grade 11-A",
    capacity: 25,
    subjects: ["Advanced Mathematics", "Physics"],
    teachers: [{ teacher_id: "usr_teacher1", topic: "Advanced Mathematics" }],
  },
  {
    id: "c4",
    name: "Grade 11-B",
    capacity: 25,
    subjects: ["Physics", "Chemistry"],
    teachers: [],
  },
  {
    id: "c5",
    name: "Grade 12-A",
    capacity: 20,
    subjects: ["Physics", "Advanced Mathematics"],
    teachers: [{ teacher_id: "usr_teacher1", topic: "Physics" }],
  },
];

const initialSchoolInfo = {
  id: "default_school_info",
  name: "College LA SALE",
  logo_url: "",
  history:
    "Founded in 1982, College LA SALE has been a beacon of academic excellence and intellectual integrity for over four decades. Our curriculum blends rigorous scientific inquiry with classical humanities, fostering an environment where curiosity is celebrated and potential is fully realized.",
  references:
    "Accredited by the International Council of Schools, Partnered with European Physics League, Recipient of the National Scientific Initiative Award 2024.",
  contact_email: "info@school.edu",
  contact_phone: "+33 1 42 76 00 00",
  contact_address: "12 Avenue des Sciences, 75005 Paris, France",
  geolocation_lat: 48.8462,
  geolocation_lng: 2.3447,
  map_iframe_url:
    "https://maps.google.com/maps?q=48.8462,2.3447&t=&z=13&ie=UTF8&iwloc=&output=embed",
  motto: "Excellence, Discipline, Progress",
  established_year: 1982,
  principal_name: "Hamado Simean",
  website_url: "https://lasale.edu",
  color_theme: "#2563eb",
};

async function seedDatabase() {
  if ((await UserModel.countDocuments()) === 0) {
    const hashedUsers = initialUsers.map((u) => ({
      ...u,
      password: hashPassword("password"),
    }));
    await UserModel.insertMany(hashedUsers);
  }
  if ((await ApplicationModel.countDocuments()) === 0)
    await ApplicationModel.insertMany(initialApplications);
  if ((await SchoolCardModel.countDocuments()) === 0)
    await SchoolCardModel.insertMany(initialSchoolCards);
  if ((await AuditLogModel.countDocuments()) === 0)
    await AuditLogModel.insertMany(initialAuditLogs);
  if ((await TeacherProfileModel.countDocuments()) === 0)
    await TeacherProfileModel.insertMany(initialTeacherProfiles);
  if ((await ClassItemModel.countDocuments()) === 0)
    await ClassItemModel.insertMany(initialClasses);
  if ((await SchoolInfoModel.countDocuments()) === 0) {
    await SchoolInfoModel.create({
      ...initialSchoolInfo,
      school_year: "2025-2026",
    });
  } else {
    await SchoolInfoModel.updateOne(
      { id: "default_school_info" },
      {
        $set: {
          name: "College LA SALE",
          principal_name: "Hamado Simean",
          school_year: "2025-2026",
        },
      },
    );
  }
  if ((await SignatureModel.countDocuments()) === 0) {
    await SignatureModel.create({
      id: "sig_hamado",
      principal: "usr_principal",
      first_name: "Hamado",
      last_name: "Simean",
      name: "Hamado Simean",
      year: "2025-2026",
      is_current: true,
      signature: null,
    });
  } else {
    // Migration script: update legacy principal signatures that lack the principal field
    await SignatureModel.updateMany(
      { principal: { $exists: false } },
      {
        $set: {
          principal: "usr_principal",
          first_name: "Alassane",
          last_name: "Sana",
          name: "Alassane Sana",
          year: "2025-2026",
          is_current: true,
        },
      },
    );
  }
}

// Helper to send email alerts via EmailJS or simulate in Console
async function simulateEmailAlert(user, subject, body) {
  const SERVICE_ID = process.env.VITE_SERVICE_ID || process.env.SERVICE_ID;
  const TEMPLATE_ID = process.env.VITE_TEMPLATE_ID || process.env.TEMPLATE_ID;
  const PUBLIC_KEY = process.env.VITE_PUBLIC_KEY || process.env.PUBLIC_KEY;

  if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
    try {
      const payload = {
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        template_params: {
          to_name: `${user.first_name} ${user.last_name}`,
          to_email: user.email,
          subject: subject,
          message: body,
        }
      };

      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log(`[EMAIL DISPATCH] Successfully sent email to ${user.email} via EmailJS`);
      } else {
        const errorText = await response.text();
        console.error(`[EMAIL DISPATCH] Failed to send email via EmailJS: ${errorText}`);
      }
    } catch (error) {
      console.error(`[EMAIL DISPATCH] Error calling EmailJS API:`, error.message);
    }
  } else {
    console.log(`[EMAIL DISPATCH] Missing EmailJS credentials, falling back to local simulation.`);
  }

  console.log(`\n======================================================`);
  console.log(`[EMAIL DISPATCH SIMULATOR]`);
  console.log(`To: ${user.first_name} ${user.last_name} <${user.email}>`);
  console.log(`Language: ${user.preferred_language?.toUpperCase() || "EN"}`);
  console.log(`Subject: ${subject}`);
  console.log(`------------------------------------------------------`);
  console.log(body);
  console.log(`======================================================\n`);
}

// --- REST API ENDPOINTS ---
app.post("/api/auth/register", async (req, res) => {
  const { first_name, last_name, email, password, role, preferred_language } =
    req.body;
  if (!first_name || !last_name || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required." });
  }
  const existing = await UserModel.findOne({
    email: { $regex: new RegExp("^" + email + "$", "i") },
  });
  if (existing) {
    return res.status(400).json({ error: "Email address already registered." });
  }
  const userId = `usr_${Math.random().toString(36).substring(2, 11)}`;
  const newUser = await UserModel.create({
    id: userId,
    first_name,
    last_name,
    email,
    role,
    password: hashPassword(password),
    preferred_language: preferred_language || "en",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
  if (role === "teacher") {
    await TeacherProfileModel.create({
      id: userId,
      qualifications: "",
      experience_years: 0,
      curriculum_notes: "",
      assigned_classes: [],
      assigned_courses: [],
    });
  }
  const token = generateToken({
    id: newUser.id,
    email: newUser.email,
    role: newUser.role,
  });
  return res.status(201).json({ user: newUser.toObject(), token });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }
  const user = await UserModel.findOne({
    email: { $regex: new RegExp("^" + email + "$", "i") },
  }).lean();
  if (!user) {
    return res.status(401).json({
      error: "Invalid email or password.",
    });
  }
  const hashed = hashPassword(password);
  const isValid = user.password
    ? user.password === hashed
    : password === "password";
  if (!isValid) {
    return res.status(401).json({
      error: "Invalid email or password.",
    });
  }
  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });
  return res.json({ user, token });
});

app.get("/api/users", async (req, res) => {
  const users = await UserModel.find({ is_active: { $ne: false } }).lean();
  return res.json(users);
});

app.post("/api/admins", async (req, res) => {
  const { first_name, last_name, email, password, preferred_language } =
    req.body;
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }
  const existing = await UserModel.findOne({
    email: { $regex: new RegExp("^" + email + "$", "i") },
  });
  if (existing) {
    return res.status(400).json({ error: "Email address already registered." });
  }
  const userId = `usr_${Math.random().toString(36).substring(2, 11)}`;
  const newUser = await UserModel.create({
    id: userId,
    first_name,
    last_name,
    email,
    role: "admin",
    password: hashPassword(password),
    preferred_language: preferred_language || "en",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
  return res.status(201).json(newUser.toObject());
});

app.delete("/api/admins/:id", async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findOne({ id, role: "admin" });
  if (!user) {
    return res
      .status(404)
      .json({ error: "Administrator not found or is not an admin." });
  }
  await UserModel.deleteOne({ id, role: "admin" });
  return res.json({
    success: true,
    message: "Administrator removed successfully.",
  });
});

app.put("/api/auth/profile", async (req, res) => {
  const {
    id,
    first_name,
    last_name,
    preferred_language,
    parent_full_name,
    parent_phone,
    parent_place_of_living,
  } = req.body;
  const user = await UserModel.findOne({ id });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  if (first_name) user.first_name = first_name;
  if (last_name) user.last_name = last_name;
  if (preferred_language) user.preferred_language = preferred_language;
  user.updated_at = new Date().toISOString();
  await user.save();

  let parent = await ParentModel.findOne({ student_id: id });
  if (!parent) {
    parent = await ParentModel.create({
      id: `parent_${Math.random().toString(36).substring(2, 11)}`,
      student_id: id,
      created_at: new Date().toISOString(),
    });
  }
  if (parent_full_name !== undefined) parent.full_name = parent_full_name;
  if (parent_phone !== undefined) parent.phone = parent_phone;
  if (parent_place_of_living !== undefined)
    parent.place_of_living = parent_place_of_living;
  parent.updated_at = new Date().toISOString();
  await parent.save();

  const userObj = user.toObject();
  userObj.parent_full_name = parent.full_name;
  userObj.parent_phone = parent.phone;
  userObj.parent_place_of_living = parent.place_of_living;

  return res.json(userObj);
});

app.get("/api/applications", async (req, res) => {
  const { student_id } = req.query;
  let query = {};
  if (student_id) query.student_id = student_id;
  const apps = await ApplicationModel.find(query).lean();
  return res.json(apps);
});

app.post("/api/applications", async (req, res) => {
  const {
    student_id,
    target_class,
    last_school_name,
    last_general_grade,
    parent_full_name,
    parent_phone,
    parent_place_of_living,
    transcript_file_name,
    payment_receipt_name,
    recommendation_letter_name,
    transcript_base64,
    payment_receipt_base64,
    recommendation_letter_base64,
  } = req.body;
  if (
    !student_id ||
    !target_class ||
    !last_school_name ||
    last_general_grade === undefined
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  let parent = await ParentModel.findOne({ student_id });
  if (!parent) {
    parent = await ParentModel.create({
      id: `parent_${Math.random().toString(36).substring(2, 11)}`,
      student_id,
      created_at: new Date().toISOString(),
    });
  }
  if (parent_full_name !== undefined) parent.full_name = parent_full_name;
  if (parent_phone !== undefined) parent.phone = parent_phone;
  if (parent_place_of_living !== undefined)
    parent.place_of_living = parent_place_of_living;
  parent.updated_at = new Date().toISOString();
  await parent.save();

  await ApplicationModel.deleteMany({ student_id });
  const newApp = await ApplicationModel.create({
    id: `app_${Math.random().toString(36).substring(2, 11)}`,
    student_id,
    target_class,
    last_school_name,
    last_general_grade: Number(last_general_grade),
    parent_full_name: parent_full_name || "",
    parent_phone: parent_phone || "",
    parent_place_of_living: parent_place_of_living || "",
    transcript_file_name: transcript_file_name || "transcript.pdf",
    payment_receipt_name: payment_receipt_name || "receipt.png",
    recommendation_letter_name: recommendation_letter_name || "letter.pdf",
    transcript_base64,
    payment_receipt_base64,
    recommendation_letter_base64,
    status: "pending",
    rejection_reason: null,
    created_at: new Date().toISOString(),
  });
  return res.status(201).json(newApp.toObject());
});

app.post("/api/applications/:id/evaluate", async (req, res) => {
  const { id } = req.params;
  const { status, rejection_reason } = req.body;
  const app = await ApplicationModel.findOne({ id });
  if (!app) {
    return res.status(404).json({ error: "Application not found." });
  }
  if (status === "rejected" && !rejection_reason) {
    return res.status(400).json({
      error: "Rejection reason is required for rejected applications.",
    });
  }

  const sigDoc = await SignatureModel.findOne({ is_current: true });
  const principalSignature = sigDoc ? sigDoc.signature : null;

  if (status === "approved" && !principalSignature) {
    return res.status(400).json({
      error:
        "Principal signature must be added in School Settings before approving applications (as this generates an active Student Card).",
    });
  }
  app.status = status;
  app.rejection_reason = status === "rejected" ? rejection_reason : null;
  await app.save();

  const student = await UserModel.findOne({ id: app.student_id });
  if (student) {
    const isFr = student.preferred_language === "fr";
    let subject = "";
    let body = "";
    if (status === "approved") {
      subject = isFr
        ? "Félicitations - Admission Approuvée !"
        : "Congratulations - Admission Approved!";
      body = isFr
        ? `Cher ${student.first_name} ${student.last_name},\n\nNous sommes ravis de vous informer que votre demande d'inscription pour la classe ${app.target_class} a été APPROUVÉE ! Vous êtes chaleureusement accueilli au sein de l'Académie Saint-Jude.\n\nVotre carte d'étudiant digitale a été AUTOMATIQUEMENT générée. Vous pouvez vous connecter à votre portail pour la visualiser.\n\nCordialement,\nLe Bureau des Admissions`
        : `Dear ${student.first_name} ${student.last_name},\n\nWe are delighted to inform you that your application for ${app.target_class} has been APPROVED! You are warmly welcomed into the Lycee LA SALE.\n\nYour digital student ID card has been AUTOMATICALLY created. You can log in to your portal to view it.\n\nBest regards,\nThe Admissions Office`;

      const existingCard = await SchoolCardModel.findOne({
        student_id: student.id,
      });
      if (!existingCard) {
        const oneYear = new Date();
        oneYear.setFullYear(oneYear.getFullYear() + 1);
        await SchoolCardModel.create({
          id: `card_${Math.random().toString(36).substring(2, 11)}`,
          student_id: student.id,
          profile_photo_url: "",
          card_status: "generated",
          generated_pdf_url: `/api/id-cards/download/${student.id}`,
          created_at: new Date().toISOString(),
          valid_until: oneYear.toISOString().split("T")[0],
        });
      } else {
        existingCard.card_status = "generated";
        existingCard.generated_pdf_url = `/api/id-cards/download/${student.id}`;
        if (!existingCard.valid_until) {
          const oneYear = new Date();
          oneYear.setFullYear(oneYear.getFullYear() + 1);
          existingCard.valid_until = oneYear.toISOString().split("T")[0];
        }
        await existingCard.save();
      }
    } else {
      subject = isFr
        ? "Mise à jour concernant votre demande d'inscription"
        : "Admissions Update - Registration Request";
      body = isFr
        ? `Cher ${student.first_name} ${student.last_name},\n\nNous regrettons de vous informer que votre demande d'inscription n'a pas été retenue pour la raison suivante :\n\n"${rejection_reason}"\n\nN'hésitez pas à nous contacter pour toute autre question.\n\nCordialement,\nLe Bureau des Admissions`
        : `Dear ${student.first_name} ${student.last_name},\n\nWe regret to inform you that your registration application has been rejected due to the following reason:\n\n"${rejection_reason}"\n\nPlease feel free to reach out for further clarification.\n\nBest regards,\nThe Admissions Office`;
    }
    simulateEmailAlert(student, subject, body);
  }
  return res.json(app.toObject());
});

app.get("/api/id-cards", async (req, res) => {
  const cards = await SchoolCardModel.find().lean();
  const activeCards = [];
  for (const c of cards) {
    const student = await UserModel.findOne({ id: c.student_id });
    if (student && student.is_active !== false) {
      activeCards.push(c);
    }
  }
  return res.json(activeCards);
});

app.post("/api/id-cards/request", async (req, res) => {
  const { student_id, profile_photo_url } = req.body;
  if (!student_id || !profile_photo_url) {
    return res
      .status(400)
      .json({ error: "Student ID and profile photo are required." });
  }
  await SchoolCardModel.deleteMany({ student_id });
  const oneYear = new Date();
  oneYear.setFullYear(oneYear.getFullYear() + 1);
  const newCard = await SchoolCardModel.create({
    id: `card_${Math.random().toString(36).substring(2, 11)}`,
    student_id,
    profile_photo_url,
    card_status: "pending",
    generated_pdf_url: null,
    created_at: new Date().toISOString(),
    valid_until: oneYear.toISOString().split("T")[0],
  });
  return res.status(201).json(newCard.toObject());
});

app.post("/api/id-cards/:id/approve", async (req, res) => {
  const { id } = req.params;
  const card = await SchoolCardModel.findOne({ id });
  if (!card) {
    return res.status(404).json({ error: "ID card request not found." });
  }
  const sigDoc = await SignatureModel.findOne({ is_current: true });
  const principalSignature = sigDoc ? sigDoc.signature : null;
  if (!principalSignature) {
    return res.status(400).json({
      error:
        "Principal signature must be added in School Settings before approving ID cards.",
    });
  }
  const oneYear = new Date();
  oneYear.setFullYear(oneYear.getFullYear() + 1);
  card.card_status = "generated";
  card.generated_pdf_url = `/api/id-cards/download/${card.student_id}`;
  if (!card.valid_until) {
    card.valid_until = oneYear.toISOString().split("T")[0];
  }
  await card.save();
  return res.json(card.toObject());
});

app.get("/api/school-info", async (req, res) => {
  const info = await SchoolInfoModel.findOne({
    id: "default_school_info",
  }).lean();
  const schoolInfo = info || { ...initialSchoolInfo };

  // Resolve dynamic principal name from active signature record
  const currentSigDoc = await SignatureModel.findOne({ is_current: true });
  if (currentSigDoc && currentSigDoc.principal) {
    const pUser = await UserModel.findOne({
      id: currentSigDoc.principal,
    }).lean();
    if (pUser) {
      schoolInfo.principal_name = `${pUser.first_name} ${pUser.last_name}`;
    }
  }

  return res.json(schoolInfo);
});

app.put("/api/school-info", async (req, res) => {
  const {
    name,
    logo_url,
    history,
    references,
    contact_email,
    contact_phone,
    contact_address,
    geolocation_lat,
    geolocation_lng,
    map_iframe_url,
    motto,
    established_year,
    principal_name,
    website_url,
    color_theme,
    school_year,
    requester_id,
  } = req.body;
  if (!name) {
    return res.status(400).json({ error: "School name is required." });
  }
  const updated = await SchoolInfoModel.findOneAndUpdate(
    { id: "default_school_info" },
    {
      name,
      logo_url: logo_url ?? "",
      history: history ?? "",
      references: references ?? "",
      contact_email: contact_email ?? "",
      contact_phone: contact_phone ?? "",
      contact_address: contact_address ?? "",
      geolocation_lat: Number(geolocation_lat ?? 0),
      geolocation_lng: Number(geolocation_lng ?? 0),
      map_iframe_url:
        map_iframe_url ??
        `https://maps.google.com/maps?q=${geolocation_lat},${geolocation_lng}&t=&z=13&ie=UTF8&iwloc=&output=embed`,
      motto: motto ?? "Excellence, Discipline, Progress",
      established_year: Number(established_year ?? 1982),
      principal_name: principal_name ?? "",
      website_url: website_url ?? "",
      color_theme: color_theme ?? "#2563eb",
      school_year: school_year ?? "2025-2026",
    },
    { new: true, upsert: true },
  );

  const requester =
    (await UserModel.findOne({ id: requester_id })) ||
    (await UserModel.findOne({ role: "admin" }));
  if (requester) {
    await AuditLogModel.create({
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString(),
      user_id: requester.id,
      user_email: requester.email,
      user_role: requester.role,
      action: "SCHOOL_SETTINGS_CHANGED",
      details: `Updated general school settings: ${name} (Motto: "${motto || ""}")`,
    });
  }
  return res.json(updated.toObject());
});

app.get("/api/principal/signature", async (req, res) => {
  const sigDoc = await SignatureModel.findOne({ is_current: true });
  return res.json({ signature: sigDoc ? sigDoc.signature : null });
});

app.post("/api/principal/signature", async (req, res) => {
  const { signature, requester_id } = req.body;
  const currentPrincipal = await SignatureModel.findOne({ is_current: true });
  if (!currentPrincipal) {
    return res.status(404).json({ error: "No active principal found." });
  }
  if (requester_id && currentPrincipal.principal !== requester_id) {
    return res
      .status(403)
      .json({ error: "Only the current principal can sign." });
  }
  currentPrincipal.signature = signature;
  await currentPrincipal.save();
  return res.json({ success: true, signature });
});

app.put("/api/id-cards/:id", async (req, res) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    target_class,
    profile_photo_url,
    card_status,
    valid_until,
  } = req.body;
  const card = await SchoolCardModel.findOne({ id });
  if (!card) {
    return res.status(404).json({ error: "ID card not found." });
  }
  if (first_name || last_name) {
    const user = await UserModel.findOne({ id: card.student_id });
    if (user) {
      if (first_name) user.first_name = first_name;
      if (last_name) user.last_name = last_name;
      user.updated_at = new Date().toISOString();
      await user.save();
    }
  }
  if (target_class) {
    await ApplicationModel.findOneAndUpdate(
      { student_id: card.student_id },
      { target_class },
    );
  }
  if (profile_photo_url !== undefined) {
    card.profile_photo_url = profile_photo_url;
  }
  if (valid_until !== undefined) {
    card.valid_until = valid_until;
  }
  if (card_status !== undefined) {
    const sigDoc = await SignatureModel.findOne({ is_current: true });
    const principalSignature = sigDoc ? sigDoc.signature : null;
    if (card_status === "generated" && !principalSignature) {
      return res.status(400).json({
        error:
          "Principal signature must be added in School Settings before generating/activating ID cards.",
      });
    }
    card.card_status = card_status;
    if (card_status === "generated") {
      card.generated_pdf_url = `/api/id-cards/download/${card.student_id}`;
    } else {
      card.generated_pdf_url = null;
    }
  }
  await card.save();
  return res.json(card.toObject());
});

app.get("/verify/:studentId", async (req, res) => {
  const { studentId } = req.params;
  const user = await UserModel.findOne({ id: studentId }).lean();

  if (!user) {
    return res.status(404).send(`
      <html>
        <head>
          <title>Verification Failed</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-slate-50 flex items-center justify-center min-h-screen p-4">
          <div class="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center border border-red-100">
            <div class="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </div>
            <h1 class="text-xl font-bold text-slate-800">Verification Failed</h1>
            <p class="text-sm text-slate-500 mt-2">The scanned credentials do not match our database records.</p>
            <div class="mt-6 text-xs text-slate-400">Saint Jude Academy • Security Verification System</div>
          </div>
        </body>
      </html>
    `);
  }

  let isApproved = false;
  let subHeader = "ONLINE SECURITY VERIFICATION";
  let roleBadge = "";
  let detailsHtml = "";
  let photo = "";

  if (user.role === "teacher") {
    const profile = await TeacherProfileModel.findOne({ id: studentId }).lean();
    isApproved = profile && !!profile.profile_photo_url;
    photo = profile?.profile_photo_url || "";
    roleBadge = isApproved
      ? "Verified Staff / Enseignant Vérifié"
      : "Staff Profile Incomplete";
    subHeader = "FACULTY / STAFF ONLINE VERIFICATION";

    detailsHtml = `
      <div class="flex justify-between py-1 border-b border-slate-200/60">
        <span class="font-semibold text-slate-500">Qualifications:</span>
        <span class="text-slate-800 font-medium text-right max-w-[200px] truncate">${profile?.qualifications || "Not Specified"}</span>
      </div>
      <div class="flex justify-between py-1 border-b border-slate-200/60">
        <span class="font-semibold text-slate-500">Experience:</span>
        <span class="text-slate-800 font-medium">${profile?.experience_years || 0} Years</span>
      </div>
      <div class="flex justify-between py-1 border-b border-slate-200/60">
        <span class="font-semibold text-slate-500">Status:</span>
        <span class="text-slate-800 font-bold ${isApproved ? "text-emerald-600" : "text-amber-500"}">${isApproved ? "ACTIVE FACULTY" : "INCOMPLETE PROFILE"}</span>
      </div>
    `;
  } else {
    // Student logic
    const card = await SchoolCardModel.findOne({
      student_id: studentId,
    }).lean();
    const application = await ApplicationModel.findOne({
      student_id: studentId,
    }).lean();
    isApproved = card?.card_status === "generated";
    photo = card?.profile_photo_url || "";
    roleBadge = isApproved
      ? "Verified Student / Étudiant Vérifié"
      : "Card Status: Pending / En Attente";
    subHeader = "ONLINE STUDENT VERIFICATION";
    const targetClass = application?.target_class || "N/A";

    detailsHtml = `
      <div class="flex justify-between py-1 border-b border-slate-200/60">
        <span class="font-semibold text-slate-500">Class/Grade:</span>
        <span class="text-slate-800 font-medium">${targetClass}</span>
      </div>
      <div class="flex justify-between py-1 border-b border-slate-200/60">
        <span class="font-semibold text-slate-500">Status:</span>
        <span class="text-slate-800 font-bold ${isApproved ? "text-emerald-600" : "text-amber-500"}">${isApproved ? "ACTIVE / ADMITTED" : "PENDING REVIEW"}</span>
      </div>
    `;
  }

  return res.send(`
    <html>
      <head>
        <title>Identity Verification</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-slate-50 flex items-center justify-center min-h-screen p-4">
        <div class="bg-white rounded-3xl shadow-xl max-w-md w-full overflow-hidden border border-slate-100">
          <div class="bg-linear-to-r from-blue-700 to-indigo-800 px-6 py-6 text-center text-white relative">
            <h1 class="text-lg font-bold tracking-wider">SAINT JUDE ACADEMY</h1>
            <p class="text-[10px] text-blue-200 tracking-widest font-semibold mt-0.5">${subHeader}</p>
          </div>
          <div class="p-6 text-center space-y-6">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isApproved ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"}">
              <span class="w-2 h-2 rounded-full ${isApproved ? "bg-emerald-500" : "bg-amber-500"} animate-pulse"></span>
              ${roleBadge}
            </div>
            <div class="w-28 h-28 mx-auto rounded-2xl overflow-hidden shadow-md bg-slate-100 border-2 border-slate-200">
              ${
                photo
                  ? `<img src="${photo}" alt="Portrait Photo" class="w-full h-full object-cover" />`
                  : `<div class="w-full h-full flex items-center justify-center text-slate-400 font-bold text-sm">No Photo</div>`
              }
            </div>
            <div class="space-y-1">
              <h2 class="text-xl font-bold text-slate-800">${user.last_name.toUpperCase()} ${user.first_name}</h2>
              <p class="text-xs text-slate-400 font-mono">ID: ${user.id.toUpperCase()}</p>
            </div>
            <div class="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-left space-y-3 text-xs">
              <div class="flex justify-between py-1 border-b border-slate-200/60">
                <span class="font-semibold text-slate-500">Institution:</span>
                <span class="text-slate-800 font-medium">Saint Jude Academy</span>
              </div>
              ${detailsHtml}
              <div class="flex justify-between py-1">
                <span class="font-semibold text-slate-500">Validation Period:</span>
                <span class="text-slate-800 font-medium">2026 - 2027</span>
              </div>
            </div>
            <div class="text-[10px] text-slate-400 font-mono">
              Timestamp: ${new Date().toISOString().replace("T", " ").substring(0, 19)} UTC
            </div>
          </div>
          <div class="bg-slate-50 border-t border-slate-100 py-3 text-center text-[10px] text-slate-400 font-medium">
            © 2026 LA SALE. All Rights Reserved.
          </div>
        </div>
      </body>
    </html>
  `);
});

async function drawIdCardPage(
  pdfDoc,
  student,
  card,
  application,
  schoolInfo,
  principalSignature,
  protocol,
  host,
) {
  const isFr = student.preferred_language === "fr";
  const targetClass = application ? application.target_class : "Grade 10-A";
  const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = (hex || "#2563eb").replace(
      shorthandRegex,
      (m, r, g, b) => r + r + g + g + b + b,
    );
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    return result
      ? {
          r: parseInt(result[1], 16) / 255,
          g: parseInt(result[2], 16) / 255,
          b: parseInt(result[3], 16) / 255,
        }
      : { r: 0.08, g: 0.2, b: 0.38 };
  };
  const themeColor = hexToRgb(schoolInfo.color_theme);
  const page = pdfDoc.addPage([380, 240]);
  const fontHelvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontHelveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  page.drawRectangle({
    x: 10,
    y: 10,
    width: 360,
    height: 220,
    borderColor: rgb(
      themeColor.r * 0.8,
      themeColor.g * 0.8,
      themeColor.b * 0.8,
    ),
    borderWidth: 2,
    color: rgb(0.98, 0.99, 1.0),
  });
  page.drawRectangle({
    x: 10,
    y: 175,
    width: 360,
    height: 55,
    color: rgb(themeColor.r, themeColor.g, themeColor.b),
  });
  page.drawText(schoolInfo.name.toUpperCase(), {
    x: 25,
    y: 198,
    size: schoolInfo.name.length > 30 ? 11 : 13,
    font: fontHelveticaBold,
    color: rgb(1, 1, 1),
  });
  const mottoText = schoolInfo.motto
    ? schoolInfo.motto.toUpperCase()
    : isFr
      ? "EXCELLENCE - DISCIPLINE - PROGRÈS"
      : "EXCELLENCE - DISCIPLINE - PROGRESS";
  page.drawText(mottoText, {
    x: 25,
    y: 184,
    size: 7,
    font: fontHelvetica,
    color: rgb(0.9, 0.94, 1),
  });

  if (schoolInfo.logo_url) {
    try {
      const matches = schoolInfo.logo_url.match(
        /^data:image\/(png|jpeg|jpg);base64,(.+)$/,
      );
      if (matches) {
        const type = matches[1];
        const base64Data = matches[2];
        const logoBytes = Buffer.from(base64Data, "base64");
        let embeddedLogo =
          type === "png"
            ? await pdfDoc.embedPng(logoBytes)
            : await pdfDoc.embedJpg(logoBytes);
        if (embeddedLogo) {
          page.drawImage(embeddedLogo, {
            x: 320,
            y: 182,
            width: 40,
            height: 40,
          });
        }
      }
    } catch (logoErr) {
      console.error("Failed to embed school logo to PDF", logoErr);
    }
  }
  page.drawRectangle({
    x: 10,
    y: 172,
    width: 360,
    height: 3,
    color: rgb(0.9, 0.7, 0.15),
  });
  let hasPhoto = false;
  if (card && card.profile_photo_url) {
    try {
      const photoUrl = card.profile_photo_url;
      const matches = photoUrl.match(
        /^data:image\/(png|jpeg|jpg);base64,(.+)$/,
      );
      if (matches) {
        const type = matches[1];
        const base64Data = matches[2];
        const photoBytes = Buffer.from(base64Data, "base64");
        let embeddedImg;
        if (type === "png") {
          embeddedImg = await pdfDoc.embedPng(photoBytes);
        } else {
          embeddedImg = await pdfDoc.embedJpg(photoBytes);
        }
        if (embeddedImg) {
          page.drawImage(embeddedImg, {
            x: 25,
            y: 35,
            width: 105,
            height: 120,
          });
          hasPhoto = true;
        }
      }
    } catch (err) {
      console.error("Failed to embed profile photo to PDF", err);
    }
  }
  if (!hasPhoto) {
    page.drawRectangle({
      x: 25,
      y: 35,
      width: 105,
      height: 120,
      color: rgb(0.92, 0.94, 0.96),
      borderColor: rgb(0.75, 0.8, 0.85),
      borderWidth: 1,
    });
    page.drawCircle({
      x: 77,
      y: 105,
      size: 20,
      color: rgb(0.6, 0.68, 0.76),
    });
    page.drawRectangle({
      x: 45,
      y: 45,
      width: 65,
      height: 35,
      color: rgb(0.6, 0.68, 0.76),
    });
  }
  const labelX = 145;
  const valueX = 220;
  page.drawText(isFr ? "CARTE D'ÉTUDIANT" : "STUDENT ID CARD", {
    x: labelX,
    y: 145,
    size: 13,
    font: fontHelveticaBold,
    color: rgb(themeColor.r, themeColor.g, themeColor.b),
  });
  const expiryDate = card && card.valid_until ? card.valid_until : "2027-06-30";
  const issueDateStr = new Date().toISOString().substring(0, 10);
  page.drawText(
    isFr ? `ÉMIS LE : ${issueDateStr}` : `ISSUED: ${issueDateStr}`,
    {
      x: labelX,
      y: 132,
      size: 7,
      font: fontHelvetica,
      color: rgb(0.4, 0.4, 0.4),
    },
  );
  page.drawText(isFr ? `EXPIRE LE : ${expiryDate}` : `EXPIRES: ${expiryDate}`, {
    x: labelX + 85,
    y: 132,
    size: 7,
    font: fontHelvetica,
    color: rgb(0.4, 0.4, 0.4),
  });
  const infoFields = [
    {
      label: isFr ? "Nom :" : "Last Name:",
      value: student.last_name.toUpperCase(),
    },
    { label: isFr ? "Prénom :" : "First Name:", value: student.first_name },
    { label: isFr ? "Classe :" : "Class/Grade:", value: targetClass },
    {
      label: isFr ? "Matricule :" : "Student ID:",
      value: student.id.toUpperCase(),
    },
  ];
  let currentY = 110;
  infoFields.forEach((field) => {
    const isMatricule =
      field.label.includes("Matricule") || field.label.includes("Student ID");
    const labelSize = isMatricule ? 7 : 9;
    const valueSize = isMatricule ? 7 : 10;
    page.drawText(field.label, {
      x: labelX,
      y: currentY,
      size: labelSize,
      font: fontHelveticaBold,
      color: rgb(0.2, 0.3, 0.4),
    });
    page.drawText(field.value, {
      x: valueX,
      y: currentY,
      size: valueSize,
      font: fontHelvetica,
      color: rgb(0.1, 0.1, 0.1),
    });
    currentY -= 15;
  });
  const studSigX = 145;
  const sigX = 245;
  const sigY = 32;

  // ---------------- STUDENT SIGNATURE AREA ----------------
  page.drawText(isFr ? "Signature de l'Élève" : "Student Signature", {
    x: studSigX,
    y: sigY + 24,
    size: 5,
    font: fontHelvetica,
    color: rgb(0.1, 0.1, 0.1),
  });

  page.drawLine({
    start: { x: studSigX, y: sigY + 6 },
    end: { x: studSigX + 85, y: sigY + 6 },
    thickness: 0.5,
    color: rgb(0.7, 0.7, 0.7),
  });

  page.drawText(`${student.first_name} ${student.last_name}`, {
    x: studSigX,
    y: sigY - 2,
    size: 5,
    font: fontHelveticaBold,
    color: rgb(0.15, 0.2, 0.4),
  });

  // ---------------- PRINCIPAL SIGNATURE AREA ----------------
  page.drawText(isFr ? "Signature du Directeur" : "Principal Signature", {
    x: sigX,
    y: sigY + 24,
    size: 5,
    font: fontHelvetica,
    color: rgb(0.1, 0.1, 0.1),
  });

  if (principalSignature) {
    try {
      const matches = principalSignature.match(
        /^data:image\/(png|jpeg|jpg);base64,(.+)$/,
      );
      if (matches) {
        const type = matches[1];
        const base64Data = matches[2];
        const sigBytes = Buffer.from(base64Data, "base64");
        let embeddedSig;
        if (type === "png") {
          embeddedSig = await pdfDoc.embedPng(sigBytes);
        } else {
          embeddedSig = await pdfDoc.embedJpg(sigBytes);
        }
        if (embeddedSig) {
          page.drawImage(embeddedSig, {
            x: sigX,
            y: sigY + 8,
            width: 60,
            height: 14,
          });
        }
      }
    } catch (sigErr) {
      console.error("Failed to embed principal signature to PDF", sigErr);
    }
  }

  page.drawLine({
    start: { x: sigX, y: sigY + 6 },
    end: { x: sigX + 110, y: sigY + 6 },
    thickness: 0.5,
    color: rgb(0.7, 0.7, 0.7),
  });

  const pName = schoolInfo.principal_name || "Hamado Simean";
  page.drawText(pName, {
    x: sigX,
    y: sigY - 2,
    size: 6.5,
    font: fontHelveticaBold,
    color: rgb(0.1, 0.1, 0.1),
  });

  try {
    const verifyUrl = `${protocol}://${host}/verify/${student.id}`;
    const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
      margin: 1,
      width: 120,
    });
    const qrMatches = qrDataUrl.match(/^data:image\/png;base64,(.+)$/);
    if (qrMatches) {
      const qrBytes = Buffer.from(qrMatches[1], "base64");
      const qrImage = await pdfDoc.embedPng(qrBytes);
      page.drawRectangle({
        x: 303,
        y: 23,
        width: 59,
        height: 59,
        color: rgb(1, 1, 1),
        borderColor: rgb(0.85, 0.88, 0.92),
        borderWidth: 1,
      });
      page.drawImage(qrImage, {
        x: 305,
        y: 25,
        width: 55,
        height: 55,
      });
    }
  } catch (qrErr) {
    console.error("Failed to generate or embed QR code in PDF ID Card", qrErr);
  }
}

app.get("/api/documents/preview", async (req, res) => {
  const { filename } = req.query;
  try {
    if (filename) {
      const application = await ApplicationModel.findOne({
        $or: [
          { transcript_file_name: filename },
          { payment_receipt_name: filename },
          { recommendation_letter_name: filename },
        ],
      }).lean();
      if (application) {
        let base64Data = null;
        if (application.transcript_file_name === filename) {
          base64Data = application.transcript_base64;
        } else if (application.payment_receipt_name === filename) {
          base64Data = application.payment_receipt_base64;
        } else if (application.recommendation_letter_name === filename) {
          base64Data = application.recommendation_letter_base64;
        }

        if (base64Data) {
          let contentType = "application/pdf";
          let rawBase64 = base64Data;
          if (filename.endsWith(".png")) contentType = "image/png";
          else if (filename.endsWith(".jpg") || filename.endsWith(".jpeg"))
            contentType = "image/jpeg";

          const matches = base64Data.match(/^data:(.+);base64,(.+)$/);
          if (matches) {
            contentType = matches[1];
            rawBase64 = matches[2];
          }

          try {
            const buffer = Buffer.from(rawBase64, "base64");
            res.setHeader("Content-Type", contentType);
            res.setHeader(
              "Content-Disposition",
              `inline; filename="${filename}"`,
            );
            return res.send(buffer);
          } catch (bufErr) {
            console.error(
              "Failed to parse base64 data for document preview",
              bufErr,
            );
          }
        }
      }
    }

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const fontHelvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontHelveticaBold = await pdfDoc.embedFont(
      StandardFonts.HelveticaBold,
    );

    page.drawRectangle({
      x: 20,
      y: 20,
      width: 560,
      height: 760,
      borderColor: rgb(0.14, 0.38, 0.72),
      borderWidth: 2,
      color: rgb(0.98, 0.99, 1.0),
    });

    page.drawRectangle({
      x: 20,
      y: 700,
      width: 560,
      height: 80,
      color: rgb(0.14, 0.38, 0.72),
    });

    page.drawText("COLLEGE LA SALE", {
      x: 40,
      y: 745,
      size: 20,
      font: fontHelveticaBold,
      color: rgb(1, 1, 1),
    });

    page.drawText("OFFICIAL DOCUMENT ARCHIVE - PREVIEW", {
      x: 40,
      y: 720,
      size: 10,
      font: fontHelvetica,
      color: rgb(0.8, 0.9, 1.0),
    });

    page.drawText("DOCUMENT TYPE:", {
      x: 50,
      y: 630,
      size: 12,
      font: fontHelveticaBold,
      color: rgb(0.2, 0.3, 0.4),
    });

    let docType = "Official Academic Transcript";
    const fileLower = (filename || "").toLowerCase();
    if (fileLower.includes("receipt") || fileLower.includes("recu")) {
      docType = "Enrollment Payment Receipt";
    } else if (
      fileLower.includes("letter") ||
      fileLower.includes("lettre") ||
      fileLower.includes("recommandation")
    ) {
      docType = "Recommendation Letter";
    }

    page.drawText(docType, {
      x: 180,
      y: 630,
      size: 12,
      font: fontHelvetica,
      color: rgb(0.1, 0.1, 0.1),
    });

    page.drawText("FILE NAME:", {
      x: 50,
      y: 600,
      size: 12,
      font: fontHelveticaBold,
      color: rgb(0.2, 0.3, 0.4),
    });

    page.drawText(filename || "document.pdf", {
      x: 180,
      y: 600,
      size: 12,
      font: fontHelvetica,
      color: rgb(0.1, 0.1, 0.1),
    });

    page.drawText("STATUS:", {
      x: 50,
      y: 570,
      size: 12,
      font: fontHelveticaBold,
      color: rgb(0.2, 0.3, 0.4),
    });

    page.drawText("VERIFIED / SECURED", {
      x: 180,
      y: 570,
      size: 12,
      font: fontHelveticaBold,
      color: rgb(0.1, 0.6, 0.3),
    });

    page.drawText(
      "This document has been successfully compiled and stored in the school's digital",
      {
        x: 50,
        y: 480,
        size: 11,
        font: fontHelvetica,
        color: rgb(0.3, 0.3, 0.3),
      },
    );
    page.drawText(
      "enrollment system. It has been verified against the applicant's profile and is",
      {
        x: 50,
        y: 460,
        size: 11,
        font: fontHelvetica,
        color: rgb(0.3, 0.3, 0.3),
      },
    );
    page.drawText("ready for administrative evaluation.", {
      x: 50,
      y: 440,
      size: 11,
      font: fontHelvetica,
      color: rgb(0.3, 0.3, 0.3),
    });

    page.drawText("COLLEGE LA SALE", {
      x: 120,
      y: 280,
      size: 32,
      font: fontHelveticaBold,
      color: rgb(0.93, 0.95, 0.97),
    });

    const pdfBytes = await pdfDoc.save();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="preview.pdf"`);
    res.send(Buffer.from(pdfBytes));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating document preview");
  }
});

app.get("/api/id-cards/download/:studentId", async (req, res) => {
  const { studentId } = req.params;
  const student = await UserModel.findOne({ id: studentId }).lean();
  const card = await SchoolCardModel.findOne({ student_id: studentId }).lean();
  const application = await ApplicationModel.findOne({
    student_id: studentId,
  }).lean();
  if (!student) {
    return res.status(404).send("Student record not found.");
  }
  if (!card || !card.profile_photo_url) {
    return res
      .status(400)
      .send(
        "You must upload your profile photo first so your ID Card can be generated and downloaded.",
      );
  }
  try {
    const pdfDoc = await PDFDocument.create();
    const infoDoc = await SchoolInfoModel.findOne({
      id: "default_school_info",
    });
    const sigDoc = await SignatureModel.findOne({ is_current: true });
    const schoolInfo = infoDoc ? infoDoc.toObject() : { ...initialSchoolInfo };
    const principalSignature = sigDoc ? sigDoc.signature : null;
    if (sigDoc && sigDoc.principal) {
      const pUser = await UserModel.findOne({ id: sigDoc.principal }).lean();
      if (pUser) {
        schoolInfo.principal_name = `${pUser.first_name} ${pUser.last_name}`;
      }
    }

    await drawIdCardPage(
      pdfDoc,
      student,
      card,
      application,
      schoolInfo,
      principalSignature,
      req.protocol,
      req.get("host") || "",
    );
    const pdfBytes = await pdfDoc.save();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Student_ID_${student.last_name}_${student.first_name}.pdf`,
    );
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error("Error generating Student ID PDF", error);
    res
      .status(500)
      .send("An error occurred while compiling the print PDF on the server.");
  }
});

app.post("/api/id-cards/batch-download", async (req, res) => {
  const { student_ids } = req.body;
  if (!student_ids || !Array.isArray(student_ids) || student_ids.length === 0) {
    return res
      .status(400)
      .send("Please provide a list of student IDs for batch download.");
  }
  try {
    const pdfDoc = await PDFDocument.create();
    let hasValidCards = false;

    const infoDoc = await SchoolInfoModel.findOne({
      id: "default_school_info",
    });
    const sigDoc = await SignatureModel.findOne({ is_current: true });
    const schoolInfo = infoDoc ? infoDoc.toObject() : { ...initialSchoolInfo };
    const principalSignature = sigDoc ? sigDoc.signature : null;
    if (sigDoc && sigDoc.principal) {
      const pUser = await UserModel.findOne({ id: sigDoc.principal }).lean();
      if (pUser) {
        schoolInfo.principal_name = `${pUser.first_name} ${pUser.last_name}`;
      }
    }

    for (const studentId of student_ids) {
      const student = await UserModel.findOne({ id: studentId }).lean();
      const card = await SchoolCardModel.findOne({
        student_id: studentId,
      }).lean();
      const application = await ApplicationModel.findOne({
        student_id: studentId,
      }).lean();
      if (
        student &&
        card &&
        card.profile_photo_url &&
        card.card_status === "generated"
      ) {
        await drawIdCardPage(
          pdfDoc,
          student,
          card,
          application,
          schoolInfo,
          principalSignature,
          req.protocol,
          req.get("host") || "",
        );
        hasValidCards = true;
      }
    }
    if (!hasValidCards) {
      return res
        .status(400)
        .send(
          "No valid generated ID cards found for the provided student IDs.",
        );
    }
    const pdfBytes = await pdfDoc.save();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Batch_Student_ID_Cards.pdf`,
    );
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error("Error generating batch PDF", error);
    res
      .status(500)
      .send(
        "An error occurred while compiling the batch print PDF on the server.",
      );
  }
});

async function drawTeacherIdCardPage(
  pdfDoc,
  teacher,
  schoolInfo,
  principalSignature,
  protocol,
  host,
  isFr,
) {
  const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = (hex || "#2563eb").replace(
      shorthandRegex,
      (m, r, g, b) => r + r + g + g + b + b,
    );
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    return result
      ? {
          r: parseInt(result[1], 16) / 255,
          g: parseInt(result[2], 16) / 255,
          b: parseInt(result[3], 16) / 255,
        }
      : { r: 0.08, g: 0.2, b: 0.38 };
  };
  const themeColor = hexToRgb(schoolInfo.color_theme);
  const page = pdfDoc.addPage([380, 240]);
  const fontHelvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontHelveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  page.drawRectangle({
    x: 10,
    y: 10,
    width: 360,
    height: 220,
    borderColor: rgb(themeColor.r * 0.8, themeColor.g * 0.8, themeColor.b * 0.8),
    borderWidth: 2,
    color: rgb(0.98, 0.99, 1.0),
  });

  page.drawRectangle({
    x: 10,
    y: 175,
    width: 360,
    height: 55,
    color: rgb(themeColor.r, themeColor.g, themeColor.b),
  });

  // Header Title in White
  page.drawText(schoolInfo.name.toUpperCase(), {
    x: 25,
    y: 198,
    size: schoolInfo.name.length > 30 ? 11 : 13,
    font: fontHelveticaBold,
    color: rgb(1, 1, 1),
  });

  const mottoText = schoolInfo.motto
    ? schoolInfo.motto.toUpperCase()
    : isFr
      ? "EXCELLENCE - DISCIPLINE - PROGRÈS"
      : "EXCELLENCE - DISCIPLINE - PROGRESS";
  page.drawText(mottoText, {
    x: 25,
    y: 184,
    size: 7,
    font: fontHelvetica,
    color: rgb(0.9, 0.94, 1),
  });

  if (schoolInfo.logo_url) {
    try {
      const matches = schoolInfo.logo_url.match(
        /^data:image\/(png|jpeg|jpg);base64,(.+)$/,
      );
      if (matches) {
        const type = matches[1];
        const base64Data = matches[2];
        const logoBytes = Buffer.from(base64Data, "base64");
        let embeddedLogo =
          type === "png"
            ? await pdfDoc.embedPng(logoBytes)
            : await pdfDoc.embedJpg(logoBytes);
        if (embeddedLogo) {
          page.drawImage(embeddedLogo, {
            x: 320,
            y: 182,
            width: 40,
            height: 40,
          });
        }
      }
    } catch (logoErr) {
      console.error("Failed to embed school logo to PDF", logoErr);
    }
  }

  // Portrait frame border
  page.drawRectangle({
    x: 25,
    y: 35,
    width: 105,
    height: 120,
    color: rgb(0.95, 0.95, 0.95),
    borderColor: rgb(0.8, 0.8, 0.8),
    borderWidth: 1,
  });
  if (teacher.profile_photo_url) {
    try {
      const matches = teacher.profile_photo_url.match(
        /^data:image\/(png|jpeg|jpg);base64,(.+)$/,
      );
      if (matches) {
        const type = matches[1];
        const base64Data = matches[2];
        const photoBytes = Buffer.from(base64Data, "base64");
        let embeddedImg =
          type === "png"
            ? await pdfDoc.embedPng(photoBytes)
            : await pdfDoc.embedJpg(photoBytes);
        if (embeddedImg) {
          page.drawImage(embeddedImg, {
            x: 25,
            y: 35,
            width: 105,
            height: 120,
          });
        }
      }
    } catch (err) {
      console.error("Failed to embed teacher profile photo to PDF", err);
    }
  } else {
    page.drawCircle({
      x: 77,
      y: 105,
      size: 20,
      color: rgb(0.6, 0.68, 0.76),
    });
    page.drawRectangle({
      x: 45,
      y: 45,
      width: 65,
      height: 35,
      color: rgb(0.6, 0.68, 0.76),
    });
  }
  const labelX = 145;
  const valueX = 220;
  page.drawText(isFr ? "PERSONNEL / ENSEIGNANT" : "FACULTY / STAFF", {
    x: labelX,
    y: 145,
    size: 13,
    font: fontHelveticaBold,
    color: rgb(themeColor.r, themeColor.g, themeColor.b),
  });
  const issueDateStr = new Date().toISOString().substring(0, 10);
  const expirationYear = schoolInfo.school_year
    ? schoolInfo.school_year.split("-")[1]
    : parseInt(issueDateStr.substring(0, 4)) + 1;
  const expirationDateStr = `${expirationYear}-06-30`;

  page.drawText(`${isFr ? "DÉLIVRÉ LE :" : "ISSUED:"} ${issueDateStr}`, {
    x: labelX,
    y: 132,
    size: 7,
    font: fontHelvetica,
    color: rgb(0.1, 0.1, 0.1),
  });

  page.drawText(
    `${isFr ? "VALABLE JUSQU'AU :" : "VALID UNTIL:"} ${expirationDateStr}`,
    {
      x: labelX + 75,
      y: 132,
      size: 7,
      font: fontHelvetica,
      color: rgb(0.1, 0.1, 0.1),
    },
  );
  const infoFields = [
    {
      label: isFr ? "Nom :" : "Last Name:",
      value: teacher.last_name?.toUpperCase() || "",
    },
    { label: isFr ? "Prénom :" : "First Name:", value: teacher.first_name || "" },
    {
      label: isFr ? "Fonction :" : "Role:",
      value: isFr ? "Enseignant(e)" : "Teacher",
    },
    {
      label: isFr ? "Matricule :" : "Staff ID:",
      value: (teacher.id || "").toUpperCase().substring(0, 8),
    },
  ];
  let currentY = 110;
  infoFields.forEach((field) => {
    const isMatricule =
      field.label.includes("Staff ID") || field.label.includes("Matricule");
    const labelSize = isMatricule ? 7 : 9;
    const valueSize = isMatricule ? 7 : 10;
    page.drawText(field.label, {
      x: labelX,
      y: currentY,
      size: labelSize,
      font: fontHelveticaBold,
      color: rgb(0.4, 0.4, 0.4),
    });
    page.drawText(field.value, {
      x: valueX,
      y: currentY,
      size: valueSize,
      font: fontHelvetica,
      color: rgb(0.1, 0.1, 0.1),
    });
    currentY -= 15;
  });
  const staffSigX = 145;
  const sigX = 245;
  const sigY = 32;

  // ---------------- STAFF SIGNATURE AREA ----------------
  page.drawText(isFr ? "Signature de l'Employé" : "Staff Signature", {
    x: staffSigX,
    y: sigY + 24,
    size: 5,
    font: fontHelvetica,
    color: rgb(0.1, 0.1, 0.1),
  });

  if (teacher.staff_signature) {
    try {
      const matches = teacher.staff_signature.match(
        /^data:image\/(png|jpeg|jpg);base64,(.+)$/,
      );
      if (matches) {
        const type = matches[1];
        const base64Data = matches[2];
        const sigBytes = Buffer.from(base64Data, "base64");
        let embeddedSig =
          type === "png"
            ? await pdfDoc.embedPng(sigBytes)
            : await pdfDoc.embedJpg(sigBytes);
        if (embeddedSig) {
          page.drawImage(embeddedSig, {
            x: staffSigX,
            y: sigY + 8,
            width: 60,
            height: 14,
          });
        }
      }
    } catch (sigErr) {
      console.error("Failed to embed staff signature to PDF", sigErr);
    }
  }

  page.drawLine({
    start: { x: staffSigX, y: sigY + 6 },
    end: { x: staffSigX + 85, y: sigY + 6 },
    thickness: 0.5,
    color: rgb(0.4, 0.4, 0.4),
  });

  page.drawText(`${teacher.first_name} ${teacher.last_name}`, {
    x: staffSigX,
    y: sigY - 2,
    size: 5,
    font: fontHelveticaBold,
    color: rgb(0.1, 0.1, 0.1),
  });

  // ---------------- PRINCIPAL SIGNATURE AREA ----------------
  page.drawText(isFr ? "Signature du Directeur" : "Principal Signature", {
    x: sigX,
    y: sigY + 24,
    size: 5,
    font: fontHelvetica,
    color: rgb(0.1, 0.1, 0.1),
  });

  if (principalSignature) {
    try {
      const matches = principalSignature.match(
        /^data:image\/(png|jpeg|jpg);base64,(.+)$/,
      );
      if (matches) {
        const type = matches[1];
        const base64Data = matches[2];
        const sigBytes = Buffer.from(base64Data, "base64");
        let embeddedSig =
          type === "png"
            ? await pdfDoc.embedPng(sigBytes)
            : await pdfDoc.embedJpg(sigBytes);
        if (embeddedSig) {
          page.drawImage(embeddedSig, {
            x: sigX,
            y: sigY + 8,
            width: 60,
            height: 14,
          });
        }
      }
    } catch (sigErr) {
      console.error("Failed to embed principal signature to PDF", sigErr);
    }
  }

  page.drawLine({
    start: { x: sigX, y: sigY + 6 },
    end: { x: sigX + 110, y: sigY + 6 },
    thickness: 0.5,
    color: rgb(0.4, 0.4, 0.4),
  });

  const pName = schoolInfo.principal_name || "Hamado Simean";
  page.drawText(pName, {
    x: sigX,
    y: sigY - 2,
    size: 6.5,
    font: fontHelveticaBold,
    color: rgb(0.1, 0.1, 0.1),
  });

  try {
    const verifyUrl = `${protocol}://${host}/verify/${teacher.id}`;
    const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
      margin: 1,
      width: 120,
    });
    const qrMatches = qrDataUrl.match(/^data:image\/png;base64,(.+)$/);
    if (qrMatches) {
      const qrBytes = Buffer.from(qrMatches[1], "base64");
      const qrImage = await pdfDoc.embedPng(qrBytes);
      page.drawRectangle({
        x: 303,
        y: 23,
        width: 59,
        height: 59,
        color: rgb(1, 1, 1),
        borderColor: rgb(0.85, 0.88, 0.92),
        borderWidth: 1,
      });
      page.drawImage(qrImage, {
        x: 305,
        y: 25,
        width: 55,
        height: 55,
      });
    }
  } catch (qrErr) {
    console.error("Failed to embed QR code to PDF", qrErr);
  }
}

app.get("/api/teacher-id-cards/download/:teacherId", async (req, res) => {
  const { teacherId } = req.params;
  const teacherRec = await TeacherProfileModel.findOne({
    id: teacherId,
  }).lean();
  const user = await UserModel.findOne({ id: teacherId }).lean();
  if (!teacherRec || !user) {
    return res.status(404).send("Teacher record not found.");
  }
  if (!teacherRec.profile_photo_url) {
    return res.status(400).send("Please upload a profile photo first.");
  }
  const teacherData = {
    ...teacherRec,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  };
  try {
    const pdfDoc = await PDFDocument.create();
    const infoDoc = await SchoolInfoModel.findOne({
      id: "default_school_info",
    });
    const sigDoc = await SignatureModel.findOne({ is_current: true });
    const schoolInfo = infoDoc ? infoDoc.toObject() : { ...initialSchoolInfo };
    const principalSignature = sigDoc ? sigDoc.signature : null;
    if (sigDoc && sigDoc.principal) {
      const pUser = await UserModel.findOne({ id: sigDoc.principal }).lean();
      if (pUser) {
        schoolInfo.principal_name = `${pUser.first_name} ${pUser.last_name}`;
      }
    }

    const isFr = req.query.lang === "fr";

    await drawTeacherIdCardPage(
      pdfDoc,
      teacherData,
      schoolInfo,
      principalSignature,
      req.protocol,
      req.get("host") || "",
      isFr,
    );
    const pdfBytes = await pdfDoc.save();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Teacher_ID_${teacherData.last_name}_${teacherData.first_name}.pdf`,
    );
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error("Error generating Teacher ID PDF", error);
    res
      .status(500)
      .send("An error occurred while compiling the print PDF on the server.");
  }
});

app.get("/api/teachers", async (req, res) => {
  const teachers = await UserModel.find({
    role: "teacher",
    is_active: { $ne: false },
  }).lean();
  const joinedTeachers = [];
  for (const t of teachers) {
    let profile = await TeacherProfileModel.findOne({ id: t.id }).lean();
    if (!profile) {
      const newProf = await TeacherProfileModel.create({
        id: t.id,
        qualifications: "",
        experience_years: 0,
        curriculum_notes: "",
        assigned_classes: [],
        assigned_courses: [],
        profile_photo_url: null,
        staff_signature: null,
      });
      profile = newProf.toObject();
    }
    joinedTeachers.push({
      ...profile,
      first_name: t.first_name,
      last_name: t.last_name,
      email: t.email,
      preferred_language: t.preferred_language,
      is_active: t.is_active,
      created_at: t.created_at,
    });
  }
  return res.json(joinedTeachers);
});

app.post("/api/teachers", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    qualifications,
    experience_years,
    curriculum_notes,
    assigned_classes,
    assigned_courses,
  } = req.body;
  if (!first_name || !last_name || !email) {
    return res
      .status(400)
      .json({ error: "First name, last name, and email are required." });
  }
  let user = await UserModel.findOne({
    email: { $regex: new RegExp("^" + email + "$", "i") },
  });
  let userId = "";
  if (!user) {
    userId = `${Math.random().toString(36).substring(2, 11)}`;
    user = await UserModel.create({
      id: userId,
      first_name,
      last_name,
      email,
      role: "teacher",
      preferred_language: "en",
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  } else {
    userId = user.id;
    user.role = "teacher";
    await user.save();
  }
  await TeacherProfileModel.deleteMany({ id: userId });
  const newProfile = await TeacherProfileModel.create({
    id: userId,
    qualifications: qualifications || "",
    experience_years: experience_years ? Number(experience_years) : 0,
    curriculum_notes: curriculum_notes || "",
    assigned_classes: assigned_classes || [],
    assigned_courses: assigned_courses || [],
  });
  return res.status(201).json({
    ...newProfile.toObject(),
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    preferred_language: user.preferred_language,
    is_active: user.is_active,
  });
});

app.put("/api/teachers/:id", async (req, res) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    qualifications,
    experience_years,
    curriculum_notes,
    assigned_classes,
    assigned_courses,
    profile_photo_url,
    staff_signature,
  } = req.body;
  const profile = await TeacherProfileModel.findOne({ id });
  if (!profile) {
    return res.status(404).json({ error: "Teacher profile not found." });
  }
  const user = await UserModel.findOne({ id });
  if (user) {
    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
    user.updated_at = new Date().toISOString();
    await user.save();
  }
  if (qualifications !== undefined) profile.qualifications = qualifications;
  if (experience_years !== undefined)
    profile.experience_years = Number(experience_years);
  if (curriculum_notes !== undefined)
    profile.curriculum_notes = curriculum_notes;
  if (assigned_classes !== undefined)
    profile.assigned_classes = assigned_classes;
  if (assigned_courses !== undefined)
    profile.assigned_courses = assigned_courses;
  if (profile_photo_url !== undefined)
    profile.profile_photo_url = profile_photo_url;
  if (staff_signature !== undefined) profile.staff_signature = staff_signature;
  await profile.save();
  return res.json({
    ...profile.toObject(),
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    preferred_language: user?.preferred_language || "en",
    is_active: user?.is_active ?? true,
  });
});

app.delete("/api/teachers/:id", async (req, res) => {
  const { id } = req.params;
  const { requester_id } = req.query;
  const requester = await UserModel.findOne({ id: requester_id });
  if (!requester || requester.role !== "admin") {
    return res.status(403).json({
      error: "Unauthorized. Only administrators can delete teacher profiles.",
    });
  }
  const user = await UserModel.findOne({ id });
  if (user) {
    user.is_active = false;
    await user.save();
  }
  await TeacherProfileModel.deleteOne({ id });
  return res.json({
    success: true,
    message: "Teacher de-allocated and deactivated.",
  });
});

app.delete("/api/students/:id", async (req, res) => {
  const { id } = req.params;
  const { requester_id } = req.query;
  const requester = await UserModel.findOne({ id: requester_id });
  if (!requester || requester.role !== "admin") {
    return res.status(403).json({
      error: "Unauthorized. Only administrators can delete student profiles.",
    });
  }
  const user = await UserModel.findOne({ id });
  let studentName = `ID ${id}`;
  if (user) {
    user.is_active = false;
    await user.save();
    studentName = `${user.first_name} ${user.last_name}`;
  }
  await ApplicationModel.deleteMany({ student_id: id });
  await SchoolCardModel.deleteMany({ student_id: id });
  await AuditLogModel.create({
    id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    timestamp: new Date().toISOString(),
    user_id: requester.id,
    user_email: requester.email,
    user_role: requester.role,
    action: "STUDENT_DELETED",
    details: `Deleted student profile: ${studentName}`,
  });
  return res.json({
    success: true,
    message: "Student profile deleted successfully.",
  });
});

app.get("/api/students", async (req, res) => {
  const students = await UserModel.find({
    role: "student",
    is_active: { $ne: false },
  }).lean();
  const joinedStudents = [];
  for (const u of students) {
    const app = await ApplicationModel.findOne({ student_id: u.id }).lean();
    const parent = await ParentModel.findOne({ student_id: u.id }).lean();
    joinedStudents.push({
      id: u.id,
      first_name: u.first_name,
      last_name: u.last_name,
      email: u.email,
      preferred_language: u.preferred_language || "en",
      created_at: u.created_at,
      target_class: app?.target_class || "",
      last_school_name: app?.last_school_name || "",
      last_general_grade: app?.last_general_grade || 0,
      parent_full_name: parent?.full_name || "",
      parent_phone: parent?.phone || "",
      parent_place_of_living: parent?.place_of_living || "",
      status: app?.status || "approved",
    });
  }
  return res.json(joinedStudents);
});

app.post("/api/students", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    target_class,
    last_school_name,
    last_general_grade,
    preferred_language,
    parent_full_name,
    parent_phone,
    parent_place_of_living,
  } = req.body;
  if (!first_name || !last_name || !email) {
    return res
      .status(400)
      .json({ error: "First name, last name, and email are required." });
  }
  const existing = await UserModel.findOne({
    email: { $regex: new RegExp("^" + email + "$", "i") },
  });
  if (existing) {
    return res.status(400).json({ error: "Email already registered." });
  }
  const userId = `usr_${Math.random().toString(36).substring(2, 11)}`;
  const newUser = await UserModel.create({
    id: userId,
    first_name,
    last_name,
    email,
    role: "student",
    preferred_language: preferred_language || "en",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
  const parentId = `parent_${Math.random().toString(36).substring(2, 11)}`;
  await ParentModel.create({
    id: parentId,
    student_id: userId,
    full_name: parent_full_name || "",
    phone: parent_phone || "",
    place_of_living: parent_place_of_living || "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
  const appId = `app_${Math.random().toString(36).substring(2, 11)}`;
  const newApp = await ApplicationModel.create({
    id: appId,
    student_id: userId,
    target_class: target_class || "Grade 10-A",
    last_school_name: last_school_name || "Saint Jude Middle",
    last_general_grade: last_general_grade ? Number(last_general_grade) : 15.0,
    transcript_file_name: "created_by_admin.pdf",
    payment_receipt_name: "created_by_admin.png",
    recommendation_letter_name: "created_by_admin.pdf",
    status: "approved",
    rejection_reason: null,
    created_at: new Date().toISOString(),
  });
  const cardId = `card_${Math.random().toString(36).substring(2, 11)}`;
  await SchoolCardModel.create({
    id: cardId,
    student_id: userId,
    card_status: "generated",
    profile_photo_url:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    valid_until: "2027-06-30",
    generated_pdf_url: `/api/id-cards/download/${userId}`,
    created_at: new Date().toISOString(),
  });
  return res.status(201).json({
    id: userId,
    first_name,
    last_name,
    email,
    preferred_language: newUser.preferred_language,
    target_class: newApp.target_class,
    last_school_name: newApp.last_school_name,
    last_general_grade: newApp.last_general_grade,
    status: newApp.status,
  });
});

app.put("/api/students/:id", async (req, res) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    email,
    target_class,
    last_school_name,
    last_general_grade,
    preferred_language,
    parent_full_name,
    parent_phone,
    parent_place_of_living,
  } = req.body;
  const user = await UserModel.findOne({ id, role: "student" });
  if (!user) {
    return res.status(404).json({ error: "Student profile not found." });
  }
  if (first_name) user.first_name = first_name;
  if (last_name) user.last_name = last_name;
  if (email) user.email = email;
  if (preferred_language) user.preferred_language = preferred_language;
  user.updated_at = new Date().toISOString();
  await user.save();

  let parent = await ParentModel.findOne({ student_id: id });
  if (!parent) {
    parent = await ParentModel.create({
      id: `parent_${Math.random().toString(36).substring(2, 11)}`,
      student_id: id,
      created_at: new Date().toISOString(),
    });
  }
  if (parent_full_name !== undefined) parent.full_name = parent_full_name;
  if (parent_phone !== undefined) parent.phone = parent_phone;
  if (parent_place_of_living !== undefined)
    parent.place_of_living = parent_place_of_living;
  parent.updated_at = new Date().toISOString();
  await parent.save();

  let app = await ApplicationModel.findOne({ student_id: id });
  if (!app) {
    const appId = `app_${Math.random().toString(36).substring(2, 11)}`;
    app = await ApplicationModel.create({
      id: appId,
      student_id: id,
      target_class: target_class || "Grade 10-A",
      last_school_name: last_school_name || "Saint Jude Middle",
      last_general_grade: last_general_grade
        ? Number(last_general_grade)
        : 15.0,
      parent_full_name: parent_full_name || "",
      parent_phone: parent_phone || "",
      parent_place_of_living: parent_place_of_living || "",
      transcript_file_name: "created_by_admin.pdf",
      payment_receipt_name: "created_by_admin.png",
      recommendation_letter_name: "created_by_admin.pdf",
      status: "approved",
      rejection_reason: null,
      created_at: new Date().toISOString(),
    });
  } else {
    if (target_class) app.target_class = target_class;
    if (last_school_name) app.last_school_name = last_school_name;
    if (last_general_grade !== undefined)
      app.last_general_grade = Number(last_general_grade);
    if (parent_full_name !== undefined) app.parent_full_name = parent_full_name;
    if (parent_phone !== undefined) app.parent_phone = parent_phone;
    if (parent_place_of_living !== undefined)
      app.parent_place_of_living = parent_place_of_living;
    await app.save();
  }
  return res.json({
    id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    preferred_language: user.preferred_language,
    target_class: app.target_class,
    last_school_name: app.last_school_name,
    last_general_grade: app.last_general_grade,
    status: app.status,
  });
});

app.get("/api/stats", async (req, res) => {
  const total = await ApplicationModel.countDocuments();
  const approved = await ApplicationModel.countDocuments({
    status: "approved",
  });
  const rejected = await ApplicationModel.countDocuments({
    status: "rejected",
  });
  const pending = await ApplicationModel.countDocuments({ status: "pending" });

  const classesList = await ClassItemModel.find().lean();
  const class_capacities = [];
  for (const cls of classesList) {
    const assignedCount = await ApplicationModel.countDocuments({
      status: "approved",
      target_class: cls.name,
    });
    class_capacities.push({
      class_name: cls.name,
      count: assignedCount,
      capacity: cls.capacity,
    });
  }
  const stats = {
    total_applicants: total,
    approved,
    rejected,
    pending,
    class_capacities,
  };
  return res.json(stats);
});

app.get("/api/audit-logs", async (req, res) => {
  const { requester_id } = req.query;
  const requester = await UserModel.findOne({ id: requester_id });
  if (
    !requester ||
    (requester.role !== "admin" && requester.role !== "principal")
  ) {
    return res.status(403).json({
      error:
        "Unauthorized. Only administrators and principals can view audit logs.",
    });
  }
  const logs = await AuditLogModel.find().sort({ timestamp: -1 }).lean();
  return res.json(logs);
});

app.post("/api/audit-logs", async (req, res) => {
  const { requester_id, action, details } = req.body;
  const requester = await UserModel.findOne({ id: requester_id });
  if (!requester || requester.role !== "admin") {
    return res.status(403).json({
      error: "Unauthorized. Only administrators can record audit logs.",
    });
  }
  const newLog = await AuditLogModel.create({
    id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    timestamp: new Date().toISOString(),
    user_id: requester.id,
    user_email: requester.email,
    user_role: requester.role,
    action,
    details,
  });
  return res.json({ success: true, log: newLog.toObject() });
});

app.post("/api/id-cards/update-photo", async (req, res) => {
  const { student_id, profile_photo_url } = req.body;
  if (!student_id || !profile_photo_url) {
    return res
      .status(400)
      .json({ error: "Student ID and profile photo are required." });
  }
  const sigDoc = await SignatureModel.findOne({ is_current: true });
  const principalSignature = sigDoc ? sigDoc.signature : null;
  if (!principalSignature) {
    return res.status(400).json({
      error:
        "Principal signature must be added in School Settings before generating/activating ID cards.",
    });
  }
  const card = await SchoolCardModel.findOne({ student_id });
  if (card) {
    card.profile_photo_url = profile_photo_url;
    card.card_status = "generated";
    card.generated_pdf_url = `/api/id-cards/download/${student_id}`;
    await card.save();
    return res.json({ success: true, card: card.toObject() });
  } else {
    const oneYear = new Date();
    oneYear.setFullYear(oneYear.getFullYear() + 1);
    const newCard = await SchoolCardModel.create({
      id: `card_${Math.random().toString(36).substring(2, 11)}`,
      student_id,
      profile_photo_url,
      card_status: "generated",
      generated_pdf_url: `/api/id-cards/download/${student_id}`,
      created_at: new Date().toISOString(),
      valid_until: oneYear.toISOString().split("T")[0],
    });
    return res.status(201).json({ success: true, card: newCard.toObject() });
  }
});

app.get("/api/classes", async (req, res) => {
  const classesList = await ClassItemModel.find().lean();
  const joinedClasses = [];
  for (const c of classesList) {
    const list = [];
    if (c.teachers) {
      for (const t of c.teachers) {
        const teacherUser = await UserModel.findOne({
          id: t.teacher_id,
        }).lean();
        list.push({
          teacher_id: t.teacher_id,
          topic: t.topic || "General",
          day_of_week: t.day_of_week,
          time_slot: t.time_slot,
          teacher_name: teacherUser
            ? `${teacherUser.first_name} ${teacherUser.last_name}`
            : "Unknown Teacher",
        });
      }
    }
    joinedClasses.push({
      ...c,
      teachers: list,
    });
  }
  return res.json(joinedClasses);
});

async function syncTeacherAssignedClasses() {
  const allTeachers = await TeacherProfileModel.find();
  for (const profile of allTeachers) {
    profile.assigned_classes = [];
    await profile.save();
  }
  const allClasses = await ClassItemModel.find();
  for (const cls of allClasses) {
    if (cls.teachers) {
      for (const t of cls.teachers) {
        const profile = await TeacherProfileModel.findOne({ id: t.teacher_id });
        if (profile) {
          if (!profile.assigned_classes.includes(cls.name)) {
            profile.assigned_classes.push(cls.name);
            await profile.save();
          }
        }
      }
    }
  }
}

app.post("/api/classes", async (req, res) => {
  const { name, capacity, subjects, teachers: reqTeachers } = req.body;
  if (!name || !capacity) {
    return res
      .status(400)
      .json({ error: "Class name and capacity are required." });
  }
  const finalTeachers = Array.isArray(reqTeachers)
    ? reqTeachers.map((t) => ({
        teacher_id: String(t.teacher_id),
        topic: String(t.topic || "General"),
      }))
    : [];
  const finalSubjects = Array.isArray(subjects)
    ? subjects.map((s) => String(s).trim()).filter(Boolean)
    : [];
  const newClass = await ClassItemModel.create({
    id: `cls_${Math.random().toString(36).substring(2, 11)}`,
    name,
    capacity: Number(capacity),
    subjects: finalSubjects,
    teachers: finalTeachers,
  });
  await syncTeacherAssignedClasses();
  return res.status(201).json(newClass.toObject());
});

app.put("/api/classes/:id", async (req, res) => {
  const { id } = req.params;
  const { name, capacity, subjects, teachers: reqTeachers } = req.body;
  const cls = await ClassItemModel.findOne({ id });
  if (!cls) {
    return res.status(404).json({ error: "Class not found." });
  }
  const oldClassName = cls.name;
  if (name !== undefined) {
    cls.name = name;
    if (name !== oldClassName) {
      await ApplicationModel.updateMany(
        { target_class: oldClassName },
        { target_class: name },
      );
    }
  }
  if (capacity !== undefined) {
    cls.capacity = Number(capacity);
  }
  if (subjects !== undefined) {
    cls.subjects = Array.isArray(subjects)
      ? subjects.map((s) => String(s).trim()).filter(Boolean)
      : [];
  }
  if (reqTeachers !== undefined) {
    cls.teachers = Array.isArray(reqTeachers)
      ? reqTeachers.map((t) => ({
          teacher_id: String(t.teacher_id),
          topic: String(t.topic || "General"),
        }))
      : [];
  }
  await cls.save();
  await syncTeacherAssignedClasses();
  return res.json(cls.toObject());
});

app.delete("/api/classes/:id", async (req, res) => {
  const { id } = req.params;
  const result = await ClassItemModel.deleteOne({ id });
  if (result.deletedCount === 0) {
    return res.status(404).json({ error: "Class not found." });
  }
  await syncTeacherAssignedClasses();
  return res.json({ success: true, message: "Class removed successfully." });
});

app.post("/api/gemini/analyze-student", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      target_class,
      last_school_name,
      last_general_grade,
      lang,
    } = req.body;
    const aiClient = getGeminiClient();
    const isFr = lang === "fr";
    const prompt = `Analyze this student academic profile:
Name: ${first_name} ${last_name}
Target Class: ${target_class || "Grade 10-A"}
Previous School: ${last_school_name || "N/A"}
Last General Grade/GPA: ${last_general_grade || "14"}/20 (Grades are out of 20, where 16-20 is Excellent, 12-15 is Good/Very Good, 10-11 is Satisfactory/Passing, <10 is failing/struggling).

Please generate a professional assessment and learning strategy.
IMPORTANT: You MUST write the entire response in ${isFr ? "French (français)" : "English"}.
You must return a structured JSON response matching this schema:
{
  "assessment": "Detailed paragraph analyzing their performance, potential, and profile.",
  "readiness": "${isFr ? "Élevée / Moyenne / Faible" : "High / Medium / Low"}",
  "readinessReason": "A brief explanation of why this readiness level was chosen.",
  "strategy": [
    "Strategy 1 (Actionable learning tip tailored to their grade or background)",
    "Strategy 2",
    "Strategy 3"
  ],
  "targetFocus": "Subjects or key cognitive focus areas they should prioritize."
}`;
    const response = await generateContentWithFallback(aiClient, {
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            assessment: { type: Type.STRING },
            readiness: { type: Type.STRING },
            readinessReason: { type: Type.STRING },
            strategy: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            targetFocus: { type: Type.STRING },
          },
          required: [
            "assessment",
            "readiness",
            "readinessReason",
            "strategy",
            "targetFocus",
          ],
        },
      },
    });
    const resultText = response.text;
    if (!resultText) {
      throw new Error("No text returned from Gemini API");
    }
    return res.json(JSON.parse(resultText));
  } catch (error) {
    console.error("Error in analyze-student:", error);
    return res
      .status(500)
      .json({ error: error.message || "Failed to analyze student profile." });
  }
});

app.post("/api/gemini/analyze-teacher", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      qualifications,
      experience_years,
      curriculum_notes,
      lang,
    } = req.body;
    const aiClient = getGeminiClient();
    const isFr = lang === "fr";
    const prompt = `Analyze this teacher's profile for matching and course allocation suggestions:
Name: ${first_name} ${last_name}
Qualifications: ${qualifications || "N/A"}
Years of Experience: ${experience_years || "0"}
Curriculum/Teaching Notes: ${curriculum_notes || "N/A"}

Please generate a matching assessment, suitability recommendation, and delivery tips.
IMPORTANT: You MUST write the entire response in ${isFr ? "French (français)" : "English"}.
You must return a structured JSON response matching this schema:
{
  "suitability": "A detailed analysis of their teaching suitability, level of expertise, and optimal allocation suggestions.",
  "suggestedCourses": [
    "Course/Subject suggestion 1",
    "Course/Subject suggestion 2"
  ],
  "strengths": [
    "Pedagogical strength 1",
    "Pedagogical strength 2"
  ],
  "deliveryTips": "Practical, actionable recommendations for how this teacher can optimize their class delivery."
}`;
    const response = await generateContentWithFallback(aiClient, {
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suitability: { type: Type.STRING },
            suggestedCourses: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            deliveryTips: { type: Type.STRING },
          },
          required: [
            "suitability",
            "suggestedCourses",
            "strengths",
            "deliveryTips",
          ],
        },
      },
    });
    const resultText = response.text;
    if (!resultText) {
      throw new Error("No text returned from Gemini API");
    }
    return res.json(JSON.parse(resultText));
  } catch (error) {
    console.error("Error in analyze-teacher:", error);
    return res
      .status(500)
      .json({ error: error.message || "Failed to analyze teacher profile." });
  }
});

// Admin Principal CRUD Endpoints
app.get("/api/admin/principals", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Unauthorized. Admin access only." });
  }
  const principals = await SignatureModel.find().lean();
  const joined = [];
  for (const p of principals) {
    const u = await UserModel.findOne({ id: p.principal }).lean();
    joined.push({
      ...p,
      first_name: u ? u.first_name : "N/A",
      last_name: u ? u.last_name : "N/A",
      email: u ? u.email : "N/A",
    });
  }
  return res.json(joined);
});

app.post("/api/admin/principals", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Unauthorized. Admin access only." });
  }
  const { principal, year, is_current } = req.body;
  const targetUser = await UserModel.findOne({ id: principal }).lean();
  if (!targetUser) {
    return res.status(400).json({ error: "Linked user account not found." });
  }

  const id = `sig_${Math.random().toString(36).substring(2, 11)}`;

  if (is_current) {
    await SignatureModel.updateMany({}, { $set: { is_current: false } });
  }

  const newPrincipal = await SignatureModel.create({
    id,
    principal,
    first_name: targetUser.first_name,
    last_name: targetUser.last_name,
    name: `${targetUser.first_name} ${targetUser.last_name}`,
    year,
    is_current: !!is_current,
    signature: null,
  });

  return res.status(201).json(newPrincipal.toObject());
});

app.post(
  "/api/admin/principals/create-with-user",
  authMiddleware,
  async (req, res) => {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Unauthorized. Admin access only." });
    }
    const { first_name, last_name, email, password, year, is_current } =
      req.body;
    if (!first_name || !last_name || !email || !password || !year) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const existing = await UserModel.findOne({
      email: { $regex: new RegExp("^" + email + "$", "i") },
    });
    if (existing) {
      return res
        .status(400)
        .json({ error: "Email address already registered." });
    }
    const userId = `usr_${Math.random().toString(36).substring(2, 11)}`;
    const newUser = await UserModel.create({
      id: userId,
      first_name,
      last_name,
      email,
      role: "principal",
      password: hashPassword(password),
      preferred_language: "en",
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    const id = `sig_${Math.random().toString(36).substring(2, 11)}`;

    if (is_current) {
      await SignatureModel.updateMany({}, { $set: { is_current: false } });
    }

    const newPrincipal = await SignatureModel.create({
      id,
      principal: userId,
      first_name,
      last_name,
      name: `${first_name} ${last_name}`,
      year,
      is_current: !!is_current,
      signature: null,
    });

    return res.status(201).json(newPrincipal.toObject());
  },
);

app.put("/api/admin/principals/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Unauthorized. Admin access only." });
  }
  const { id } = req.params;
  const { principal, year, is_current, signature } = req.body;
  const targetUser = await UserModel.findOne({ id: principal }).lean();
  if (!targetUser) {
    return res.status(400).json({ error: "Linked user account not found." });
  }

  if (is_current) {
    await SignatureModel.updateMany(
      { id: { $ne: id } },
      { $set: { is_current: false } },
    );
  }

  const updateFields = {
    principal,
    first_name: targetUser.first_name,
    last_name: targetUser.last_name,
    name: `${targetUser.first_name} ${targetUser.last_name}`,
    year,
    is_current: !!is_current,
  };

  if (signature !== undefined) {
    updateFields.signature = signature;
  }

  const updated = await SignatureModel.findOneAndUpdate(
    { id },
    { $set: updateFields },
    { new: true },
  );

  if (!updated) {
    return res.status(404).json({ error: "Principal record not found." });
  }

  return res.json(updated.toObject());
});

app.delete("/api/admin/principals/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Unauthorized. Admin access only." });
  }
  const { id } = req.params;
  const deleted = await SignatureModel.findOneAndDelete({ id });
  if (!deleted) {
    return res.status(404).json({ error: "Principal record not found." });
  }

  return res.json({ success: true });
});

// Serve frontend assets
async function startServer() {
  // Connect to DB on startup
  await connectDB();
  await seedDatabase();

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `[SERVER RUNNING] Decoupled API & Client on http://localhost:${PORT}`,
    );
  });
}
startServer();
