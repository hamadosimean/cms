import React from 'react';
import { motion } from 'motion/react';
import { User as UserIcon, X } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { useAppHandlers } from '../../hooks/useAppHandlers';
export const CardEditModal = () => {
    const store = useAppStore();
    const handlers = useAppHandlers();
    const { lang, user, adminUsers, adminApplications, adminStudents, adminTeachers, adminIdCards, classesList, toast, setToast, showClassModal, setShowClassModal, editingClassId, setEditingClassId, formClassName, setFormClassName, formClassCapacity, setFormClassCapacity, formClassTeachers, setFormClassTeachers, formClassSubjects, setFormClassSubjects, newSubjectInput, setNewSubjectInput, assignTeacherId, setAssignTeacherId, assignTopic, setAssignTopic, showStudentModal, setShowStudentModal, editingStudentId, setEditingStudentId, formStudentFirst, setFormStudentFirst, formStudentLast, setFormStudentLast, formStudentEmail, setFormStudentEmail, formStudentClass, setFormStudentClass, formStudentSchool, setFormStudentSchool, formStudentGrade, setFormStudentGrade, formStudentLang, setFormStudentLang, showTeacherModal, setShowTeacherModal, editingTeacherId, setEditingTeacherId, formTeacherFirst, setFormTeacherFirst, formTeacherLast, setFormTeacherLast, formTeacherEmail, setFormTeacherEmail, formTeacherQual, setFormTeacherQual, formTeacherExp, setFormTeacherExp, formTeacherNotes, setFormTeacherNotes, formTeacherClasses, setFormTeacherClasses, formTeacherCourses, setFormTeacherCourses, showAdminModal, setShowAdminModal, formAdminFirst, setFormAdminFirst, formAdminLast, setFormAdminLast, formAdminEmail, setFormAdminEmail, formAdminPassword, setFormAdminPassword, formAdminLang, setFormAdminLang, showCardModal, setShowCardModal, editingCard, setEditingCard, formCardFirst, setFormCardFirst, formCardLast, setFormCardLast, formCardClass, setFormCardClass, formCardPhoto, setFormCardPhoto, formCardStatus, setFormCardStatus, formCardValidUntil, setFormCardValidUntil, viewingCard, setViewingCard, selectedStudentAiProfile, setSelectedStudentAiProfile, selectedTeacherAiProfile, setSelectedTeacherAiProfile, loadingAiAnalysis, setLoadingAiAnalysis, showPrintModal, setShowPrintModal, showCommandPalette, setShowCommandPalette, commandPaletteQuery, setCommandPaletteQuery } = store;
    // We spread the handlers so they are available in the scope
    const { handleSaveClass, handleDeleteClass, toggleFormClass, handleRemoveTeacherAssignmentFromClass, toggleFormCourse, handleSaveStudent, handleDeleteStudentClick, handleAnalyzeStudent, handleAdminSaveTeacher, handleDeleteTeacherClick, handleAnalyzeTeacher, handleAdminSaveAdmin, handleAdminDeleteAdmin, handleSaveEditCard, handleCardPhotoUpload, handleBatchPdfDownload, getFilteredCommandPaletteItems, displayStudents } = handlers;
    return (<>
      {showCardModal && editingCard && (<div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-left">
            <div className="px-6 py-4 bg-white text-slate-800 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800">
                {lang === 'fr' ? 'Modifier la Carte d\'Étudiant' : 'Edit Student ID Card'}
              </h3>
              <button onClick={() => { setShowCardModal(false); setEditingCard(null); }} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition cursor-pointer">
                <X className="w-5 h-5"/>
              </button>
            </div>

            <form onSubmit={handleSaveEditCard} className="p-6 space-y-4">
              
              {/* Biographical Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    {lang === 'fr' ? 'Prénom' : 'First Name'} <span className="text-rose-500">*</span>
                  </label>
                  <input type="text" required value={formCardFirst} onChange={e => setFormCardFirst(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"/>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    {lang === 'fr' ? 'Nom' : 'Last Name'} <span className="text-rose-500">*</span>
                  </label>
                  <input type="text" required value={formCardLast} onChange={e => setFormCardLast(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"/>
                </div>
              </div>

              {/* Class/Grade Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  {lang === 'fr' ? 'Classe affectée' : 'Assigned Class/Grade'} <span className="text-rose-500">*</span>
                </label>
                <select value={formCardClass} onChange={e => setFormCardClass(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition bg-white">
                  {classesList.length > 0 ? (classesList.map(c => (<option key={c.id} value={c.name}>{c.name}</option>))) : (<>
                      <option value="Grade 10-A">Grade 10-A</option>
                      <option value="Grade 10-B">Grade 10-B</option>
                      <option value="Grade 11-A">Grade 11-A</option>
                      <option value="Grade 11-B">Grade 11-B</option>
                      <option value="Grade 12-A">Grade 12-A</option>
                    </>)}
                </select>
              </div>

              {/* Card Status */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  {lang === 'fr' ? 'Statut de la carte' : 'Card Status'}
                </label>
                <select value={formCardStatus} onChange={e => setFormCardStatus(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition bg-white font-semibold">
                  <option value="pending" className="text-amber-600">Pending / Awaiting Approval</option>
                  <option value="generated" className="text-emerald-600">Generated / Active</option>
                </select>
              </div>

              {/* Card Validity Date */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  {lang === 'fr' ? 'Date de validité' : 'Card Validity Expiry Date'}
                </label>
                <input type="date" value={formCardValidUntil} onChange={e => setFormCardValidUntil(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition bg-white"/>
              </div>

              {/* Card Photo Uploader & Preview */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-500 uppercase">
                  {lang === 'fr' ? 'Photo d\'identité de l\'étudiant' : 'Student Profile Image'}
                </label>
                
                <div className="flex items-center gap-4">
                  <div className="w-16 h-18 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                    {formCardPhoto ? (<img src={formCardPhoto} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer"/>) : (<UserIcon className="w-6 h-6 text-slate-400"/>)}
                  </div>

                  <div className="flex-1 space-y-1">
                    <input type="file" id="card-photo-file" accept="image/*" onChange={handleCardPhotoUpload} className="hidden"/>
                    <label htmlFor="card-photo-file" className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer inline-block border border-slate-300">
                      {lang === 'fr' ? 'Choisir un fichier' : 'Upload New Photo'}
                    </label>
                    <p className="text-[10px] text-slate-400">PNG/JPG. encoded instantly.</p>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2 shrink-0">
                <button type="button" onClick={() => { setShowCardModal(false); setEditingCard(null); }} className="px-4 py-2 text-xs uppercase font-bold text-slate-500 hover:bg-slate-100 rounded-lg cursor-pointer">
                  {lang === 'fr' ? 'Annuler' : 'Cancel'}
                </button>
                <button type="submit" className="px-5 py-2 text-xs uppercase font-bold tracking-wider bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition cursor-pointer">
                  {lang === 'fr' ? 'Enregistrer' : 'Save Changes'}
                </button>
              </div>

            </form>
          </motion.div>
        </div>)}

    </>);
};
