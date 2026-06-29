import React from "react";
import { BookOpen } from "lucide-react";
export default function TeacherAllocationsTab({
  lang,
  classesList,
  user,
  teacherProfile,
}) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-white text-slate-800 border-b border-slate-200 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800">
            Assigned Classes & Schedules
          </h3>
        </div>

        <div className="p-6 space-y-6">
          {/* Classes */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {lang === "fr"
                ? "Classes & Matières Assignées"
                : "Assigned Classes & Subjects"}
            </h4>
            {(() => {
              const teacherAllocatedClasses = classesList.filter(
                (c) =>
                  c.teachers &&
                  c.teachers.some((t) => t.teacher_id === user?.id),
              );
              if (teacherAllocatedClasses.length > 0) {
                return (
                  <div className="space-y-3">
                    {teacherAllocatedClasses.map((cls) => {
                      const mySubjects = (cls.teachers || [])
                        .filter((t) => t.teacher_id === user?.id)
                        .map((t) => t.topic);
                      return (
                        <div
                          key={cls.id}
                          className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-800 text-sm">
                              {cls.name}
                            </span>
                            <span className="text-emerald-600 font-bold uppercase text-[9px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                              {lang === "fr" ? "AFFECTÉ" : "ALLOCATED"}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                              {lang === "fr"
                                ? "Matières enseignées :"
                                : "Subjects Taught:"}
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {mySubjects.map((sub, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 bg-blue-50 border border-blue-100 text-blue-700 font-semibold rounded text-[10px]"
                                >
                                  {sub}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              }
              return (
                <p className="text-slate-400 text-xs italic">
                  {lang === "fr"
                    ? "Aucune classe ne vous est actuellement affectée. L'administration peut assigner des horaires de manière dynamique."
                    : "No class sections currently assigned. Administration can assign schedules dynamically."}
                </p>
              );
            })()}
          </div>

          {/* Course Curriculums */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Course Syllabus Load
            </h4>
            {teacherProfile && teacherProfile.assigned_courses?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {teacherProfile.assigned_courses.map((crs) => (
                  <span
                    key={crs}
                    className="px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold rounded-lg uppercase tracking-wider"
                  >
                    {crs}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-xs italic">
                No courses allocated currently.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
