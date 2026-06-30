import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { useAppHandlers } from '../../hooks/useAppHandlers';
export const ClassModal = () => {
    const store = useAppStore();
    const handlers = useAppHandlers();
    const { lang, user, adminUsers, adminApplications, adminStudents, adminTeachers, adminIdCards, classesList, toast, setToast, showClassModal, setShowClassModal, editingClassId, setEditingClassId, formClassName, setFormClassName, formClassCapacity, setFormClassCapacity, formClassTeachers, setFormClassTeachers, formClassSubjects, setFormClassSubjects, newSubjectInput, setNewSubjectInput, assignTeacherId, setAssignTeacherId, assignTopic, setAssignTopic, assignDayOfWeek, setAssignDayOfWeek, assignTimeSlot, setAssignTimeSlot, showStudentModal, setShowStudentModal, editingStudentId, setEditingStudentId, formStudentFirst, setFormStudentFirst, formStudentLast, setFormStudentLast, formStudentEmail, setFormStudentEmail, formStudentClass, setFormStudentClass, formStudentSchool, setFormStudentSchool, formStudentGrade, setFormStudentGrade, formStudentLang, setFormStudentLang, showTeacherModal, setShowTeacherModal, editingTeacherId, setEditingTeacherId, formTeacherFirst, setFormTeacherFirst, formTeacherLast, setFormTeacherLast, formTeacherEmail, setFormTeacherEmail, formTeacherQual, setFormTeacherQual, formTeacherExp, setFormTeacherExp, formTeacherNotes, setFormTeacherNotes, formTeacherClasses, setFormTeacherClasses, formTeacherCourses, setFormTeacherCourses, showAdminModal, setShowAdminModal, formAdminFirst, setFormAdminFirst, formAdminLast, setFormAdminLast, formAdminEmail, setFormAdminEmail, formAdminPassword, setFormAdminPassword, formAdminLang, setFormAdminLang, showCardModal, setShowCardModal, editingCard, setEditingCard, formCardFirst, setFormCardFirst, formCardLast, setFormCardLast, formCardClass, setFormCardClass, formCardPhoto, setFormCardPhoto, formCardStatus, setFormCardStatus, formCardValidUntil, setFormCardValidUntil, viewingCard, setViewingCard, selectedStudentAiProfile, setSelectedStudentAiProfile, selectedTeacherAiProfile, setSelectedTeacherAiProfile, loadingAiAnalysis, setLoadingAiAnalysis, showPrintModal, setShowPrintModal, showCommandPalette, setShowCommandPalette, commandPaletteQuery, setCommandPaletteQuery } = store;
    // We spread the handlers so they are available in the scope
    const { handleSaveClass, handleDeleteClass, toggleFormClass, handleRemoveTeacherAssignmentFromClass, toggleFormCourse, handleSaveStudent, handleDeleteStudentClick, handleAnalyzeStudent, handleAdminSaveTeacher, handleDeleteTeacherClick, handleAnalyzeTeacher, handleAdminSaveAdmin, handleAdminDeleteAdmin, handleSaveEditCard, handleCardPhotoUpload, handleBatchPdfDownload, getFilteredCommandPaletteItems, displayStudents, showNotification, } = handlers;
    return (<>
      {showClassModal && (<div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-left">
            <div className="px-6 py-4 bg-white text-slate-800 border-b border-slate-200 flex justify-between items-center shrink-0">
              <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800">
                {editingClassId
                ? (lang === 'fr' ? 'Modifier la classe' : 'Edit Class Details')
                : (lang === 'fr' ? 'Créer une classe' : 'Create New Classroom')}
              </h3>
              <button onClick={() => setShowClassModal(false)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition cursor-pointer">
                <X className="w-5 h-5"/>
              </button>
            </div>

            <form onSubmit={handleSaveClass} className="p-6 space-y-4">
              {/* Class Name */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  {lang === 'fr' ? 'Nom de la classe' : 'Class Name'} <span className="text-rose-500">*</span>
                </label>
                <input type="text" required placeholder="e.g. Grade 11-C" value={formClassName} onChange={e => setFormClassName(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"/>
              </div>

              {/* Class Capacity */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  {lang === 'fr' ? 'Capacité maximale' : 'Maximum Capacity'} <span className="text-rose-500">*</span>
                </label>
                <input type="number" required min="1" max="100" value={formClassCapacity} onChange={e => setFormClassCapacity(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"/>
              </div>

              {/* Class Subjects Management */}
              <div className="space-y-2 pt-1 border-t border-slate-100 pt-3">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {lang === 'fr' ? 'Matières de la classe' : 'Class Subjects'}
                </label>
                
                {formClassSubjects.length > 0 ? (<div className="flex flex-wrap gap-1.5 p-2 border border-slate-100 rounded-lg bg-slate-50/50">
                    {formClassSubjects.map((sub, index) => (<span key={index} className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
                        <span>{sub}</span>
                        <button type="button" onClick={() => setFormClassSubjects(prev => prev.filter((_, idx) => idx !== index))} className="p-0.5 hover:bg-blue-100 rounded-full text-blue-600 hover:text-blue-800 transition cursor-pointer">
                          <X className="w-3 h-3"/>
                        </button>
                      </span>))}
                  </div>) : (<p className="text-xs text-slate-400 italic">
                    {lang === 'fr' ? 'Aucune matière ajoutée.' : 'No subjects added to this class yet.'}
                  </p>)}

                <div className="flex gap-2">
                  <input type="text" placeholder={lang === 'fr' ? 'ex: Mathématiques' : 'e.g. Mathematics'} value={newSubjectInput} onChange={e => setNewSubjectInput(e.target.value)} className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600 transition"/>
                  <button type="button" onClick={() => {
                const trimmed = newSubjectInput.trim();
                if (!trimmed)
                    return;
                if (formClassSubjects.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
                    showNotification(lang === 'fr' ? 'Cette matière existe déjà.' : 'This subject is already added.', 'error');
                    return;
                }
                setFormClassSubjects(prev => [...prev, trimmed]);
                setNewSubjectInput('');
            }} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition cursor-pointer">
                    + {lang === 'fr' ? 'Ajouter' : 'Add'}
                  </button>
                </div>
              </div>

              {/* Teachers & Topics Allocation Section */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {lang === 'fr' ? 'Enseignants & Matières' : 'Teachers & Topics Allocations'}
                </label>
                
                {/* Current allocated assignments */}
                {formClassTeachers.length > 0 ? (<div className="space-y-2 max-h-[160px] overflow-y-auto border border-slate-100 p-2.5 rounded-xl bg-slate-50/50">
                    {formClassTeachers.map((item, index) => {
                    const teacher = adminTeachers.find(t => t.id === item.teacher_id);
                    const name = teacher ? `${teacher.first_name} ${teacher.last_name}` : item.teacher_id;
                    return (<div key={index} className="flex justify-between items-center text-xs bg-white border border-slate-200 p-2 rounded-lg shadow-xs">
                          <div className="min-w-0 flex-1">
                            <span className="font-semibold text-slate-800 block truncate">{name}</span>
                            <div className="flex gap-2 items-center">
                              <span className="text-[10px] text-emerald-600 block font-medium truncate">{item.topic}</span>
                              {(item.day_of_week || item.time_slot) && (
                                <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-sm">
                                  {item.day_of_week} {item.time_slot ? `(${item.time_slot})` : ''}
                                </span>
                              )}
                            </div>
                          </div>
                          <button type="button" onClick={() => {
                            setFormClassTeachers(prev => prev.filter((_, idx) => idx !== index));
                        }} className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition cursor-pointer">
                            <X className="w-4 h-4"/>
                          </button>
                        </div>);
                })}
                  </div>) : (<p className="text-xs text-slate-400 italic bg-slate-50 p-3 border border-dashed border-slate-200 rounded-lg text-center">
                    {lang === 'fr' ? 'Aucun enseignant affecté pour le moment.' : 'No teachers allocated to this classroom yet.'}
                  </p>)}

                {/* Inline Adder Form */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {lang === 'fr' ? 'Affecter un Enseignant à une Matière' : 'Assign Teacher to Class Subject'}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <select value={assignTeacherId} onChange={e => {
                setAssignTeacherId(e.target.value);
                setAssignTopic('');
            }} className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600 transition bg-white cursor-pointer">
                        <option value="">{lang === 'fr' ? '-- Choisir Enseignant --' : '-- Select Teacher --'}</option>
                        {adminTeachers.map(t => (<option key={t.id} value={t.id}>{t.first_name} {t.last_name}</option>))}
                      </select>
                    </div>
                    <div>
                      <select value={assignTopic} onChange={e => setAssignTopic(e.target.value)} className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600 transition bg-white cursor-pointer">
                        <option value="">{lang === 'fr' ? '-- Choisir Matière --' : '-- Select Subject --'}</option>
                        {formClassSubjects.map((sub, index) => (<option key={index} value={sub}>{sub}</option>))}
                      </select>
                    </div>
                    <div>
                      <select value={assignDayOfWeek} onChange={e => setAssignDayOfWeek(e.target.value)} className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600 transition bg-white cursor-pointer">
                        <option value="">{lang === 'fr' ? '-- Jour --' : '-- Day --'}</option>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                          <option key={day} value={day}>
                            {lang === 'fr' ? (day === 'Monday' ? 'Lundi' : day === 'Tuesday' ? 'Mardi' : day === 'Wednesday' ? 'Mercredi' : day === 'Thursday' ? 'Jeudi' : day === 'Friday' ? 'Vendredi' : 'Samedi') : day}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <input type="text" placeholder={lang === 'fr' ? 'Ex: 08h-12h' : 'Ex: 08h-12h'} value={assignTimeSlot} onChange={e => setAssignTimeSlot(e.target.value)} className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-600 transition bg-white"/>
                    </div>
                  </div>

                  {assignTeacherId && (<div className="text-[10px] bg-blue-50/50 text-blue-800 p-2 rounded-lg border border-blue-100/50">
                      <strong>
                        {lang === 'fr' ? 'Matières qualifiées de cet enseignant :' : "Teacher's Qualified Courses:"}
                      </strong>{' '}
                      {(() => {
                    const t = adminTeachers.find(teacher => teacher.id === assignTeacherId);
                    return t && t.assigned_courses?.length > 0
                        ? t.assigned_courses.join(', ')
                        : (lang === 'fr' ? 'Aucune matière assignée dans le registre' : 'No courses assigned in school registry');
                })()}
                    </div>)}

                  <button type="button" onClick={() => {
                if (!assignTeacherId) {
                    showNotification(lang === 'fr' ? 'Veuillez sélectionner un enseignant.' : 'Please select a teacher first.', 'error');
                    return;
                }
                if (!assignTopic) {
                    showNotification(lang === 'fr' ? 'Veuillez sélectionner une matière.' : 'Please select a class subject.', 'error');
                    return;
                }
                const teacherObj = adminTeachers.find(t => t.id === assignTeacherId);
                if (!teacherObj)
                    return;
                // Check if selected course is actually in teacher's assigned_courses
                const isQualified = (teacherObj.assigned_courses || []).some((crs) => crs.toLowerCase() === assignTopic.toLowerCase());
                if (!isQualified) {
                    const coursesStr = teacherObj.assigned_courses?.join(', ') || 'None';
                    const errMsg = lang === 'fr'
                        ? `${teacherObj.first_name} ${teacherObj.last_name} n'est pas qualifié(e) pour enseigner "${assignTopic}". (Matières qualifiées : ${coursesStr})`
                        : `${teacherObj.first_name} ${teacherObj.last_name} is not certified/assigned to teach "${assignTopic}". (Qualified for: ${coursesStr})`;
                    showNotification(errMsg, 'error');
                    return;
                }
                // Check duplicate assignment
                if (formClassTeachers.some(item => item.teacher_id === assignTeacherId && item.topic.toLowerCase() === assignTopic.toLowerCase() && item.day_of_week === assignDayOfWeek && item.time_slot === assignTimeSlot)) {
                    showNotification(lang === 'fr' ? 'Cette affectation exacte existe déjà.' : 'This exact assignment already exists.', 'error');
                    return;
                }
                setFormClassTeachers(prev => [...prev, { teacher_id: assignTeacherId, topic: assignTopic, day_of_week: assignDayOfWeek, time_slot: assignTimeSlot }]);
                showNotification(lang === 'fr' ? 'Affectation ajoutée.' : 'Assignment added successfully.', 'success');
                setAssignTeacherId('');
                setAssignTopic('');
                setAssignDayOfWeek('');
                setAssignTimeSlot('');
            }} className="w-full py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-bold text-xs uppercase tracking-wider transition cursor-pointer">
                    + {lang === 'fr' ? 'Affecter l\'enseignant' : 'Assign Teacher to Topic'}
                  </button>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowClassModal(false)} className="px-4 py-2 text-xs font-bold uppercase border border-slate-200 text-slate-500 rounded-lg hover:bg-slate-50 transition cursor-pointer">
                  {lang === 'fr' ? 'Annuler' : 'Cancel'}
                </button>
                <button type="submit" className="px-4 py-2 text-xs font-bold uppercase bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow cursor-pointer">
                  {lang === 'fr' ? 'Enregistrer' : 'Save'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>)}

    </>);
};
