import React from 'react';
import { motion } from 'motion/react';
import { X, Sparkles } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { useAppHandlers } from '../../hooks/useAppHandlers';
export const AiStudentModal = () => {
    const store = useAppStore();
    const handlers = useAppHandlers();
    const { lang, user, adminUsers, adminApplications, adminStudents, adminTeachers, adminIdCards, classesList, toast, setToast, showClassModal, setShowClassModal, editingClassId, setEditingClassId, formClassName, setFormClassName, formClassCapacity, setFormClassCapacity, formClassTeachers, setFormClassTeachers, formClassSubjects, setFormClassSubjects, newSubjectInput, setNewSubjectInput, assignTeacherId, setAssignTeacherId, assignTopic, setAssignTopic, showStudentModal, setShowStudentModal, editingStudentId, setEditingStudentId, formStudentFirst, setFormStudentFirst, formStudentLast, setFormStudentLast, formStudentEmail, setFormStudentEmail, formStudentClass, setFormStudentClass, formStudentSchool, setFormStudentSchool, formStudentGrade, setFormStudentGrade, formStudentLang, setFormStudentLang, showTeacherModal, setShowTeacherModal, editingTeacherId, setEditingTeacherId, formTeacherFirst, setFormTeacherFirst, formTeacherLast, setFormTeacherLast, formTeacherEmail, setFormTeacherEmail, formTeacherQual, setFormTeacherQual, formTeacherExp, setFormTeacherExp, formTeacherNotes, setFormTeacherNotes, formTeacherClasses, setFormTeacherClasses, formTeacherCourses, setFormTeacherCourses, showAdminModal, setShowAdminModal, formAdminFirst, setFormAdminFirst, formAdminLast, setFormAdminLast, formAdminEmail, setFormAdminEmail, formAdminPassword, setFormAdminPassword, formAdminLang, setFormAdminLang, showCardModal, setShowCardModal, editingCard, setEditingCard, formCardFirst, setFormCardFirst, formCardLast, setFormCardLast, formCardClass, setFormCardClass, formCardPhoto, setFormCardPhoto, formCardStatus, setFormCardStatus, formCardValidUntil, setFormCardValidUntil, viewingCard, setViewingCard, selectedStudentAiProfile, setSelectedStudentAiProfile, selectedTeacherAiProfile, setSelectedTeacherAiProfile, loadingAiAnalysis, setLoadingAiAnalysis, showPrintModal, setShowPrintModal, showCommandPalette, setShowCommandPalette, commandPaletteQuery, setCommandPaletteQuery } = store;
    // We spread the handlers so they are available in the scope
    const { handleSaveClass, handleDeleteClass, toggleFormClass, handleRemoveTeacherAssignmentFromClass, toggleFormCourse, handleSaveStudent, handleDeleteStudentClick, handleAnalyzeStudent, handleAdminSaveTeacher, handleDeleteTeacherClick, handleAnalyzeTeacher, handleAdminSaveAdmin, handleAdminDeleteAdmin, handleSaveEditCard, handleCardPhotoUpload, handleBatchPdfDownload, getFilteredCommandPaletteItems, displayStudents } = handlers;
    return (<>
      {selectedStudentAiProfile && (<div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col text-left">
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse"/>
                <h3 className="font-bold text-sm uppercase tracking-wider">
                  {lang === 'fr' ? 'Profil & Stratégie Académique IA' : 'AI Student Profile & Academic Strategy'}
                </h3>
              </div>
              <button onClick={() => setSelectedStudentAiProfile(null)} className="p-1.5 hover:bg-white/10 rounded-lg text-white/80 hover:text-white transition cursor-pointer">
                <X className="w-5 h-5"/>
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6 overflow-y-auto">
              {/* Student Metadata Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <h4 className="font-bold text-base text-slate-800">
                    {selectedStudentAiProfile.student.first_name} {selectedStudentAiProfile.student.last_name}
                  </h4>
                  <p className="text-xs text-slate-500 font-mono">{selectedStudentAiProfile.student.email}</p>
                </div>
                <div className="grid grid-cols-2 sm:flex sm:items-center gap-x-6 gap-y-2 text-xs">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">Class</span>
                    <span className="font-semibold text-slate-700">{selectedStudentAiProfile.student.target_class || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">GPA / Grade</span>
                    <span className="font-semibold text-slate-700">{selectedStudentAiProfile.student.last_general_grade || '0'}/20</span>
                  </div>
                </div>
              </div>

              {/* Assessment */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <div className="w-1.5 h-3 bg-blue-600 rounded-full"></div>
                  {lang === 'fr' ? 'Évaluation Académique Globale' : 'Overall Academic Assessment'}
                </h4>
                <p className="text-xs text-slate-650 leading-relaxed bg-blue-50/30 border border-blue-100 p-4 rounded-xl">
                  {selectedStudentAiProfile.analysis.assessment}
                </p>
              </div>

              {/* Readiness & Reason */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-center items-center text-center">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {lang === 'fr' ? 'Préparation' : 'Academic Readiness'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase border ${['high', 'élevée', 'élevee'].includes(selectedStudentAiProfile.analysis.readiness.toLowerCase())
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : ['medium', 'moyenne'].includes(selectedStudentAiProfile.analysis.readiness.toLowerCase())
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                    {selectedStudentAiProfile.analysis.readiness}
                  </span>
                </div>
                <div className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-center">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {lang === 'fr' ? 'Explication de la préparation' : 'Readiness Justification'}
                  </span>
                  <p className="text-xs text-slate-650 italic">
                    {selectedStudentAiProfile.analysis.readinessReason}
                  </p>
                </div>
              </div>

              {/* Learning Strategy Checklist */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <div className="w-1.5 h-3 bg-indigo-600 rounded-full"></div>
                  {lang === 'fr' ? 'Stratégies de Réussite Recommandées' : 'Recommended Success Strategies'}
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {selectedStudentAiProfile.analysis.strategy.map((strat, idx) => (<div key={idx} className="flex gap-3 bg-indigo-50/20 border border-indigo-100 p-3 rounded-xl items-start">
                      <span className="w-5 h-5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs text-slate-650 leading-relaxed">{strat}</p>
                    </div>))}
                </div>
              </div>

              {/* Target Focus Subject */}
              <div className="bg-amber-50/30 border border-amber-100 rounded-xl p-4 space-y-1.5">
                <h5 className="font-bold text-xs text-amber-800 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600"/>
                  {lang === 'fr' ? 'Matières Clés & Objectifs Cognitifs' : 'Key Cognitive & Subject Focus'}
                </h5>
                <p className="text-xs text-slate-750 font-medium">
                  {selectedStudentAiProfile.analysis.targetFocus}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button onClick={() => setSelectedStudentAiProfile(null)} className="px-5 py-2 text-xs uppercase font-bold tracking-wider bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition cursor-pointer">
                {lang === 'fr' ? 'Fermer' : 'Close'}
              </button>
            </div>
          </motion.div>
        </div>)}

    </>);
};
