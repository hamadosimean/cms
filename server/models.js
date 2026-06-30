import mongoose, { Schema } from "mongoose";

/**
 * ============================================================================
 * USER ACCOUNT SCHEMA
 * ============================================================================
 * Handles the base authentication and generic profile for all actors in the
 * college management system (Students, Teachers, Admins, Principals).
 * Role-based access control relies on the 'role' field.
 */
const userSchema = new Schema({
  id: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true }, // e.g., 'student', 'teacher', 'admin'
  preferred_language: { type: String, default: "en" },
  is_active: { type: Boolean, default: true },
  password: { type: String },
  created_at: { type: String },
  updated_at: { type: String },
});
export const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema);

/**
 * ============================================================================
 * STUDENT APPLICATION SCHEMA
 * ============================================================================
 * Handles the admission pipeline for a student.
 * Links to the User table via student_id.
 */
const applicationSchema = new Schema({
  id: { type: String, required: true, unique: true },
  student_id: { type: String, required: true }, // Refers to UserModel (role: student)
  target_class: { type: String, required: true }, // The desired cohort/academic class (e.g., 'Grade 10-A')
  last_school_name: { type: String, required: true },
  last_general_grade: { type: Number, required: true }, // General GPA out of 20
  transcript_file_name: { type: String },
  payment_receipt_name: { type: String },
  recommendation_letter_name: { type: String },
  transcript_base64: { type: String },
  payment_receipt_base64: { type: String },
  recommendation_letter_base64: { type: String },
  status: { type: String, default: "pending" }, // e.g., 'pending', 'approved', 'rejected'
  rejection_reason: { type: String, default: null },
  created_at: { type: String },
});
export const ApplicationModel =
  mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);

/**
 * ============================================================================
 * PARENT SCHEMA
 * ============================================================================
 * A dedicated schema to store parent/guardian information to keep the user
 * schema clean. Links directly to a pupil (student_id).
 */
const parentSchema = new Schema({
  id: { type: String, required: true, unique: true },
  student_id: { type: String, required: true }, // Refers to UserModel (role: student)
  full_name: { type: String, default: "" }, // Full name of the parent/guardian
  phone: { type: String, default: "" }, // Contact number for the parent
  place_of_living: { type: String, default: "" }, // Residential address/location
  created_at: { type: String },
  updated_at: { type: String },
});
export const ParentModel =
  mongoose.models.Parent || mongoose.model("Parent", parentSchema);

/**
 * ============================================================================
 * SCHOOL CARD SCHEMA
 * ============================================================================
 * Manages the generation and status of student ID cards upon admission.
 */
const schoolCardSchema = new Schema({
  id: { type: String, required: true, unique: true },
  student_id: { type: String, required: true }, // Refers to UserModel (role: student)
  profile_photo_url: { type: String },
  card_status: { type: String, required: true },
  generated_pdf_url: { type: String, default: null },
  created_at: { type: String },
  valid_until: { type: String }, // Expiry date of the school card (usually end of academic year)
});
export const SchoolCardModel =
  mongoose.models.SchoolCard || mongoose.model("SchoolCard", schoolCardSchema);

/**
 * ============================================================================
 * AUDIT LOG SCHEMA
 * ============================================================================
 * Tracks critical actions (like admission approvals, user deletions) for
 * security and compliance within the college management system.
 */
const auditLogSchema = new Schema({
  id: { type: String, required: true, unique: true },
  timestamp: { type: String, required: true },
  user_id: { type: String, required: true }, // The admin performing the action
  user_email: { type: String, required: true },
  user_role: { type: String, required: true },
  action: { type: String, required: true },
  details: { type: String, required: true },
});
export const AuditLogModel =
  mongoose.models.AuditLog || mongoose.model("AuditLog", auditLogSchema);

/**
 * ============================================================================
 * TEACHER PROFILE SCHEMA
 * ============================================================================
 * Extends the UserModel for faculty staff.
 * Contains academic-specific data (qualifications) rather than general user data.
 */
const teacherProfileSchema = new Schema({
  id: { type: String, required: true, unique: true }, // Refers to UserModel (role: teacher)
  qualifications: { type: String, default: "" }, // e.g. "PhD in Physics"
  experience_years: { type: Number, default: 0 },
  curriculum_notes: { type: String, default: "" },
  assigned_classes: [{ type: String }], // Array of ClassItem IDs this teacher manages
  assigned_courses: [{ type: String }], // Array of Subject/Course names this teacher teaches
  profile_photo_url: { type: String, default: "" },
  staff_signature: { type: String, default: "" }, // Base64 signature for signing documents
});
export const TeacherProfileModel =
  mongoose.models.TeacherProfile ||
  mongoose.model("TeacherProfile", teacherProfileSchema);

/**
 * ============================================================================
 * ACADEMIC CLASS / COHORT SCHEMA (ClassItemModel)
 * ============================================================================
 * NOTE: "Class" here refers to an Academic Cohort / Section (e.g., "Grade 10-A").
 * It does NOT refer to a physical "Classroom" or "Building".
 * Therefore, "capacity" defines the maximum number of students that can be
 * enrolled in this specific cohort, NOT the physical dimensions of a room.
 */
const classItemSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true }, // Name of the cohort (e.g. 'Grade 10-A')
  capacity: { type: Number, required: true }, // Max amount of students that can enroll in this cohort
  subjects: [{ type: String }], // Subjects taught to this cohort
  teachers: [
    {
      teacher_id: { type: String }, // Links to UserModel (role: teacher)
      topic: { type: String }, // Specific subject the teacher teaches to this cohort
      day_of_week: { type: String }, // Day of the week for this class (e.g. Monday)
      time_slot: { type: String }, // Time slot (e.g. 08h-12h)
    },
  ],
});
export const ClassItemModel =
  mongoose.models.ClassItem || mongoose.model("ClassItem", classItemSchema);

/**
 * ============================================================================
 * SCHOOL/CAMPUS GLOBAL SETTINGS SCHEMA (SchoolInfoModel)
 * ============================================================================
 * Stores global branding, contact, and geographical information for the college.
 * - geolocation (lat/long) is stored here because it represents the actual
 *   campus location for the public landing page map.
 * - principal_name is a simple denormalized string for quick UI rendering on
 *   the public landing page, without requiring a JOIN on the UserModel.
 */
const schoolInfoSchema = new Schema({
  id: { type: String, default: "default_school_info" },
  name: { type: String, required: true },
  logo_url: { type: String },
  history: { type: String },
  references: { type: String },
  contact_email: { type: String },
  contact_phone: { type: String },
  contact_address: { type: String },
  geolocation_lat: { type: Number }, // Latitude of the campus for the Map iFrame
  geolocation_lng: { type: Number }, // Longitude of the campus for the Map iFrame
  map_iframe_url: { type: String },
  motto: { type: String },
  established_year: { type: Number },
  principal_name: { type: String }, // Denormalized name for the public UI display
  website_url: { type: String },
  color_theme: { type: String }, // Used to dynamically theme the frontend
  school_year: { type: String, default: "2025-2026" },
});
export const SchoolInfoModel =
  mongoose.models.SchoolInfo || mongoose.model("SchoolInfo", schoolInfoSchema);

/**
 * ============================================================================
 * OFFICIAL SIGNATURE SCHEMA
 * ============================================================================
 * Used to securely store and link the digital signatures of the principal
 * or authorized administrators. This is distinct from SchoolInfo as it tracks
 * historical signatures and links them to specific users (via first_name, last_name).
 */
const signatureSchema = new Schema({
  id: { type: String, required: true, unique: true },
  signature: { type: String, default: null }, // Base64 signature image
  principal: { type: String }, // The user_id of the principal (from UserModel)
  name: { type: String }, // Display name for the signature block
  first_name: { type: String }, // First name of the signer
  last_name: { type: String }, // Last name of the signer
  year: { type: String }, // Academic year this signature is valid for
  is_current: { type: Boolean, default: false }, // Whether this is the active signature
});
export const SignatureModel =
  mongoose.models.Signature || mongoose.model("Signature", signatureSchema);
