import React from 'react';
import { motion } from 'motion/react';
import { X, GraduationCap } from 'lucide-react';
import { StudentIDCard } from '../../components/StudentIDCard';
import { useAppStore } from '../../store/useAppStore';
import { useAppHandlers } from '../../hooks/useAppHandlers';
export const CardViewModal = () => {
    const store = useAppStore();
    const handlers = useAppHandlers();
    const { lang, user, adminUsers, adminApplications, adminStudents, adminTeachers, adminIdCards, classesList, toast, setToast, showClassModal, setShowClassModal, editingClassId, setEditingClassId, formClassName, setFormClassName, formClassCapacity, setFormClassCapacity, formClassTeachers, setFormClassTeachers, formClassSubjects, setFormClassSubjects, newSubjectInput, setNewSubjectInput, assignTeacherId, setAssignTeacherId, assignTopic, setAssignTopic, showStudentModal, setShowStudentModal, editingStudentId, setEditingStudentId, formStudentFirst, setFormStudentFirst, formStudentLast, setFormStudentLast, formStudentEmail, setFormStudentEmail, formStudentClass, setFormStudentClass, formStudentSchool, setFormStudentSchool, formStudentGrade, setFormStudentGrade, formStudentLang, setFormStudentLang, showTeacherModal, setShowTeacherModal, editingTeacherId, setEditingTeacherId, formTeacherFirst, setFormTeacherFirst, formTeacherLast, setFormTeacherLast, formTeacherEmail, setFormTeacherEmail, formTeacherQual, setFormTeacherQual, formTeacherExp, setFormTeacherExp, formTeacherNotes, setFormTeacherNotes, formTeacherClasses, setFormTeacherClasses, formTeacherCourses, setFormTeacherCourses, showAdminModal, setShowAdminModal, formAdminFirst, setFormAdminFirst, formAdminLast, setFormAdminLast, formAdminEmail, setFormAdminEmail, formAdminPassword, setFormAdminPassword, formAdminLang, setFormAdminLang, showCardModal, setShowCardModal, editingCard, setEditingCard, formCardFirst, setFormCardFirst, formCardLast, setFormCardLast, formCardClass, setFormCardClass, formCardPhoto, setFormCardPhoto, formCardStatus, setFormCardStatus, formCardValidUntil, setFormCardValidUntil, viewingCard, setViewingCard, principalSignature, selectedStudentAiProfile, setSelectedStudentAiProfile, selectedTeacherAiProfile, setSelectedTeacherAiProfile, loadingAiAnalysis, setLoadingAiAnalysis, showPrintModal, setShowPrintModal, showCommandPalette, setShowCommandPalette, commandPaletteQuery, setCommandPaletteQuery } = store;
    // We spread the handlers so they are available in the scope
    const { handleSaveClass, handleDeleteClass, toggleFormClass, handleRemoveTeacherAssignmentFromClass, toggleFormCourse, handleSaveStudent, handleDeleteStudentClick, handleAnalyzeStudent, handleAdminSaveTeacher, handleDeleteTeacherClick, handleAnalyzeTeacher, handleAdminSaveAdmin, handleAdminDeleteAdmin, handleSaveEditCard, handleCardPhotoUpload, handleBatchPdfDownload, getFilteredCommandPaletteItems, displayStudents, getStudentName, } = handlers;
    return (<>
      {viewingCard && (<div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col text-left">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 text-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600"/>
                <span className="font-bold text-sm uppercase tracking-wider text-slate-800">
                  {lang === 'fr' ? "Visualisation de la Carte d'Étudiant" : "Student ID Card Viewer"}
                </span>
              </div>
              <button onClick={() => setViewingCard(null)} className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition">
                <X className="w-5 h-5"/>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
              {/* The ID Card Preview Container */}
              <StudentIDCard lang={lang} studentId={viewingCard.student_id} firstName={getStudentName(viewingCard.student_id).split(' ')[1] || ''} lastName={getStudentName(viewingCard.student_id).split(' ')[0] || ''} targetClass={adminApplications.find(a => a.student_id === viewingCard.student_id)?.target_class || 'Grade 10-A'} idPhoto={viewingCard.profile_photo_url} validUntil={viewingCard.valid_until} principalSignature={principalSignature} cardStatus={viewingCard.card_status}/>

              {/* Status & Validation details */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs">
                <p className="text-slate-600">
                  <strong>Status:</strong>{' '}
                  <span className={`font-bold ${viewingCard.card_status === 'generated' ? 'text-emerald-600' : 'text-amber-500'}`}>
                    {viewingCard.card_status === 'generated' ? 'Active & Generated' : 'Pending Verification Approval'}
                  </span>
                </p>
                <p className="text-slate-600">
                  <strong>Verification URL:</strong>{' '}
                  <a href={`${window.location.origin}/verify/${viewingCard.student_id}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all font-mono">
                    {window.location.origin}/verify/{viewingCard.student_id}
                  </a>
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button type="button" onClick={() => setViewingCard(null)} className="px-5 py-2 text-xs uppercase font-bold tracking-wider bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition cursor-pointer">
                {lang === 'fr' ? 'Fermer' : 'Close'}
              </button>
            </div>
          </motion.div>
        </div>)}

    </>);
};
