import React from "react";
import {
  Users,
  Plus,
  Search,
  X,
  Filter,
  ChevronDown,
  Sliders,
  Sparkles,
  Download,
  Edit3,
  Trash2,
  Printer,
} from "lucide-react";
export default function TeachersTab({
  lang,
  getTranslation,
  teacherSearchQuery,
  setTeacherSearchQuery,
  teacherClassFilter,
  setTeacherClassFilter,
  teacherSortField,
  teacherSortOrder,
  handleTeacherSortChange,
  displayTeachers,
  adminTeachers,
  handleExportTeachersCSV,
  setPrintScope,
  setShowPrintModal,
  resetTeacherForm,
  setShowTeacherModal,
  loadingAiAnalysis,
  handleAnalyzeTeacher,
  handleEditTeacherClick,
  handleDeleteTeacherClick,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="px-6 py-4 bg-white text-slate-800 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800">
            {getTranslation("teacherManagementTitle", lang)}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setPrintScope("teachers");
              setShowPrintModal(true);
            }}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition flex items-center gap-1.5 min-h-11 cursor-pointer shadow-sm"
            title={
              lang === "fr"
                ? "Aperçu avant impression de la liste"
                : "Print preview of filtered teacher records"
            }
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">{lang === "fr" ? "Aperçu Impression" : "Print Preview"}</span>
          </button>
          <button
            onClick={handleExportTeachersCSV}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition flex items-center gap-1.5 min-h-11 cursor-pointer shadow-sm"
            title={
              lang === "fr"
                ? "Exporter les enseignants au format CSV"
                : "Export teachers to CSV"
            }
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">{lang === "fr" ? "Exporter CSV" : "Export CSV"}</span>
          </button>
          <button
            onClick={() => {
              resetTeacherForm();
              setShowTeacherModal(true);
            }}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white transition flex items-center gap-1 min-h-11 cursor-pointer"
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">{getTranslation("addTeacherBtn", lang)}</span>
          </button>
        </div>
      </div>

      {/* Search & Filtering Toolbar */}
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={teacherSearchQuery}
            onChange={(e) => setTeacherSearchQuery(e.target.value)}
            placeholder={
              lang === "fr"
                ? "Rechercher par nom, e-mail, matière ou classe..."
                : "Search by name, email, subject, or class..."
            }
            className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-250 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"
          />
          {teacherSearchQuery && (
            <button
              onClick={() => setTeacherSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Filter className="w-3.5 h-3.5" />
          </span>
          <select
            value={teacherClassFilter}
            onChange={(e) => setTeacherClassFilter(e.target.value)}
            className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-250 bg-white text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition appearance-none cursor-pointer"
          >
            <option value="All">
              {lang === "fr" ? "Toutes les classes" : "All Classes"}
            </option>
            <option value="Grade 10-A">Grade 10-A</option>
            <option value="Grade 10-B">Grade 10-B</option>
            <option value="Grade 11-A">Grade 11-A</option>
            <option value="Grade 11-B">Grade 11-B</option>
            <option value="Grade 12-A">Grade 12-A</option>
            <option value="Grade 12-B">Grade 12-B</option>
          </select>
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
            <ChevronDown className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Sliders className="w-3.5 h-3.5" />
          </span>
          <select
            value={`${teacherSortField}-${teacherSortOrder}`}
            onChange={(e) => handleTeacherSortChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-250 bg-white text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition appearance-none cursor-pointer"
          >
            <option value="name-asc">
              {lang === "fr" ? "Nom (A-Z)" : "Name (A-Z)"}
            </option>
            <option value="name-desc">
              {lang === "fr" ? "Nom (Z-A)" : "Name (Z-A)"}
            </option>
            <option value="date-desc">
              {lang === "fr" ? "Admission (Récent)" : "Admission (Newest)"}
            </option>
            <option value="date-asc">
              {lang === "fr" ? "Admission (Ancien)" : "Admission (Oldest)"}
            </option>
            <option value="experience-desc">
              {lang === "fr" ? "Expérience (Élevée)" : "Experience (Highest)"}
            </option>
            <option value="experience-asc">
              {lang === "fr" ? "Expérience (Basse)" : "Experience (Lowest)"}
            </option>
          </select>
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
            <ChevronDown className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      <div className="p-6">
        {adminTeachers.length === 0 ? (
          <p className="text-slate-400 text-xs italic text-center py-6">
            {getTranslation("noTeachersMessage", lang)}
          </p>
        ) : displayTeachers.length === 0 ? (
          <p className="text-slate-400 text-xs italic text-center py-6">
            {lang === "fr"
              ? "Aucun enseignant ne correspond à votre recherche."
              : "No teachers matched your search query or filters."}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayTeachers.map((teach) => (
              <div
                key={teach.id}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between gap-4 text-left"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">
                        {teach.first_name} {teach.last_name}
                      </h4>
                      <p className="text-xs text-slate-400 font-mono">
                        {teach.email}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 bg-slate-200 text-slate-700 font-mono text-[10px] rounded">
                      {teach.experience_years} yrs exp
                    </span>
                  </div>

                  <div className="text-xs space-y-1.5">
                    <p className="text-slate-600">
                      <strong className="text-slate-800">Degree:</strong>{" "}
                      {teach.qualifications || "No qualifications declared yet"}
                    </p>
                    <p className="text-slate-600 line-clamp-2">
                      <strong className="text-slate-800">
                        Syllabus Tracker:
                      </strong>{" "}
                      {teach.curriculum_notes || "No curriculum notes added"}
                    </p>
                  </div>

                  {/* Assignments tags */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <div className="flex flex-wrap gap-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider self-center mr-1">
                        Classes:
                      </span>
                      {teach.assigned_classes?.length > 0 ? (
                        teach.assigned_classes.map((c) => (
                          <span
                            key={c}
                            className="px-1.5 py-0.5 bg-slate-100 text-slate-800 text-[10px] font-semibold border border-slate-200 rounded"
                          >
                            {c}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] text-slate-400 italic">
                          None allocated
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider self-center mr-1">
                        Courses:
                      </span>
                      {teach.assigned_courses?.length > 0 ? (
                        teach.assigned_courses.map((crs) => (
                          <span
                            key={crs}
                            className="px-1.5 py-0.5 bg-blue-50 text-blue-800 text-[10px] font-bold border border-blue-200 rounded"
                          >
                            {crs}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] text-slate-400 italic">
                          None allocated
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 justify-end">
                  <button
                    onClick={() => handleAnalyzeTeacher(teach)}
                    disabled={loadingAiAnalysis === teach.id}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100/70 transition inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
                    <span>
                      {loadingAiAnalysis === teach.id
                        ? lang === "fr"
                          ? "Analyse..."
                          : "Analyzing..."
                        : lang === "fr"
                          ? "Recommandation IA"
                          : "AI Matching"}
                    </span>
                  </button>
                  <a
                    href={`/api/teacher-id-cards/download/${teach.id}?lang=${lang}`}
                    download={`Teacher_ID_${teach.last_name}_${teach.first_name}.pdf`}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase bg-indigo-600 hover:bg-indigo-700 text-white transition flex items-center gap-1 cursor-pointer min-h-11 decoration-transparent"
                    title="Print Teacher ID Card"
                  >
                    <Download className="w-3.5 h-3.5 inline mr-1" />
                    {lang === "fr" ? "Imprimer Carte" : "Print ID"}
                  </a>
                  <button
                    onClick={() => handleEditTeacherClick(teach)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase border border-slate-200 text-slate-600 hover:bg-slate-100 transition min-h-11 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 inline mr-1" />
                    Edit/Allocate
                  </button>
                  <button
                    onClick={() => handleDeleteTeacherClick(teach.id)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase border border-rose-200 text-rose-600 hover:bg-rose-50 transition min-h-11"
                  >
                    <Trash2 className="w-3.5 h-3.5 inline mr-1" />
                    Deallocate
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
