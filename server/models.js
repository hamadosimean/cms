import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
  id: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  preferred_language: { type: String, default: "en" },
  is_active: { type: Boolean, default: true },
  created_at: { type: String },
  updated_at: { type: String },
});
export const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema);
const applicationSchema = new Schema({
  id: { type: String, required: true, unique: true },
  student_id: { type: String, required: true },
  target_class: { type: String, required: true },
  last_school_name: { type: String, required: true },
  last_general_grade: { type: Number, required: true },
  transcript_file_name: { type: String },
  payment_receipt_name: { type: String },
  recommendation_letter_name: { type: String },
  transcript_base64: { type: String },
  payment_receipt_base64: { type: String },
  recommendation_letter_base64: { type: String },
  status: { type: String, default: "pending" },
  rejection_reason: { type: String, default: null },
  created_at: { type: String },
});
export const ApplicationModel =
  mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);
const schoolCardSchema = new Schema({
  id: { type: String, required: true, unique: true },
  student_id: { type: String, required: true },
  profile_photo_url: { type: String },
  card_status: { type: String, required: true },
  generated_pdf_url: { type: String, default: null },
  created_at: { type: String },
  valid_until: { type: String },
});
export const SchoolCardModel =
  mongoose.models.SchoolCard || mongoose.model("SchoolCard", schoolCardSchema);
const auditLogSchema = new Schema({
  id: { type: String, required: true, unique: true },
  timestamp: { type: String, required: true },
  user_id: { type: String, required: true },
  user_email: { type: String, required: true },
  user_role: { type: String, required: true },
  action: { type: String, required: true },
  details: { type: String, required: true },
});
export const AuditLogModel =
  mongoose.models.AuditLog || mongoose.model("AuditLog", auditLogSchema);
const teacherProfileSchema = new Schema({
  id: { type: String, required: true, unique: true },
  qualifications: { type: String, default: "" },
  experience_years: { type: Number, default: 0 },
  curriculum_notes: { type: String, default: "" },
  assigned_classes: [{ type: String }],
  assigned_courses: [{ type: String }],
});
export const TeacherProfileModel =
  mongoose.models.TeacherProfile ||
  mongoose.model("TeacherProfile", teacherProfileSchema);
const classItemSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  subjects: [{ type: String }],
  teachers: [
    {
      teacher_id: { type: String },
      topic: { type: String },
    },
  ],
});
export const ClassItemModel =
  mongoose.models.ClassItem || mongoose.model("ClassItem", classItemSchema);
const schoolInfoSchema = new Schema({
  id: { type: String, default: "default_school_info" },
  name: { type: String, required: true },
  logo_url: { type: String },
  history: { type: String },
  references: { type: String },
  contact_email: { type: String },
  contact_phone: { type: String },
  contact_address: { type: String },
  geolocation_lat: { type: Number },
  geolocation_lng: { type: Number },
  map_iframe_url: { type: String },
  motto: { type: String },
  established_year: { type: Number },
  principal_name: { type: String },
  website_url: { type: String },
  color_theme: { type: String },
});
export const SchoolInfoModel =
  mongoose.models.SchoolInfo || mongoose.model("SchoolInfo", schoolInfoSchema);
const signatureSchema = new Schema({
  id: { type: String, default: "default_signature" },
  signature: { type: String, default: null },
});
export const SignatureModel =
  mongoose.models.Signature || mongoose.model("Signature", signatureSchema);
