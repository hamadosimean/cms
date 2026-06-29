import React from "react";
import { motion } from "motion/react";
import { School, X, Printer } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { useAppHandlers } from "../../hooks/useAppHandlers";
export const PrintPreviewModal = () => {
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
    schoolInfo,
    studentClassFilter,
    studentSortField,
    studentSortOrder,
    principalSignature,
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
    printScope,
    setPrintScope,
    teacherSearchQuery,
    teacherClassFilter,
    teacherSortField,
    teacherSortOrder,
  } = store;
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
    displayTeachers,
  } = handlers;

  const isFr = lang === "fr";

  return (
    <>
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 print:p-0 overflow-y-auto print-wrapper-outer">
          {/* Backdrop click to close */}
          <div
            className="absolute inset-0 print:hidden"
            onClick={() => setShowPrintModal(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative z-10 flex flex-col text-left h-[90vh] print:max-h-none print:shadow-none print:border-none print:w-full print:rounded-none"
          >
            {/* Header - Hidden on Print */}
            <div className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center shrink-0 print:hidden">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-blue-400 animate-pulse" />
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-wider">
                    {isFr
                      ? "Aperçu avant Impression"
                      : "Document Print Preview"}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono">
                    {printScope === "teachers"
                      ? isFr
                        ? "Liste filtrée du corps enseignant"
                        : "Filtered faculty and academic staff directory"
                      : isFr
                        ? "Liste filtrée des dossiers scolaires"
                        : "Filtered student academic record directory"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPrintModal(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Print Action Bar - Hidden on Print */}
            <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0 print:hidden">
              <p className="text-xs text-slate-500 font-medium">
                {printScope === "teachers"
                  ? isFr
                    ? `${displayTeachers.length} enseignants affichés selon vos filtres actuels.`
                    : `${displayTeachers.length} teacher profiles matched by your active filters.`
                  : isFr
                    ? `${displayStudents.length} élèves affichés selon vos filtres actuels.`
                    : `${displayStudents.length} student profiles matched by your active filters.`}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-slate-250 hover:bg-slate-300 text-slate-700 rounded-lg transition cursor-pointer min-h-[38px] border-0"
                >
                  {isFr ? "Fermer" : "Close"}
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2 cursor-pointer min-h-[38px] shadow-sm shadow-blue-500/10 border-0"
                >
                  <Printer className="w-4 h-4" />
                  {isFr ? "Imprimer / PDF" : "Print / Save PDF"}
                </button>
              </div>
            </div>

            {/* Document Body - Print Optimized */}
            <div className="p-8 space-y-6 overflow-y-auto print:overflow-visible print:p-0 print:space-y-4 print-only-container">
              {/* Institutional Header */}
              <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <School className="w-6 h-6 text-slate-800" />
                    <span className="font-extrabold text-lg text-slate-900 uppercase tracking-tight">
                      {schoolInfo
                        ? schoolInfo.name
                        : isFr
                          ? "COLLÈGE LA SALE"
                          : "COLLEGE LA SALE"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold font-mono tracking-wide">
                    {isFr
                      ? "OFFICE DE L'ADMINISTRATION ET DU REGISTRE"
                      : "OFFICE OF THE REGISTRAR & ADMIN"}
                  </p>
                </div>
                <div className="text-left sm:text-right text-[10px] text-slate-400 font-mono space-y-0.5">
                  <p>
                    {isFr ? "Document Officiel" : "Official Academic Document"}
                  </p>
                  <p>
                    {isFr ? "Généré le :" : "Generated:"}{" "}
                    {new Date().toLocaleDateString(isFr ? "fr-FR" : "en-US", {
                      dateStyle: "medium",
                    })}
                  </p>
                  <p>
                    {printScope === "teachers"
                      ? (isFr ? "Filtre :" : "Scope:") +
                        " " +
                        (teacherClassFilter === "All"
                          ? isFr
                            ? "Toutes les classes"
                            : "All Classes"
                          : teacherClassFilter)
                      : (isFr ? "Filtre :" : "Scope:") +
                        " " +
                        (studentClassFilter === "All"
                          ? isFr
                            ? "Toutes les classes"
                            : "All Classes"
                          : studentClassFilter)}
                  </p>
                </div>
              </div>

              {/* Document Title */}
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-slate-900 tracking-tight">
                  {printScope === "teachers"
                    ? isFr
                      ? "REGISTRE GÉNÉRAL DE L'ANNUAIRE DES ENSEIGNANTS"
                      : "GENERAL REGISTER OF TEACHER PROFILES"
                    : isFr
                      ? "REGISTRE GÉNÉRAL DE L'ANNUAIRE DES ÉTUDIANTS"
                      : "GENERAL REGISTER OF STUDENT PROFILES"}
                </h4>
                <p className="text-xs text-slate-500 leading-normal">
                  {printScope === "teachers"
                    ? isFr
                      ? "Ce document contient la liste authentifiée des enseignants actifs actuellement enregistrés au sein de l'établissement."
                      : "This authenticated summary lists the active teaching faculty directory matching current administrative filters."
                    : isFr
                      ? "Ce document contient la liste authentifiée des élèves actifs actuellement enregistrés au sein de l'établissement."
                      : "This authenticated summary lists the active student body directory and profiles matching current administrative filters."}
                </p>
              </div>

              {/* Statistics Overview */}
              {printScope === "teachers" ? (
                <div className="grid grid-cols-3 gap-4 border border-slate-200 rounded-xl p-4 bg-slate-50/50 print:bg-transparent print:rounded-none print:border-t print:border-b print:border-l-0 print:border-r-0">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {isFr ? "Enseignants Filtrés" : "Filtered Faculty"}
                    </span>
                    <span className="text-lg font-extrabold text-slate-900">
                      {displayTeachers.length}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {isFr ? "Expérience Moyenne" : "Avg Experience"}
                    </span>
                    <span className="text-lg font-extrabold text-slate-900 font-mono">
                      {(
                        displayTeachers.reduce(
                          (acc, t) =>
                            acc +
                            (t.experience_years !== undefined
                              ? Number(t.experience_years)
                              : 0),
                          0,
                        ) / (displayTeachers.length || 1)
                      ).toFixed(1)}{" "}
                      {isFr ? "ans" : "yrs"}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {isFr ? "Classement Actif" : "Active Sort"}
                    </span>
                    <span className="text-xs font-bold text-slate-900 capitalize block mt-1.5 font-mono">
                      {teacherSortField} ({teacherSortOrder})
                    </span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4 border border-slate-200 rounded-xl p-4 bg-slate-50/50 print:bg-transparent print:rounded-none print:border-t print:border-b print:border-l-0 print:border-r-0">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {isFr ? "Élèves Filtrés" : "Filtered Body"}
                    </span>
                    <span className="text-lg font-extrabold text-slate-900">
                      {displayStudents.length}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {isFr ? "Classement Actif" : "Active Sort"}
                    </span>
                    <span className="text-xs font-bold text-slate-900 capitalize block mt-1.5 font-mono">
                      {studentSortField} ({studentSortOrder})
                    </span>
                  </div>
                </div>
              )}

              {/* Document Table */}
              <div className="overflow-x-auto">
                {printScope === "teachers" ? (
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b-2 border-slate-300 text-[10px] uppercase font-bold text-slate-500 font-mono">
                        <th className="py-2.5 pr-3">
                          {isFr ? "ID / Prénom & Nom" : "ID / Teacher Name"}
                        </th>
                        <th className="py-2.5 px-3">
                          {isFr ? "Adresse E-mail" : "Email Address"}
                        </th>
                        <th className="py-2.5 px-3">
                          {isFr ? "Classes Assignées" : "Assigned Classes"}
                        </th>
                        <th className="py-2.5 px-3">
                          {isFr ? "Qualifications" : "Qualifications"}
                        </th>
                        <th className="py-2.5 pl-3 text-right">
                          {isFr ? "Exp. (ans)" : "Exp. (yrs)"}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {displayTeachers.map((teacher) => (
                        <tr
                          key={teacher.id}
                          className="hover:bg-slate-50/50 print:hover:bg-transparent"
                        >
                          <td className="py-3 pr-3 font-semibold text-slate-900">
                            <span className="block text-[9px] text-slate-400 font-mono font-medium">
                              #{teacher.id?.slice(0, 8)}
                            </span>
                            {teacher.first_name} {teacher.last_name}
                          </td>
                          <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">
                            {teacher.email}
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-[10px] font-medium text-slate-700">
                              {teacher.assigned_classes?.length > 0
                                ? teacher.assigned_classes.join(", ")
                                : "None"}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-slate-500 text-[11px]">
                            {teacher.qualifications || "N/A"}
                          </td>
                          <td className="py-3 pl-3 text-right font-bold text-slate-900 font-mono">
                            {teacher.experience_years || "0"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b-2 border-slate-300 text-[10px] uppercase font-bold text-slate-500 font-mono">
                        <th className="py-2.5 pr-3">
                          {isFr ? "ID / Prénom & Nom" : "ID / Student Name"}
                        </th>
                        <th className="py-2.5 px-3">
                          {isFr ? "Adresse E-mail" : "Email Address"}
                        </th>
                        <th className="py-2.5 px-3">
                          {isFr ? "Classe" : "Assigned Class"}
                        </th>
                        <th className="py-2.5 px-3 text-right">
                          {isFr ? "Moyenne (0-20)" : "Grade /20"}
                        </th>
                        <th className="py-2.5 pl-3 text-right">
                          {isFr ? "Date Reg." : "Reg. Date"}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {displayStudents.map((student) => (
                        <tr
                          key={student.id}
                          className="hover:bg-slate-50/50 print:hover:bg-transparent"
                        >
                          <td className="py-3 pr-3 font-semibold text-slate-900">
                            <span className="block text-[9px] text-slate-400 font-mono font-medium">
                              #{student.id?.slice(0, 8)}
                            </span>
                            {student.first_name} {student.last_name}
                          </td>
                          <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">
                            {student.email}
                          </td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full text-[10px] font-semibold border border-slate-200 font-mono print:bg-transparent print:border-none print:p-0">
                              {student.target_class ||
                                (isFr ? "Non Alloué" : "Unassigned")}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right font-bold text-slate-900 font-mono">
                            {student.last_general_grade !== undefined
                              ? Number(student.last_general_grade).toFixed(1)
                              : "0.0"}
                          </td>
                          <td className="py-3 pl-3 text-right text-slate-500 font-mono text-[11px]">
                            {student.created_at
                              ? new Date(student.created_at).toLocaleDateString(
                                  isFr ? "fr-FR" : "en-US",
                                )
                              : "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Report Footer Note */}
              <div className="pt-8 border-t border-dashed border-slate-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                  <p className="text-[10px] text-slate-400 italic font-medium leading-relaxed max-w-md">
                    {isFr
                      ? "Ce document d'impression est généré dynamiquement sur le serveur d'administration de l'école. Toute modification manuelle non autorisée est strictement interdite."
                      : "This print document was generated dynamically from the secure school administration server. Any unauthorized manual alterations render this document null and void."}
                  </p>
                </div>

                {/* Principal signature visualization if present */}
                <div className="flex flex-col items-center sm:items-end text-center sm:text-right gap-1 min-w-[150px]">
                  {principalSignature ? (
                    <img
                      src={principalSignature}
                      alt="Principal Signature"
                      className="max-h-10 object-contain mix-blend-multiply"
                    />
                  ) : (
                    <div className="h-10 flex items-end justify-center">
                      <span className="text-xs font-serif italic text-slate-700 font-bold border-b border-slate-300 px-4 pb-1">
                        Hamado Simean
                      </span>
                    </div>
                  )}
                  <span className="text-[9px] text-slate-400 uppercase tracking-widest font-extrabold block">
                    {isFr
                      ? "Direction de l'Établissement"
                      : "Institutional Authority Sign-Off"}
                  </span>
                  <span className="text-[8px] text-slate-400 font-mono block">
                    {isFr ? "Signé le : " : "Date of Sign-Off: "}{" "}
                    {new Date().toLocaleDateString(isFr ? "fr-FR" : "en-US", {
                      dateStyle: "medium",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};
