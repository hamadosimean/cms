import React from 'react';
import { motion } from 'motion/react';
import { X, BookOpen, GraduationCap, Sparkles } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { useAppHandlers } from '../../hooks/useAppHandlers';
export const AiTeacherModal = () => {
    const store = useAppStore();
    const handlers = useAppHandlers();
    const { lang, user, adminUsers, adminApplications, adminStudents, adminTeachers, adminIdCards, classesList, toast, setToast, showClassModal, setShowClassModal, editingClassId, setEditingClassId, formClassName, setFormClassName, formClassCapacity, setFormClassCapacity, formClassTeachers, setFormClassTeachers, formClassSubjects, setFormClassSubjects, newSubjectInput, setNewSubjectInput, assignTeacherId, setAssignTeacherId, assignTopic, setAssignTopic, showStudentModal, setShowStudentModal, editingStudentId, setEditingStudentId, formStudentFirst, setFormStudentFirst, formStudentLast, setFormStudentLast, formStudentEmail, setFormStudentEmail, formStudentClass, setFormStudentClass, formStudentSchool, setFormStudentSchool, formStudentGrade, setFormStudentGrade, formStudentLang, setFormStudentLang, showTeacherModal, setShowTeacherModal, editingTeacherId, setEditingTeacherId, formTeacherFirst, setFormTeacherFirst, formTeacherLast, setFormTeacherLast, formTeacherEmail, setFormTeacherEmail, formTeacherQual, setFormTeacherQual, formTeacherExp, setFormTeacherExp, formTeacherNotes, setFormTeacherNotes, formTeacherClasses, setFormTeacherClasses, formTeacherCourses, setFormTeacherCourses, showAdminModal, setShowAdminModal, formAdminFirst, setFormAdminFirst, formAdminLast, setFormAdminLast, formAdminEmail, setFormAdminEmail, formAdminPassword, setFormAdminPassword, formAdminLang, setFormAdminLang, showCardModal, setShowCardModal, editingCard, setEditingCard, formCardFirst, setFormCardFirst, formCardLast, setFormCardLast, formCardClass, setFormCardClass, formCardPhoto, setFormCardPhoto, formCardStatus, setFormCardStatus, formCardValidUntil, setFormCardValidUntil, viewingCard, setViewingCard, selectedStudentAiProfile, setSelectedStudentAiProfile, selectedTeacherAiProfile, setSelectedTeacherAiProfile, loadingAiAnalysis, setLoadingAiAnalysis, showPrintModal, setShowPrintModal, showCommandPalette, setShowCommandPalette, commandPaletteQuery, setCommandPaletteQuery } = store;
    // We spread the handlers so they are available in the scope
    const { handleSaveClass, handleDeleteClass, toggleFormClass, handleRemoveTeacherAssignmentFromClass, toggleFormCourse, handleSaveStudent, handleDeleteStudentClick, handleAnalyzeStudent, handleAdminSaveTeacher, handleDeleteTeacherClick, handleAnalyzeTeacher, handleAdminSaveAdmin, handleAdminDeleteAdmin, handleSaveEditCard, handleCardPhotoUpload, handleBatchPdfDownload, getFilteredCommandPaletteItems, displayStudents } = handlers;
    return (<>
      {selectedTeacherAiProfile && (<div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col text-left">
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse"/>
                <h3 className="font-bold text-sm uppercase tracking-wider">
                  {lang === 'fr' ? 'Analyse d\'Affectation & Adéquation IA' : 'AI Course Suitability & Matching Profile'}
                </h3>
              </div>
              <button onClick={() => setSelectedTeacherAiProfile(null)} className="p-1.5 hover:bg-white/10 rounded-lg text-white/80 hover:text-white transition cursor-pointer">
                <X className="w-5 h-5"/>
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6 overflow-y-auto">
              {/* Teacher Metadata Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <h4 className="font-bold text-base text-slate-800">
                    {selectedTeacherAiProfile.teacher.first_name} {selectedTeacherAiProfile.teacher.last_name}
                  </h4>
                  <p className="text-xs text-slate-500 font-mono">{selectedTeacherAiProfile.teacher.email}</p>
                </div>
                <div className="grid grid-cols-2 sm:flex sm:items-center gap-x-6 gap-y-2 text-xs">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">Experience</span>
                    <span className="font-semibold text-slate-700">{selectedTeacherAiProfile.teacher.experience_years || '0'} Years</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">Qualifications</span>
                    <span className="font-semibold text-slate-700 truncate max-w-[150px] block" title={selectedTeacherAiProfile.teacher.qualifications}>
                      {selectedTeacherAiProfile.teacher.qualifications || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Suitability Assessment */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <div className="w-1.5 h-3 bg-blue-600 rounded-full"></div>
                  {lang === 'fr' ? 'Évaluation d\'Adéquation de l\'Enseignant' : 'Teaching Suitability Assessment'}
                </h4>
                <p className="text-xs text-slate-650 leading-relaxed bg-blue-50/30 border border-blue-100 p-4 rounded-xl">
                  {selectedTeacherAiProfile.analysis.suitability}
                </p>
              </div>

              {/* Suggested Courses & Strengths */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Suggested Courses */}
                <div className="space-y-2.5">
                  <h5 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <div className="w-1.5 h-3 bg-emerald-500 rounded-full"></div>
                    {lang === 'fr' ? 'Affectations de Cours Suggérées' : 'AI Course Allocations'}
                  </h5>
                  <div className="space-y-2">
                    {selectedTeacherAiProfile.analysis.suggestedCourses.map((course, idx) => (<div key={idx} className="flex items-center gap-2.5 bg-emerald-50/40 border border-emerald-100 px-3.5 py-2.5 rounded-xl animate-fade-in">
                        <GraduationCap className="w-4 h-4 text-emerald-600"/>
                        <span className="text-xs font-semibold text-slate-700">{course}</span>
                      </div>))}
                  </div>
                </div>

                {/* Pedagogical Strengths */}
                <div className="space-y-2.5">
                  <h5 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <div className="w-1.5 h-3 bg-indigo-500 rounded-full"></div>
                    {lang === 'fr' ? 'Forces Pédagogiques Clés' : 'Pedagogical Strengths'}
                  </h5>
                  <div className="space-y-2">
                    {selectedTeacherAiProfile.analysis.strengths.map((strength, idx) => (<div key={idx} className="flex gap-2.5 bg-indigo-50/20 border border-indigo-100 px-3.5 py-2.5 rounded-xl items-start">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5"/>
                        <span className="text-xs text-slate-650 leading-tight font-medium">{strength}</span>
                      </div>))}
                  </div>
                </div>
              </div>

              {/* Delivery Tips */}
              <div className="bg-amber-50/30 border border-amber-100 rounded-xl p-4 space-y-1.5">
                <h5 className="font-bold text-xs text-amber-800 uppercase tracking-wider flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-amber-600"/>
                  {lang === 'fr' ? 'Recommandations pour l\'Enseignement' : 'Instructional & Curriculum Delivery Tips'}
                </h5>
                <p className="text-xs text-slate-700 font-medium leading-relaxed font-sans">
                  {selectedTeacherAiProfile.analysis.deliveryTips}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button onClick={() => setSelectedTeacherAiProfile(null)} className="px-5 py-2 text-xs uppercase font-bold tracking-wider bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition cursor-pointer">
                {lang === 'fr' ? 'Fermer' : 'Close'}
              </button>
            </div>
          </motion.div>
        </div>)}

    </>);
};
