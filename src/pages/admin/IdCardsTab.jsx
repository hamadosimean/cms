import React, { useState } from "react";
import {
  GraduationCap,
  Download,
  AlertTriangle,
  User as UserIcon,
  Edit3,
  Check,
  Trash2,
  Search,
  ArrowUpDown,
} from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { getTranslation } from "../../translations";

export default function IdCardsTab({
  lang,
  principalSignature,
  getStudentName,
  setActiveSidebarTab,
  adminCardFilterTab,
  setAdminCardFilterTab,
  handleBatchPdfDownload,
  setViewingCard,
  handleOpenEditCard,
  handleApproveIdCard,
  handleDeleteStudentClick,
}) {
  const { adminIdCards, adminApplications } = useAppStore();

  // Local search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("name-asc");

  // Extract unique years from student cards for the filter dropdown
  const uniqueYears = Array.from(
    new Set(
      adminIdCards
        .map((c) => (c.valid_until ? c.valid_until.split("-")[0] : "2027"))
        .filter(Boolean)
    )
  );

  // Filtered pupils list
  const filteredCards = adminIdCards.filter((c) => {
    // Basic Pending vs All tab filter
    if (adminCardFilterTab === "pending" && c.card_status !== "pending") return false;

    // Search query filter
    const name = getStudentName(c.student_id).toLowerCase();
    if (!name.includes(searchQuery.toLowerCase())) return false;

    // Year filter (matching valid_until year)
    if (yearFilter !== "all") {
      const cardYear = c.valid_until ? c.valid_until.split("-")[0] : "2027";
      if (cardYear !== yearFilter) return false;
    }

    return true;
  });

  // Sorted list
  const sortedCards = [...filteredCards].sort((a, b) => {
    if (sortOrder === "name-asc") {
      return getStudentName(a.student_id).localeCompare(getStudentName(b.student_id));
    }
    if (sortOrder === "name-desc") {
      return getStudentName(b.student_id).localeCompare(getStudentName(a.student_id));
    }
    if (sortOrder === "year-desc") {
      const yearA = a.valid_until || "2027-06-30";
      const yearB = b.valid_until || "2027-06-30";
      return yearB.localeCompare(yearA);
    }
    if (sortOrder === "year-asc") {
      const yearA = a.valid_until || "2027-06-30";
      const yearB = b.valid_until || "2027-06-30";
      return yearA.localeCompare(yearB);
    }
    return 0;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm text-left">
      <div className="px-6 py-4 bg-white text-slate-800 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800">
            {lang === "fr" ? "Annuaire des Cartes d'Étudiants" : "Student ID Cards Directory"}
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center self-start sm:self-auto">
          {/* Batch Print Button */}
          <button
            onClick={handleBatchPdfDownload}
            className="px-4 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-indigo-700 transition flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{lang === "fr" ? "Imprimer PDF (Lot)" : "Generate Batch Print PDF"}</span>
          </button>

          {/* Sub-Tabs: Pending vs All */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 w-full sm:w-auto justify-center">
            <button
              onClick={() => setAdminCardFilterTab("pending")}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                adminCardFilterTab === "pending"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {lang === "fr" ? "En attente" : "Pending"} ({adminIdCards.filter((c) => c.card_status === "pending").length})
            </button>
            <button
              onClick={() => setAdminCardFilterTab("all")}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                adminCardFilterTab === "all"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {lang === "fr" ? "Toutes" : "All Cards"} ({adminIdCards.length})
            </button>
          </div>
        </div>
      </div>

      {/* Filter Toolbar controls */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Name Search */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            {lang === "fr" ? "Rechercher un élève" : "Search Pupil"}
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "fr" ? "Nom de l'élève..." : "Search student name..."}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 font-medium bg-white"
            />
          </div>
        </div>

        {/* Filter by Year */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            {lang === "fr" ? "Année d'Expiration" : "Expiration Year"}
          </label>
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 font-medium bg-white"
          >
            <option value="all">{lang === "fr" ? "Toutes les années" : "All Years"}</option>
            {uniqueYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Order */}
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
              <option value="year-desc">{lang === "fr" ? "Expiration (Plus récent)" : "Expiration (Newest)"}</option>
              <option value="year-asc">{lang === "fr" ? "Expiration (Plus ancien)" : "Expiration (Oldest)"}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-6">
        {!principalSignature && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-3 shadow-sm">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold uppercase tracking-wider text-[10px]">
                {lang === "fr" ? "Signature du directeur manquante" : "Principal Signature Missing"}
              </p>
              <p className="leading-relaxed">
                {lang === "fr"
                  ? "Vous devez enregistrer la signature du directeur dans l'onglet 'Aperçu' avant de pouvoir approuver, générer ou activer des cartes."
                  : "You must save a Principal Signature in the 'Institution Overview' tab before you can approve, generate, or activate student ID cards."}
              </p>
            </div>
          </div>
        )}

        {sortedCards.length === 0 ? (
          <p className="text-slate-400 text-xs italic text-center py-8">
            {lang === "fr" ? "Aucune carte d'élève trouvée." : "No pupil cards found matching filters."}
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedCards.map((card) => {
              const studentApp = adminApplications.find((a) => a.student_id === card.student_id);
              const cardClass = studentApp?.target_class || "Grade 10-A";
              return (
                <div
                  key={card.id}
                  className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50 flex flex-col justify-between gap-4 shadow-sm hover:border-slate-300 transition relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full border ${
                        card.card_status === "generated"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {card.card_status === "generated"
                        ? lang === "fr"
                          ? "Générée"
                          : "Generated / Active"
                        : lang === "fr"
                          ? "En attente"
                          : "Pending Approval"}
                    </span>

                    <span className="text-[10px] text-slate-400 font-mono">
                      ID: {card.student_id.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-18 rounded-lg bg-slate-200 border border-slate-300 overflow-hidden shrink-0 shadow-sm flex items-center justify-center">
                        {card.profile_photo_url ? (
                          <img
                            src={card.profile_photo_url}
                            alt="Student profile"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <UserIcon className="w-6 h-6 text-slate-400" />
                        )}
                      </div>

                      <div className="text-left space-y-1">
                        <h4 className="font-bold text-sm text-slate-800 leading-tight">
                          {getStudentName(card.student_id)}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {lang === "fr" ? "Classe" : "Class/Grade"}:{" "}
                          <span className="font-semibold text-slate-700">{cardClass}</span>
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono">Card Ref: {card.id}</p>
                        <p className="text-[10px] text-indigo-600 font-semibold bg-indigo-50 border border-indigo-200/50 rounded-md px-1.5 py-0.5 inline-block mt-1">
                          {lang === "fr" ? "Valide jusqu'au" : "Valid Until"}:{" "}
                          <span className="font-bold font-mono">{card.valid_until || "2027-06-30"}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(
                          window.location.origin + "/verify/" + card.student_id
                        )}`}
                        alt="QR Code"
                        className="w-12 h-12"
                      />
                      <a
                        href={`/verify/${card.student_id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[6px] text-blue-600 hover:underline font-bold font-mono tracking-tighter uppercase"
                      >
                        Verify Link
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-2 pt-3 border-t border-slate-200/60">
                    <button
                      onClick={() => setViewingCard(card)}
                      className="px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider transition flex items-center gap-1 min-h-10 cursor-pointer"
                      title="View ID Card Popup"
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                      <span className="hidden sm:inline">{lang === "fr" ? "Voir Carte" : "View Card"}</span>
                    </button>

                    <button
                      onClick={() => handleOpenEditCard(card)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider transition flex items-center gap-1 min-h-10 cursor-pointer"
                      title="Edit student card info"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                      <span className="hidden sm:inline">{lang === "fr" ? "Modifier" : "Edit"}</span>
                    </button>

                    {card.card_status === "pending" ? (
                      <button
                        onClick={() => handleApproveIdCard(card.id)}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center gap-1 min-h-10 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{getTranslation("approveID", lang)}</span>
                      </button>
                    ) : (
                      card.profile_photo_url && (
                        <a
                          href={`/api/id-cards/download/${card.student_id}?lang=${lang}`}
                          download={`Student_ID_Card_${card.student_id}.pdf`}
                          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center gap-1 min-h-10 cursor-pointer decoration-transparent font-sans"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">{lang === "fr" ? "Télécharger" : "Download"}</span>
                        </a>
                      )
                    )}

                    <button
                      onClick={() => handleDeleteStudentClick(card.student_id)}
                      className="px-3 py-1.5 rounded-lg border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider transition flex items-center gap-1 min-h-10 cursor-pointer"
                      title="Delete card record"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                      <span className="hidden sm:inline">{lang === "fr" ? "Supprimer" : "Delete"}</span>
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
