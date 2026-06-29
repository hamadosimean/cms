import React from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { getTranslation } from "../../translations";
import { useAppHandlers } from "../../hooks/useAppHandlers";
export const TeacherModal = () => {
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
      {showTeacherModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col text-left"
          >
            <div className="px-6 py-4 bg-white text-slate-800 border-b border-slate-200 flex justify-between items-center shrink-0">
              <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800">
                {editingTeacherId
                  ? getTranslation("editTeacherTitle", lang)
                  : getTranslation("addTeacherBtn", lang)}
              </h3>
              <button
                onClick={() => setShowTeacherModal(false)}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleAdminSaveTeacher}
              className="p-6 space-y-4 overflow-y-auto"
            >
              {/* Biographical */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    First Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formTeacherFirst}
                    onChange={(e) => setFormTeacherFirst(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Last Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formTeacherLast}
                    onChange={(e) => setFormTeacherLast(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Email address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  disabled={!!editingTeacherId}
                  value={formTeacherEmail}
                  onChange={(e) => setFormTeacherEmail(e.target.value)}
                  placeholder="teacher@school.edu"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition disabled:bg-slate-50 disabled:text-slate-400"
                />
              </div>

              {/* Qualifications */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Qualifications & Degrees
                </label>
                <input
                  type="text"
                  value={formTeacherQual}
                  onChange={(e) => setFormTeacherQual(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Years experience
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={formTeacherExp}
                  onChange={(e) => setFormTeacherExp(Number(e.target.value))}
                  className="w-full max-w-[120px] px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition font-mono"
                />
              </div>

              {/* Syllabus Tracking Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Syllabus Notes / Curriculum details
                </label>
                <textarea
                  value={formTeacherNotes}
                  onChange={(e) => setFormTeacherNotes(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200 text-xs min-h-[80px] focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"
                />
              </div>

              {/* Dynamic Schedules Section Assignment */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="block text-xs font-bold text-slate-500 uppercase">
                  Allocate Class Sections
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(classesList.length > 0
                    ? classesList.map((c) => c.name)
                    : [
                        "Grade 10-A",
                        "Grade 10-B",
                        "Grade 11-A",
                        "Grade 11-B",
                        "Grade 12-A",
                      ]
                  ).map((cName) => {
                    const isAllocated = formTeacherClasses.includes(cName);
                    return (
                      <button
                        type="button"
                        key={cName}
                        onClick={() => toggleFormClass(cName)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border transition cursor-pointer ${
                          isAllocated
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {cName}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic course assign */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="block text-xs font-bold text-slate-500 uppercase">
                  Allocate Courses Syllabus
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Mathematics",
                    "Physics",
                    "Chemistry",
                    "Biology",
                    "Literature",
                    "History",
                  ].map((course) => {
                    const isAllocated = formTeacherCourses.includes(course);
                    return (
                      <button
                        type="button"
                        key={course}
                        onClick={() => toggleFormCourse(course)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border transition cursor-pointer ${
                          isAllocated
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {course}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Modal */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowTeacherModal(false)}
                  className="px-4 py-2 text-xs uppercase font-bold text-slate-500 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs uppercase font-bold tracking-wider bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition cursor-pointer"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};
