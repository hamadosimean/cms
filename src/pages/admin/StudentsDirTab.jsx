import React from "react";
import {
  GraduationCap,
  Printer,
  Download,
  Plus,
  Search,
  X,
  Filter,
  ChevronDown,
  Sliders,
  CheckSquare,
  Trash2,
  Edit3,
  Sparkles,
  User as UserIcon,
} from "lucide-react";
export default function StudentsDirTab({
  lang,
  adminIdCards,
  loadingAiAnalysis,
  selectedStudentIds,
  setSelectedStudentIds,
  studentSearchQuery,
  setStudentSearchQuery,
  studentClassFilter,
  setStudentClassFilter,
  studentSortField,
  studentSortOrder,
  handleStudentSortChange,
  displayStudents,
  adminStudents,
  setShowPrintModal,
  setPrintScope,
  handleExportCSV,
  resetStudentForm,
  setShowStudentModal,
  handleBulkApprove,
  handleBulkExport,
  handleBulkDelete,
  setViewingCard,
  handleAnalyzeStudent,
  handleEditStudentClick,
  handleDeleteStudentClick,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="px-6 py-4 bg-white text-slate-800 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800">
            {lang === "fr" ? "Annuaire des Étudiants" : "Student Directory"}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setPrintScope("students");
              setShowPrintModal(true);
            }}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition flex items-center gap-1.5 min-h-11 cursor-pointer shadow-sm"
            id="print-preview-btn"
            title={
              lang === "fr"
                ? "Aperçu avant impression de la liste filtrée"
                : "Print preview of currently filtered student records"
            }
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>{lang === "fr" ? "Aperçu Impression" : "Print Preview"}</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 transition flex items-center gap-1.5 min-h-11 cursor-pointer shadow-sm"
            id="export-csv-btn"
            title={
              lang === "fr"
                ? "Exporter la liste filtrée au format CSV"
                : "Export currently filtered student records to CSV"
            }
          >
            <Download className="w-4 h-4 text-slate-500 animate-pulse-subtle" />
            <span>{lang === "fr" ? "Exporter CSV" : "Export CSV"}</span>
          </button>
          <button
            onClick={() => {
              resetStudentForm();
              setShowStudentModal(true);
            }}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white transition flex items-center gap-1 min-h-11 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>
              {lang === "fr" ? "Ajouter un Étudiant" : "Add Student Record"}
            </span>
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
            value={studentSearchQuery}
            onChange={(e) => setStudentSearchQuery(e.target.value)}
            placeholder={
              lang === "fr"
                ? "Rechercher par nom, e-mail, classe ou ID..."
                : "Search by name, email, class, or ID..."
            }
            className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-250 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"
          />
          {studentSearchQuery && (
            <button
              onClick={() => setStudentSearchQuery("")}
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
            value={studentClassFilter}
            onChange={(e) => setStudentClassFilter(e.target.value)}
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
            value={`${studentSortField}-${studentSortOrder}`}
            onChange={(e) => handleStudentSortChange(e.target.value)}
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
            <option value="grade-desc">
              {lang === "fr" ? "Note (Élevée)" : "Grade (Highest)"}
            </option>
            <option value="grade-asc">
              {lang === "fr" ? "Note (Basse)" : "Grade (Lowest)"}
            </option>
          </select>
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
            <ChevronDown className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {displayStudents.length > 0 && (
        <div className="mx-6 mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-700 animate-fadeIn">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={
                selectedStudentIds.length === displayStudents.length &&
                displayStudents.length > 0
              }
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedStudentIds(displayStudents.map((s) => s.id));
                } else {
                  setSelectedStudentIds([]);
                }
              }}
              className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
              id="bulk-select-all"
            />
            <label
              htmlFor="bulk-select-all"
              className="font-semibold text-slate-700 cursor-pointer select-none"
            >
              {lang === "fr"
                ? `Sélectionner tout (${selectedStudentIds.length} / ${displayStudents.length} sélectionnés)`
                : `Select All (${selectedStudentIds.length} / ${displayStudents.length} selected)`}
            </label>
          </div>

          {selectedStudentIds.length > 0 && (
            <div className="flex items-center gap-2 animate-fadeIn">
              <span className="font-semibold text-slate-50 uppercase tracking-wider text-[10px] hidden md:inline mr-1">
                {lang === "fr" ? "Actions groupées :" : "Bulk Actions:"}
              </span>

              <button
                onClick={handleBulkApprove}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold uppercase text-[10px] tracking-wider shadow-sm hover:shadow transition flex items-center gap-1 min-h-8 cursor-pointer"
                title={
                  lang === "fr"
                    ? "Approuver l'admission et générer/approuver la carte d'identité pour tous les étudiants sélectionnés"
                    : "Approve admission and generate/approve ID card for all selected students"
                }
              >
                <CheckSquare className="w-3.5 h-3.5" />
                <span>{lang === "fr" ? "Approuver" : "Approve"}</span>
              </button>

              <button
                onClick={handleBulkExport}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold uppercase text-[10px] tracking-wider shadow-sm hover:shadow transition flex items-center gap-1 min-h-8 cursor-pointer"
                title={
                  lang === "fr"
                    ? "Exporter les données des étudiants sélectionnés au format CSV"
                    : "Export selected student data to CSV"
                }
              >
                <Download className="w-3.5 h-3.5" />
                <span>{lang === "fr" ? "Exporter" : "Export"}</span>
              </button>

              <button
                onClick={handleBulkDelete}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold uppercase text-[10px] tracking-wider shadow-sm hover:shadow transition flex items-center gap-1 min-h-8 cursor-pointer"
                title={
                  lang === "fr"
                    ? "Supprimer définitivement les fiches des étudiants sélectionnés"
                    : "Permanently delete selected student records"
                }
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{lang === "fr" ? "Supprimer" : "Delete"}</span>
              </button>
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        {adminStudents.length === 0 ? (
          <p className="text-slate-400 text-xs italic text-center py-6">
            {lang === "fr"
              ? "Aucune fiche d'étudiant trouvée."
              : 'No student records found. Click "Add Student Record" to begin onboarding.'}
          </p>
        ) : displayStudents.length === 0 ? (
          <p className="text-slate-400 text-xs italic text-center py-6">
            {lang === "fr"
              ? "Aucun résultat ne correspond à votre recherche."
              : "No student records matched your search query or filters."}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayStudents.map((student) => {
              const gradeNum = Number(student.last_general_grade) || 0;
              const gradeColor =
                gradeNum >= 16
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : gradeNum >= 12
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : gradeNum >= 10
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-rose-50 text-rose-700 border-rose-200";
              return (
                <div
                  key={student.id}
                  className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between gap-4 text-left"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedStudentIds.includes(student.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedStudentIds((prev) => [
                                ...prev,
                                student.id,
                              ]);
                            } else {
                              setSelectedStudentIds((prev) =>
                                prev.filter((id) => id !== student.id),
                              );
                            }
                          }}
                          className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
                          title={
                            lang === "fr"
                              ? "Sélectionner pour actions groupées"
                              : "Select for bulk actions"
                          }
                        />
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-extrabold flex items-center justify-center text-sm shadow-inner shrink-0">
                          {student.first_name?.[0]?.toUpperCase() || ""}
                          {student.last_name?.[0]?.toUpperCase() || ""}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-800">
                            {student.first_name} {student.last_name}
                          </h4>
                          <p className="text-xs text-slate-400 font-mono">
                            {student.email}
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-slate-200 text-slate-700 font-mono text-[10px] rounded uppercase">
                        {student.preferred_language}
                      </span>
                    </div>

                    <div className="text-xs space-y-1.5 pt-1">
                      <p className="text-slate-600">
                        <strong className="text-slate-800">
                          {lang === "fr" ? "Classe :" : "Assigned Class:"}
                        </strong>{" "}
                        <span className="px-1.5 py-0.5 bg-blue-50 text-blue-800 font-semibold border border-blue-100 rounded text-[10px]">
                          {student.target_class || "Not Allocated"}
                        </span>
                      </p>
                      <p className="text-slate-600">
                        <strong className="text-slate-800">
                          {lang === "fr"
                            ? "École Précédente :"
                            : "Previous School:"}
                        </strong>{" "}
                        {student.last_school_name || "Saint Jude Academy"}
                      </p>
                      <p className="text-slate-600">
                        <strong className="text-slate-800">
                          {lang === "fr"
                            ? "Note / Moyenne :"
                            : "Previous GPA/Grade:"}
                        </strong>{" "}
                        <span
                          className={`px-1.5 py-0.5 border rounded text-[10px] font-bold ${gradeColor}`}
                        >
                          {student.last_general_grade ?? 0} / 20
                        </span>
                      </p>
                      <p className="text-slate-400 font-mono text-[9px] uppercase tracking-wider">
                        ID: {student.id}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 justify-end">
                    {adminIdCards.find((c) => c.student_id === student.id) && (
                      <button
                        onClick={() =>
                          setViewingCard(
                            adminIdCards.find(
                              (c) => c.student_id === student.id,
                            ),
                          )
                        }
                        className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase border border-indigo-200 text-indigo-600 hover:bg-indigo-50/50 transition inline-flex items-center gap-1 cursor-pointer"
                      >
                        <UserIcon className="w-3.5 h-3.5" />
                        <span>
                          {lang === "fr" ? "Voir Carte" : "View ID Card"}
                        </span>
                      </button>
                    )}
                    <button
                      onClick={() => handleAnalyzeStudent(student)}
                      disabled={loadingAiAnalysis === student.id}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase bg-blue-50 text-blue-600 hover:bg-blue-100/70 border border-blue-200 transition inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
                      <span>
                        {loadingAiAnalysis === student.id
                          ? lang === "fr"
                            ? "Analyse..."
                            : "Analyzing..."
                          : lang === "fr"
                            ? "Analyse IA"
                            : "AI Profiler"}
                      </span>
                    </button>
                    <button
                      onClick={() => handleEditStudentClick(student)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase border border-slate-200 text-slate-600 hover:bg-slate-100 transition inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{lang === "fr" ? "Modifier" : "Edit"}</span>
                    </button>
                    <button
                      onClick={() => handleDeleteStudentClick(student.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase border border-rose-200 text-rose-600 hover:bg-rose-50 transition inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{lang === "fr" ? "Supprimer" : "Delete"}</span>
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
