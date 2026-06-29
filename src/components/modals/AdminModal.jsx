import React from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { useAppHandlers } from "../../hooks/useAppHandlers";
export const AdminModal = () => {
  const store = useAppStore();
  const handlers = useAppHandlers();
  const {
    lang,
    user,
    adminUsers,
    adminApplications,
    adminStudents,
    adminTeachers,
    adminIdCards,
    classesList,
    toast,
    setToast,
    showClassModal,
    setShowClassModal,
    editingClassId,
    setEditingClassId,
    formClassName,
    setFormClassName,
    formClassCapacity,
    setFormClassCapacity,
    formClassTeachers,
    setFormClassTeachers,
    formClassSubjects,
    setFormClassSubjects,
    newSubjectInput,
    setNewSubjectInput,
    assignTeacherId,
    setAssignTeacherId,
    assignTopic,
    setAssignTopic,
    showStudentModal,
    setShowStudentModal,
    editingStudentId,
    setEditingStudentId,
    formStudentFirst,
    setFormStudentFirst,
    formStudentLast,
    setFormStudentLast,
    formStudentEmail,
    setFormStudentEmail,
    formStudentClass,
    setFormStudentClass,
    formStudentSchool,
    setFormStudentSchool,
    formStudentGrade,
    setFormStudentGrade,
    formStudentLang,
    setFormStudentLang,
    showTeacherModal,
    setShowTeacherModal,
    editingTeacherId,
    setEditingTeacherId,
    formTeacherFirst,
    setFormTeacherFirst,
    formTeacherLast,
    setFormTeacherLast,
    formTeacherEmail,
    setFormTeacherEmail,
    formTeacherQual,
    setFormTeacherQual,
    formTeacherExp,
    setFormTeacherExp,
    formTeacherNotes,
    setFormTeacherNotes,
    formTeacherClasses,
    setFormTeacherClasses,
    formTeacherCourses,
    setFormTeacherCourses,
    showAdminModal,
    setShowAdminModal,
    formAdminFirst,
    setFormAdminFirst,
    formAdminLast,
    setFormAdminLast,
    formAdminEmail,
    setFormAdminEmail,
    formAdminPassword,
    setFormAdminPassword,
    formAdminLang,
    setFormAdminLang,
    showCardModal,
    setShowCardModal,
    editingCard,
    setEditingCard,
    formCardFirst,
    setFormCardFirst,
    formCardLast,
    setFormCardLast,
    formCardClass,
    setFormCardClass,
    formCardPhoto,
    setFormCardPhoto,
    formCardStatus,
    setFormCardStatus,
    formCardValidUntil,
    setFormCardValidUntil,
    viewingCard,
    setViewingCard,
    selectedStudentAiProfile,
    setSelectedStudentAiProfile,
    selectedTeacherAiProfile,
    setSelectedTeacherAiProfile,
    loadingAiAnalysis,
    setLoadingAiAnalysis,
    showPrintModal,
    setShowPrintModal,
    showCommandPalette,
    setShowCommandPalette,
    commandPaletteQuery,
    setCommandPaletteQuery,
  } = store;
  // We spread the handlers so they are available in the scope
  const {
    handleSaveClass,
    handleDeleteClass,
    toggleFormClass,
    handleRemoveTeacherAssignmentFromClass,
    toggleFormCourse,
    handleSaveStudent,
    handleDeleteStudentClick,
    handleAnalyzeStudent,
    handleAdminSaveTeacher,
    handleDeleteTeacherClick,
    handleAnalyzeTeacher,
    handleAdminSaveAdmin,
    handleAdminDeleteAdmin,
    handleSaveEditCard,
    handleCardPhotoUpload,
    handleBatchPdfDownload,
    getFilteredCommandPaletteItems,
    displayStudents,
  } = handlers;
  return (
    <>
      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col text-left"
          >
            <div className="px-6 py-4 bg-white text-slate-800 border-b border-slate-200 flex justify-between items-center shrink-0">
              <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800">
                {lang === "fr"
                  ? "Ajouter un Administrateur"
                  : "Add New Administrator"}
              </h3>
              <button
                onClick={() => setShowAdminModal(false)}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdminSaveAdmin} className="p-6 space-y-4">
              {/* Biographical */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    {lang === "fr" ? "Prénom" : "First Name"}{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formAdminFirst}
                    onChange={(e) => setFormAdminFirst(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    {lang === "fr" ? "Nom" : "Last Name"}{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formAdminLast}
                    onChange={(e) => setFormAdminLast(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  {lang === "fr" ? "Adresse Email" : "Email Address"}{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formAdminEmail}
                  onChange={(e) => setFormAdminEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"
                  placeholder="admin@school.edu"
                />
              </div>

              {/* Secure Password */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  {lang === "fr" ? "Mot de passe sécurisé" : "Secure Password"}{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={formAdminPassword}
                  onChange={(e) => setFormAdminPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"
                  placeholder="••••••••"
                />
              </div>

              {/* Preferred Language */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  {lang === "fr" ? "Langue préférée" : "Preferred Language"}
                </label>
                <select
                  value={formAdminLang}
                  onChange={(e) => setFormAdminLang(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition bg-white"
                >
                  <option value="en">English (US/UK)</option>
                  <option value="fr">Français (French)</option>
                </select>
              </div>

              {/* Submit buttons */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowAdminModal(false)}
                  className="px-4 py-2 text-xs uppercase font-bold text-slate-500 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  {lang === "fr" ? "Annuler" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs uppercase font-bold tracking-wider bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition cursor-pointer"
                >
                  {lang === "fr" ? "Enregistrer" : "Register Admin"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};
