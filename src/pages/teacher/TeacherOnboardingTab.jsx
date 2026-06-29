import React from 'react';
import { Users } from 'lucide-react';
export default function TeacherOnboardingTab({ lang, getTranslation, handleTeacherOnboardingSubmit, teacherQualifications, setTeacherQualifications, teacherExperience, setTeacherExperience, teacherCurriculumNotes, setTeacherCurriculumNotes }) {
    return (<div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-white text-slate-800 border-b border-slate-200 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600"/>
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800">{getTranslation('onboardingStepTitle', lang)}</h3>
        </div>

        <form onSubmit={handleTeacherOnboardingSubmit} className="p-6 sm:p-8 space-y-6">
          
          {/* Qualifications */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
              {getTranslation('teacherQualifications', lang)}
            </label>
            <input type="text" required value={teacherQualifications} onChange={e => setTeacherQualifications(e.target.value)} placeholder="e.g. Master of Arts in Literature & Philosophy" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"/>
          </div>

          {/* Years Exp */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
              {getTranslation('experienceYears', lang)}
            </label>
            <input type="number" required min={0} max={50} value={teacherExperience} onChange={e => setTeacherExperience(Number(e.target.value))} className="w-full max-w-xs px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition font-mono"/>
          </div>

          {/* Curriculum Tracking notes */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
              {getTranslation('curriculumNotes', lang)}
            </label>
            <textarea required value={teacherCurriculumNotes} onChange={e => setTeacherCurriculumNotes(e.target.value)} placeholder="Indicate syllabus parameters, syllabus tracking, courses details..." className="w-full p-3 rounded-lg border border-slate-200 text-sm min-h-32 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"/>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button type="submit" className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider transition shadow-md cursor-pointer">
              {getTranslation('saveTeacher', lang)}
            </button>
          </div>

        </form>
      </div>
    </div>);
}
