import React, { useState } from "react";
import { GraduationCap, Download, AlertTriangle, User as UserIcon, Search, ArrowUpDown, ShieldAlert, Edit3 } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";

export default function TeacherCardsTab({ lang, principalSignature }) {
  const store = useAppStore();
  const { adminTeachers, schoolInfo } = store;

  const handleEditTeacherClick = (teacher) => {
    store.setEditingTeacherId(teacher.id);
    store.setFormTeacherFirst(teacher.first_name);
    store.setFormTeacherLast(teacher.last_name);
    store.setFormTeacherEmail(teacher.email);
    store.setFormTeacherQual(teacher.qualifications || "");
    store.setFormTeacherExp(teacher.experience_years || 0);
    store.setFormTeacherNotes(teacher.curriculum_notes || "");
    store.setFormTeacherClasses(teacher.assigned_classes || []);
    store.setFormTeacherCourses(teacher.assigned_courses || []);
    store.setShowTeacherModal(true);
  };

  // Search & Filter local states
  const [searchQuery, setSearchQuery] = useState("");
  const [expFilter, setExpFilter] = useState("all"); // "all", "junior" (<5 yrs), "senior" (5+ yrs)
  const [sortOrder, setSortOrder] = useState("name-asc"); // "name-asc", "name-desc", "exp-desc", "photo-status"

  // Filtered teachers list
  const filteredTeachers = adminTeachers
    ? adminTeachers.filter((t) => {
        const fullName = `${t.first_name || ""} ${t.last_name || ""}`.toLowerCase();
        const matchesSearch = fullName.includes(searchQuery.toLowerCase());

        let matchesExp = true;
        if (expFilter === "junior") {
          matchesExp = (t.experience_years || 0) < 5;
        } else if (expFilter === "senior") {
          matchesExp = (t.experience_years || 0) >= 5;
        }

        return matchesSearch && matchesExp;
      })
    : [];

  // Sorted teachers list
  const sortedTeachers = [...filteredTeachers].sort((a, b) => {
    if (sortOrder === "name-asc") {
      const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
      const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
      return nameA.localeCompare(nameB);
    }
    if (sortOrder === "name-desc") {
      const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
      const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
      return nameB.localeCompare(nameA);
    }
    if (sortOrder === "exp-desc") {
      return (b.experience_years || 0) - (a.experience_years || 0);
    }
    if (sortOrder === "photo-status") {
      const hasPhotoA = a.profile_photo_url ? 1 : 0;
      const hasPhotoB = b.profile_photo_url ? 1 : 0;
      return hasPhotoB - hasPhotoA; // Photos first
    }
    return 0;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm text-left">
      <div className="px-6 py-4 bg-white text-slate-800 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800">
            {lang === "fr" ? "Annuaire des Cartes d'Enseignants" : "Teacher ID Cards Directory"}
          </h3>
        </div>
      </div>

      {/* Filter Toolbar controls */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Filter by Name */}
        <div className="relative">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            {lang === "fr" ? "Rechercher par nom" : "Filter by Name"}
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "fr" ? "Nom de l'enseignant..." : "Search teacher name..."}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 font-medium bg-white"
            />
          </div>
        </div>

        {/* Filter by Experience Years (acting as Year / Level filter) */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            {lang === "fr" ? "Filtrer par Expérience" : "Filter by Experience"}
          </label>
          <select
            value={expFilter}
            onChange={(e) => setExpFilter(e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 font-medium bg-white"
          >
            <option value="all">{lang === "fr" ? "Toutes les années" : "All Experience Levels"}</option>
            <option value="junior">{lang === "fr" ? "Junior (< 5 ans)" : "Junior (< 5 Years)"}</option>
            <option value="senior">{lang === "fr" ? "Senior (5 ans +)" : "Senior (5+ Years)"}</option>
          </select>
        </div>

        {/* Order By selection */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            {lang === "fr" ? "Trier par" : "Order By"}
          </label>
          <div className="relative">
            <ArrowUpDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full pl-3 pr-9 py-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 font-medium bg-white appearance-none"
            >
              <option value="name-asc">{lang === "fr" ? "Nom (A - Z)" : "Name (A - Z)"}</option>
              <option value="name-desc">{lang === "fr" ? "Nom (Z - A)" : "Name (Z - A)"}</option>
              <option value="exp-desc">{lang === "fr" ? "Expérience (Élevée)" : "Experience (Highest)"}</option>
              <option value="photo-status">{lang === "fr" ? "Statut de Photo" : "Photo Status"}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-6">
        {!principalSignature && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-3 shadow-sm">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 animate-bounce" />
            <div className="space-y-1">
              <p className="font-bold uppercase tracking-wider text-[10px]">
                {lang === "fr" ? "Signature du directeur manquante" : "Principal Signature Missing"}
              </p>
              <p className="leading-relaxed">
                {lang === "fr"
                  ? "Vous devez enregistrer la signature du directeur dans l'onglet 'Aperçu' avant de pouvoir imprimer les cartes."
                  : "You must save a Principal Signature in the 'Institution Overview' tab before you can print official ID cards."}
              </p>
            </div>
          </div>
        )}

        {sortedTeachers.length === 0 ? (
          <p className="text-slate-400 text-xs italic text-center py-8">
            {lang === "fr" ? "Aucune carte d'enseignant trouvée." : "No teacher ID cards found matching filters."}
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedTeachers.map((teacher) => {
              const hasPhoto = !!teacher.profile_photo_url;
              return (
                <div
                  key={teacher.id}
                  className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50 flex flex-col justify-between gap-4 shadow-sm hover:border-slate-300 transition relative overflow-hidden"
                >
                  {/* Status Badge */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full border ${
                        hasPhoto
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {hasPhoto
                        ? lang === "fr"
                          ? "Photo Téléversée"
                          : "Photo Uploaded / Active"
                        : lang === "fr"
                          ? "Photo Manquante"
                          : "Photo Missing"}
                    </span>

                    <span className="text-[10px] text-slate-400 font-mono">
                      Staff ID: {teacher.id.substring(0, 8).toUpperCase()}
                    </span>
                  </div>

                  {/* Core details */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-18 rounded-lg bg-slate-200 border border-slate-300 overflow-hidden shrink-0 shadow-sm flex items-center justify-center">
                      {hasPhoto ? (
                        <img
                          src={teacher.profile_photo_url}
                          alt="Teacher profile"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <UserIcon className="w-6 h-6 text-slate-400" />
                      )}
                    </div>

                    <div className="text-left space-y-1">
                      <h4 className="font-bold text-sm text-slate-800 leading-tight">
                        {teacher.first_name} {teacher.last_name}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {teacher.email}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">
                        {teacher.qualifications || (lang === "fr" ? "Sans Diplôme" : "No qualifications entered")}
                      </p>
                      <p className="text-[10px] text-indigo-600 font-semibold bg-indigo-50 border border-indigo-200/50 rounded-md px-1.5 py-0.5 inline-block">
                        {lang === "fr" ? "Expérience" : "Experience"}:{" "}
                        <span className="font-bold font-mono">{teacher.experience_years || 0} {lang === "fr" ? "ans" : "years"}</span>
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200/60">
                    <button
                      onClick={() => handleEditTeacherClick(teacher)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider transition flex items-center gap-1 min-h-10 cursor-pointer"
                      title="Edit teacher card info"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                      <span className="hidden sm:inline">{lang === "fr" ? "Modifier" : "Edit"}</span>
                    </button>

                    {hasPhoto ? (
                      <a
                        href={`/api/teacher-id-cards/download/${teacher.id}?lang=${lang}`}
                        download={`Teacher_ID_Card_${teacher.last_name}.pdf`}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 min-h-10 cursor-pointer decoration-transparent font-sans"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{lang === "fr" ? "Télécharger PDF" : "Download PDF"}</span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-1 text-amber-600 text-xs font-bold">
                        <ShieldAlert className="w-4 h-4 shrink-0" />
                        <span className="hidden sm:inline">{lang === "fr" ? "Photo requise" : "Photo required"}</span>
                      </div>
                    )}
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
