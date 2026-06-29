/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode';
import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenAI, Type } from '@google/genai';

import { connectDB } from './db.js';
import { UserModel, ApplicationModel, SchoolCardModel, AuditLogModel, TeacherProfileModel, ClassItemModel, SchoolInfoModel, SignatureModel } from './models.js';

let geminiClient = null;
function getGeminiClient() {
    if (!geminiClient) {
        const key = process.env.GEMINI_API_KEY;
        if (!key) {
            throw new Error('GEMINI_API_KEY environment variable is required');
        }
        geminiClient = new GoogleGenAI({
            apiKey: key,
            httpOptions: {
                headers: {
                    'User-Agent': 'aistudio-build',
                }
            }
        });
    }
    return geminiClient;
}

async function generateContentWithFallback(aiClient, params) {
    const modelsToTry = ['gemini-3.5-flash', 'gemini-3.1-flash-lite'];
    let lastError = null;
    for (const model of modelsToTry) {
        const maxRetries = 2; // Try up to 2 times (3 attempts total) for each model
        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                console.log(`Querying Gemini API using model: ${model} (attempt ${attempt + 1})`);
                const response = await aiClient.models.generateContent({
                    ...params,
                    model,
                });
                return response;
            }
            catch (error) {
                lastError = error;
                console.warn(`Attempt ${attempt + 1} with model ${model} failed. Error:`, error.message || error);
                const isRetryable = error.status === 503 || error.status === 429 ||
                    (error.message && (error.message.includes('503') ||
                        error.message.includes('429') ||
                        error.message.includes('UNAVAILABLE') ||
                        error.message.includes('RESOURCE_EXHAUSTED') ||
                        error.message.includes('overloaded') ||
                        error.message.includes('demand')));
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
    throw lastError || new Error('All model attempts failed');
}

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// --- INITIAL DATA ---
const initialUsers = [
    { id: 'usr_admin', first_name: 'Sarah', last_name: 'Ouédraogo', email: 'admin@school.edu', role: 'admin', preferred_language: 'en', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'usr_student1', first_name: 'Ibrahim', last_name: 'Sawadogo', email: 'student@school.edu', role: 'student', preferred_language: 'fr', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'usr_student2', first_name: 'Adama', last_name: 'Kaboré', email: 'adama.kabore@school.edu', role: 'student', preferred_language: 'fr', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'usr_student3', first_name: 'Mariam', last_name: 'Diallo', email: 'mariam.diallo@school.edu', role: 'student', preferred_language: 'en', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'usr_student4', first_name: 'Fatoumata', last_name: 'Traoré', email: 'fatoumata.traore@school.edu', role: 'student', preferred_language: 'fr', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'usr_teacher1', first_name: 'Salif', last_name: 'Barro', email: 'teacher@school.edu', role: 'teacher', preferred_language: 'en', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'usr_teacher2', first_name: 'Boubacar', last_name: 'Compaoré', email: 'feynman@school.edu', role: 'teacher', preferred_language: 'en', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'usr_principal', first_name: 'Alassane', last_name: 'Sana', email: 'principal@school.edu', role: 'principal', preferred_language: 'en', is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
];

const initialApplications = [
    { id: 'app_student1', student_id: 'usr_student1', target_class: 'Grade 10-A', last_school_name: 'Lycée Philippe Zinda Kaboré', last_general_grade: 11.5, transcript_file_name: 'releve_de_notes_ibrahim.pdf', payment_receipt_name: 'recu_inscription_ibrahim.png', recommendation_letter_name: 'lettre_recommandation_ibrahim.pdf', status: 'pending', rejection_reason: null, created_at: new Date(Date.now() - 3600000 * 24).toISOString() },
    { id: 'app_student2', student_id: 'usr_student2', target_class: 'Grade 11-A', last_school_name: 'Lycée Municipal de Ouagadougou', last_general_grade: 18.2, transcript_file_name: 'transcript_adama.pdf', payment_receipt_name: 'receipt_adama.png', recommendation_letter_name: 'recommendation_adama.pdf', status: 'approved', rejection_reason: null, created_at: new Date(Date.now() - 3600000 * 48).toISOString() },
    { id: 'app_student3', student_id: 'usr_student3', target_class: 'Grade 12-A', last_school_name: 'Collège de la Salle Ouagadougou', last_general_grade: 19.5, transcript_file_name: 'transcript_mariam.pdf', payment_receipt_name: 'receipt_mariam.png', recommendation_letter_name: 'recommendation_mariam.pdf', status: 'approved', rejection_reason: null, created_at: new Date(Date.now() - 3600000 * 72).toISOString() },
    { id: 'app_student4', student_id: 'usr_student4', target_class: 'Grade 10-B', last_school_name: 'Lycée Ouezzin Coulibaly de Bobo', last_general_grade: 8.5, transcript_file_name: 'releve_fatoumata.pdf', payment_receipt_name: 'recu_fatoumata.pdf', recommendation_letter_name: 'lettre_fatoumata.pdf', status: 'rejected', rejection_reason: 'The academic transcripts show a general grade below our minimum threshold of 10.00/20.00.', created_at: new Date(Date.now() - 3600000 * 96).toISOString() }
];

const initialSchoolCards = [
    { id: 'card_student2', student_id: 'usr_student2', profile_photo_url: '', card_status: 'generated', generated_pdf_url: '/api/id-cards/download/usr_student2', created_at: new Date().toISOString(), valid_until: '2027-06-30' }
];

const initialAuditLogs = [
    { id: 'log_pre_1', timestamp: new Date(Date.now() - 3600000 * 48).toISOString(), user_id: 'usr_admin', user_email: 'admin@school.edu', user_role: 'admin', action: 'SYSTEM_START', details: 'Lycée Privé Alassane Sana Student Information System initialized successfully.' },
    { id: 'log_pre_2', timestamp: new Date(Date.now() - 3600000 * 36).toISOString(), user_id: 'usr_admin', user_email: 'admin@school.edu', user_role: 'admin', action: 'SCHOOL_SETTINGS_CHANGED', details: 'School general configuration updated: Motto set to "Excellence, Discipline, Progress".' },
    { id: 'log_pre_3', timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), user_id: 'usr_admin', user_email: 'admin@school.edu', user_role: 'admin', action: 'TEACHER_ADDED', details: 'Teacher Sarah Ouédraogo profile created with assigned curriculum details.' }
];

const initialTeacherProfiles = [
    { id: 'usr_teacher1', qualifications: 'Ph.D. in Theoretical Physics', experience_years: 15, curriculum_notes: 'Teaching advanced quantum electrodynamics and thermodynamics syllabus tracking.', assigned_classes: ['Grade 12-A', 'Grade 11-A'], assigned_courses: ['Physics', 'Advanced Mathematics'] },
    { id: 'usr_teacher2', qualifications: 'Ph.D. in Physics (Nobel Laureate)', experience_years: 12, curriculum_notes: 'Focusing on conceptual physics, quantum mechanics, and interactive student seminars.', assigned_classes: ['Grade 10-A', 'Grade 11-B'], assigned_courses: ['Physics', 'Chemistry'] }
];

const initialClasses = [
    { id: 'c1', name: 'Grade 10-A', capacity: 30, subjects: ['Physics', 'Chemistry', 'Advanced Mathematics'], teachers: [{ teacher_id: 'usr_teacher2', topic: 'Chemistry' }, { teacher_id: 'usr_teacher1', topic: 'Physics' }] },
    { id: 'c2', name: 'Grade 10-B', capacity: 30, subjects: ['Physics', 'Chemistry'], teachers: [] },
    { id: 'c3', name: 'Grade 11-A', capacity: 25, subjects: ['Advanced Mathematics', 'Physics'], teachers: [{ teacher_id: 'usr_teacher1', topic: 'Advanced Mathematics' }] },
    { id: 'c4', name: 'Grade 11-B', capacity: 25, subjects: ['Physics', 'Chemistry'], teachers: [] },
    { id: 'c5', name: 'Grade 12-A', capacity: 20, subjects: ['Physics', 'Advanced Mathematics'], teachers: [{ teacher_id: 'usr_teacher1', topic: 'Physics' }] }
];

const initialSchoolInfo = {
    id: 'default_school_info', name: "Saint Jude International Academy", logo_url: "", history: "Founded in 1982, Saint Jude International Academy has been a beacon of academic excellence and intellectual integrity for over four decades. Our curriculum blends rigorous scientific inquiry with classical humanities, fostering an environment where curiosity is celebrated and potential is fully realized.", references: "Accredited by the International Council of Schools, Partnered with European Physics League, Recipient of the National Scientific Initiative Award 2024.", contact_email: "info@school.edu", contact_phone: "+33 1 42 76 00 00", contact_address: "12 Avenue des Sciences, 75005 Paris, France", geolocation_lat: 48.8462, geolocation_lng: 2.3447, map_iframe_url: "https://maps.google.com/maps?q=48.8462,2.3447&t=&z=13&ie=UTF8&iwloc=&output=embed", motto: "Excellence, Discipline, Progress", established_year: 1982, principal_name: "Jean-Luc Picard", website_url: "https://saintjude.edu", color_theme: "#2563eb"
};

async function seedDatabase() {
    if (await UserModel.countDocuments() === 0) await UserModel.insertMany(initialUsers);
    if (await ApplicationModel.countDocuments() === 0) await ApplicationModel.insertMany(initialApplications);
    if (await SchoolCardModel.countDocuments() === 0) await SchoolCardModel.insertMany(initialSchoolCards);
    if (await AuditLogModel.countDocuments() === 0) await AuditLogModel.insertMany(initialAuditLogs);
    if (await TeacherProfileModel.countDocuments() === 0) await TeacherProfileModel.insertMany(initialTeacherProfiles);
    if (await ClassItemModel.countDocuments() === 0) await ClassItemModel.insertMany(initialClasses);
    if (await SchoolInfoModel.countDocuments() === 0) await SchoolInfoModel.create(initialSchoolInfo);
    if (await SignatureModel.countDocuments() === 0) await SignatureModel.create({ id: 'default_signature', signature: null });
}

// Helper to simulate email alerts in Console
function simulateEmailAlert(user, subject, body) {
    console.log(`\n======================================================`);
    console.log(`[EMAIL DISPATCH SIMULATOR]`);
    console.log(`To: ${user.first_name} ${user.last_name} <${user.email}>`);
    console.log(`Language: ${user.preferred_language.toUpperCase()}`);
    console.log(`Subject: ${subject}`);
    console.log(`------------------------------------------------------`);
    console.log(body);
    console.log(`======================================================\n`);
}

// --- REST API ENDPOINTS ---
app.post('/api/auth/register', async (req, res) => {
    const { first_name, last_name, email, password, role, preferred_language } = req.body;
    if (!first_name || !last_name || !email || !password || !role) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    const existing = await UserModel.findOne({ email: { $regex: new RegExp('^' + email + '$', 'i') } });
    if (existing) {
        return res.status(400).json({ error: 'Email address already registered.' });
    }
    const userId = `usr_${Math.random().toString(36).substring(2, 11)}`;
    const newUser = await UserModel.create({
        id: userId,
        first_name,
        last_name,
        email,
        role,
        preferred_language: preferred_language || 'en',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    });
    if (role === 'teacher') {
        await TeacherProfileModel.create({
            id: userId,
            qualifications: '',
            experience_years: 0,
            curriculum_notes: '',
            assigned_classes: [],
            assigned_courses: []
        });
    }
    return res.status(201).json(newUser.toObject());
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }
    const user = await UserModel.findOne({ email: { $regex: new RegExp('^' + email + '$', 'i') } }).lean();
    if (!user || password !== 'password') {
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials. Use student@school.edu, teacher@school.edu, or admin@school.edu with "password".' });
        }
    }
    return res.json(user);
});

app.get('/api/users', async (req, res) => {
    const users = await UserModel.find({ is_active: { $ne: false } }).lean();
    return res.json(users);
});

app.post('/api/admins', async (req, res) => {
    const { first_name, last_name, email, password, preferred_language } = req.body;
    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    const existing = await UserModel.findOne({ email: { $regex: new RegExp('^' + email + '$', 'i') } });
    if (existing) {
        return res.status(400).json({ error: 'Email address already registered.' });
    }
    const userId = `usr_${Math.random().toString(36).substring(2, 11)}`;
    const newUser = await UserModel.create({
        id: userId,
        first_name,
        last_name,
        email,
        role: 'admin',
        preferred_language: preferred_language || 'en',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    });
    return res.status(201).json(newUser.toObject());
});

app.delete('/api/admins/:id', async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findOne({ id, role: 'admin' });
    if (!user) {
        return res.status(404).json({ error: 'Administrator not found or is not an admin.' });
    }
    await UserModel.deleteOne({ id, role: 'admin' });
    return res.json({ success: true, message: 'Administrator removed successfully.' });
});

app.put('/api/auth/profile', async (req, res) => {
    const { id, first_name, last_name, preferred_language } = req.body;
    const user = await UserModel.findOne({ id });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    if (first_name) user.first_name = first_name;
    if (last_name) user.last_name = last_name;
    if (preferred_language) user.preferred_language = preferred_language;
    user.updated_at = new Date().toISOString();
    await user.save();
    return res.json(user.toObject());
});

app.get('/api/applications', async (req, res) => {
    const { student_id } = req.query;
    let query = {};
    if (student_id) query.student_id = student_id;
    const apps = await ApplicationModel.find(query).lean();
    return res.json(apps);
});

app.post('/api/applications', async (req, res) => {
    const { student_id, target_class, last_school_name, last_general_grade, transcript_file_name, payment_receipt_name, recommendation_letter_name } = req.body;
    if (!student_id || !target_class || !last_school_name || last_general_grade === undefined) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    await ApplicationModel.deleteMany({ student_id });
    const newApp = await ApplicationModel.create({
        id: `app_${Math.random().toString(36).substring(2, 11)}`,
        student_id,
        target_class,
        last_school_name,
        last_general_grade: Number(last_general_grade),
        transcript_file_name: transcript_file_name || 'transcript.pdf',
        payment_receipt_name: payment_receipt_name || 'receipt.png',
        recommendation_letter_name: recommendation_letter_name || 'letter.pdf',
        status: 'pending',
        rejection_reason: null,
        created_at: new Date().toISOString()
    });
    return res.status(201).json(newApp.toObject());
});
