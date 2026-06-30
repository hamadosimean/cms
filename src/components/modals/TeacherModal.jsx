import React from "react";
import { motion } from "motion/react";
import { X, User as UserIcon, ShieldAlert, Download } from "lucide-react";
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
    schoolInfo,
    principalSignature,
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

  const currentTeacher = editingTeacherId ? adminTeachers.find(t => t.id === editingTeacherId) : null;

  const handleAdminTeacherPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && currentTeacher) {
      const reader = new FileReader();
      reader.onloadend = () => {
        store.setCroppingImage(reader.result);
        store.setOnCropComplete(() => async (cropped) => {
          try {
            const res = await fetch(`/api/teachers/${currentTeacher.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ profile_photo_url: cropped }),
            });
            if (res.ok) {
              setToast({ show: true, message: "Teacher photo updated successfully", type: "success" });
              handlers.fetchPortalData();
            } else {
              setToast({ show: true, message: "Failed to save photo", type: "error" });
            }
          } catch (err) {
            setToast({ show: true, message: "Failed to upload photo", type: "error" });
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

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

              {/* Teacher ID Card Preview */}
              {currentTeacher && schoolInfo && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {lang === "fr"
                      ? "Aperçu de la carte"
                      : "Digital ID Card Live Preview"}
                  </label>

                  <div className="mt-4 p-5 rounded-2xl border border-slate-200/80 bg-slate-50 flex flex-col justify-between gap-4 shadow-sm hover:border-slate-300 transition relative overflow-hidden shrink-0 mx-auto max-w-sm">
                    {/* Status Badge */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full border ${
                          currentTeacher.profile_photo_url
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {currentTeacher.profile_photo_url
                          ? lang === "fr"
                            ? "Photo Téléversée"
                            : "Photo Uploaded / Active"
                          : lang === "fr"
                            ? "Photo Manquante"
                            : "Photo Missing"}
                      </span>

                      <span className="text-[10px] text-slate-400 font-mono">
                        Staff ID: {currentTeacher.id?.substring(0, 8).toUpperCase()}
                      </span>
                    </div>

                    {/* Core details */}
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-18 rounded-lg bg-slate-200 border border-slate-300 overflow-hidden shrink-0 shadow-sm flex items-center justify-center">
                        {currentTeacher.profile_photo_url ? (
                          <img
                            src={currentTeacher.profile_photo_url}
                            alt="Teacher profile"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <UserIcon className="w-6 h-6 text-slate-400" />
                        )}
                      </div>

                      <div className="text-left space-y-1">
                        <h4 className="font-bold text-sm text-slate-800 leading-tight">
                          {currentTeacher.first_name} {currentTeacher.last_name}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium">
                          {currentTeacher.email}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">
                          {currentTeacher.qualifications || (lang === "fr" ? "Sans Diplôme" : "No qualifications entered")}
                        </p>
                        <p className="text-[10px] text-indigo-600 font-semibold bg-indigo-50 border border-indigo-200/50 rounded-md px-1.5 py-0.5 inline-block">
                          {lang === "fr" ? "Expérience" : "Experience"}:{" "}
                          <span className="font-bold font-mono">{currentTeacher.experience_years || 0} {lang === "fr" ? "ans" : "years"}</span>
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-200/60">
                      <div>
                        <input type="file" id="teacher-photo-admin" accept="image/*" className="hidden" onChange={handleAdminTeacherPhotoUpload} />
                        <label htmlFor="teacher-photo-admin" className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer border border-slate-300">
                          {lang === "fr" ? "Changer la Photo" : "Update Photo"}
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        {currentTeacher.profile_photo_url ? (
                        <a
                          href={`/api/teacher-id-cards/download/${currentTeacher.id}?lang=${lang}`}
                          download={`Teacher_ID_Card_${currentTeacher.last_name}.pdf`}
                          className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 min-h-10 cursor-pointer decoration-transparent font-sans"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{lang === "fr" ? "Télécharger PDF" : "Download PDF"}</span>
                        </a>
                      ) : (
                        <div className="flex items-center gap-1 text-amber-600 text-xs font-bold">
                          <ShieldAlert className="w-4 h-4 shrink-0" />
                          <span>{lang === "fr" ? "Photo requise" : "Photo required for download"}</span>
                        </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

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
