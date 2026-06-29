import React from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { useAppHandlers } from "../../hooks/useAppHandlers";
export const StudentModal = () => {
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
      {showStudentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col text-left"
          >
            <div className="px-6 py-4 bg-white text-slate-800 border-b border-slate-200 flex justify-between items-center shrink-0">
              <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800">
                {editingStudentId
                  ? lang === "fr"
                    ? "Modifier l'Étudiant"
                    : "Edit Student Profile"
                  : lang === "fr"
                    ? "Ajouter un Étudiant"
                    : "Add New Student Record"}
              </h3>
              <button
                onClick={() => setShowStudentModal(false)}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleSaveStudent}
              className="p-6 space-y-4 overflow-y-auto"
            >
              {/* Biographical names */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    {lang === "fr" ? "Prénom" : "First Name"}{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formStudentFirst}
                    onChange={(e) => setFormStudentFirst(e.target.value)}
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
                    value={formStudentLast}
                    onChange={(e) => setFormStudentLast(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"
                  />
                </div>
              </div>

              {/* Email & Language */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    {lang === "fr" ? "Adresse E-mail" : "Email Address"}{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    disabled={!!editingStudentId}
                    value={formStudentEmail}
                    onChange={(e) => setFormStudentEmail(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition ${editingStudentId ? "bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed font-mono" : "border-slate-200"}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    {lang === "fr" ? "Langue préférée" : "Preferred Language"}
                  </label>
                  <select
                    value={formStudentLang}
                    onChange={(e) => setFormStudentLang(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition bg-white"
                  >
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
              </div>

              {/* Academic details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    {lang === "fr" ? "Classe / Niveau" : "Assigned Class"}
                  </label>
                  <select
                    value={formStudentClass}
                    onChange={(e) => setFormStudentClass(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition bg-white"
                  >
                    <option value="Grade 10-A">Grade 10-A</option>
                    <option value="Grade 10-B">Grade 10-B</option>
                    <option value="Grade 11-A">Grade 11-A</option>
                    <option value="Grade 11-B">Grade 11-B</option>
                    <option value="Grade 12-A">Grade 12-A</option>
                    <option value="Grade 12-B">Grade 12-B</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    {lang === "fr"
                      ? "Moyenne Générale (sur 20)"
                      : "GPA / General Grade (out of 20)"}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="20"
                    required
                    value={formStudentGrade}
                    onChange={(e) => setFormStudentGrade(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"
                  />
                </div>
              </div>

              {/* School Name */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  {lang === "fr" ? "École d'origine" : "Previous School Name"}
                </label>
                <input
                  type="text"
                  value={formStudentSchool}
                  onChange={(e) => setFormStudentSchool(e.target.value)}
                  placeholder="e.g. Saint Jude Middle School"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"
                />
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowStudentModal(false)}
                  className="px-4 py-2 border border-slate-250 hover:bg-slate-50 rounded-lg text-xs font-bold uppercase transition cursor-pointer text-slate-600"
                >
                  {lang === "fr" ? "Annuler" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold uppercase transition shadow-md cursor-pointer"
                >
                  {lang === "fr" ? "Enregistrer" : "Save"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};
