import React from "react";
import { GraduationCap, Plus, Edit3, Trash2 } from "lucide-react";
export default function ClassesTab({
  lang,
  classesList,
  adminApplications,
  setEditingClassId,
  setFormClassName,
  setFormClassCapacity,
  setFormClassTeachers,
  setFormClassSubjects,
  setAssignTeacherId,
  setAssignTopic,
  setShowClassModal,
  handleRemoveTeacherAssignmentFromClass,
  handleDeleteClass,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="px-6 py-4 bg-white text-slate-800 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800">
            {lang === "fr"
              ? "Gestion des Classes & Affectations"
              : "Classroom Management & Teacher Allocations"}
          </h3>
        </div>
        <button
          onClick={() => {
            setEditingClassId(null);
            setFormClassName("");
            setFormClassCapacity(30);
            setFormClassTeachers([]);
            setFormClassSubjects([]);
            setAssignTeacherId("");
            setAssignTopic("");
            setShowClassModal(true);
          }}
          className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white transition flex items-center gap-1 min-h-11 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{lang === "fr" ? "Ajouter une classe" : "Add Class"}</span>
        </button>
      </div>

      <div className="p-6">
        {classesList.length === 0 ? (
          <p className="text-slate-400 text-xs italic text-center py-6">
            {lang === "fr"
              ? "Aucune classe enregistrée."
              : "No classrooms registered yet."}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classesList.map((cls) => {
              const enrolledCount = adminApplications.filter(
                (a) => a.status === "approved" && a.target_class === cls.name,
              ).length;
              const percent = Math.min(
                Math.round((enrolledCount / cls.capacity) * 100),
                100,
              );
              return (
                <div
                  key={cls.id}
                  className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between gap-5 text-left shadow-sm hover:shadow transition"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-sm text-slate-800">
                          {cls.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono">
                          ID: {cls.id}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 bg-slate-200 text-slate-700 font-mono text-[10px] rounded">
                        {enrolledCount} / {cls.capacity} Enrolled
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden relative">
                        <div
                          style={{ width: `${percent}%` }}
                          className={`h-full rounded-full transition-all duration-300 ${percent > 85 ? "bg-rose-500" : percent > 50 ? "bg-blue-600" : "bg-slate-700"}`}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <p className="text-slate-500 font-bold text-[10px] uppercase tracking-wider">
                        {lang === "fr"
                          ? "Matières de la classe"
                          : "Class Subjects"}
                      </p>
                      {cls.subjects && cls.subjects.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {cls.subjects.map((sub, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-semibold rounded-full border border-blue-100"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic text-xs">
                          {lang === "fr"
                            ? "Aucune matière définie"
                            : "No subjects defined"}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 pt-1">
                      <p className="text-slate-500 font-bold text-[10px] uppercase tracking-wider">
                        {lang === "fr"
                          ? "Enseignants & Matières"
                          : "Teachers & Topics"}
                      </p>
                      {cls.teachers && cls.teachers.length > 0 ? (
                        <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                          {cls.teachers.map((t, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center text-xs bg-white border border-slate-100 p-2 rounded-lg shadow-sm"
                            >
                              <div className="min-w-0 flex-1">
                                <span className="font-semibold text-slate-900 block truncate">
                                  {t.teacher_name}
                                </span>
                                <span className="text-[10px] text-emerald-600 font-medium block truncate">
                                  {t.topic}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveTeacherAssignmentFromClass(
                                    cls.id,
                                    t.teacher_id,
                                    t.topic,
                                  )
                                }
                                title={
                                  lang === "fr"
                                    ? "Retirer l'affectation"
                                    : "Remove assignment"
                                }
                                className="p-1 hover:bg-rose-50 rounded text-rose-500 hover:text-rose-700 transition cursor-pointer ml-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic text-xs">
                          {lang === "fr"
                            ? "Aucun enseignant affecté"
                            : "No teachers assigned yet"}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 justify-end shrink-0">
                    <button
                      onClick={() => {
                        setEditingClassId(cls.id);
                        setFormClassName(cls.name);
                        setFormClassCapacity(cls.capacity);
                        setFormClassTeachers(cls.teachers || []);
                        setFormClassSubjects(cls.subjects || []);
                        setAssignTeacherId("");
                        setAssignTopic("");
                        setShowClassModal(true);
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase border border-slate-200 text-slate-600 hover:bg-slate-100 transition flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>{lang === "fr" ? "Modifier" : "Edit"}</span>
                    </button>
                    <button
                      onClick={() => handleDeleteClass(cls.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase border border-rose-200 text-rose-600 hover:bg-rose-50 transition flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>{lang === "fr" ? "Supprimer" : "Remove"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
