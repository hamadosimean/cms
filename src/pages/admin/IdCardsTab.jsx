import React from "react";
import {
  GraduationCap,
  Download,
  AlertTriangle,
  User as UserIcon,
  Edit3,
  Check,
  Trash2,
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
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="px-6 py-4 bg-white text-slate-800 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800">
            {lang === "fr"
              ? "Annuaire des Cartes d'Étudiants"
              : "Student ID Cards Directory"}
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center self-start sm:self-auto">
          {/* Batch Print Button */}
          <button
            onClick={handleBatchPdfDownload}
            className="px-4 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-indigo-700 transition flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>
              {lang === "fr"
                ? "Imprimer PDF (Lot)"
                : "Generate Batch Print PDF"}
            </span>
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
              {lang === "fr" ? "En attente" : "Pending"} (
              {adminIdCards.filter((c) => c.card_status === "pending").length})
            </button>
            <button
              onClick={() => setAdminCardFilterTab("all")}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                adminCardFilterTab === "all"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {lang === "fr" ? "Toutes les cartes" : "All Cards"} (
              {adminIdCards.length})
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {!principalSignature && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-3 shadow-sm">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 animate-bounce" />
            <div className="space-y-1">
              <p className="font-bold uppercase tracking-wider text-[10px]">
                {lang === "fr"
                  ? "Signature du directeur manquante"
                  : "Principal Signature Missing"}
              </p>
              <p className="leading-relaxed">
                {lang === "fr"
                  ? "Vous devez enregistrer la signature du directeur dans l'onglet 'Aperçu de l'établissement' avant de pouvoir approuver, générer ou activer des cartes d'étudiants."
                  : "You must save a Principal Signature in the 'Institution Overview' tab before you can approve, generate, or activate student ID cards."}
              </p>
              <button
                onClick={() => setActiveSidebarTab("overview")}
                className="mt-2 text-amber-900 font-extrabold hover:underline cursor-pointer flex items-center gap-1 uppercase tracking-wider text-[9px]"
              >
                {lang === "fr"
                  ? "Aller à l'Aperçu pour signer →"
                  : "Go to Overview to sign now →"}
              </button>
            </div>
          </div>
        )}

        {/* Card grid filtered */}
        {adminIdCards.filter((c) =>
          adminCardFilterTab === "pending" ? c.card_status === "pending" : true,
        ).length === 0 ? (
          <p className="text-slate-400 text-xs italic text-center py-8">
            {adminCardFilterTab === "pending"
              ? lang === "fr"
                ? "Aucune demande de carte en attente."
                : "No pending ID card requests currently."
              : lang === "fr"
                ? "Aucune carte d'étudiant enregistrée."
                : "No student cards found in directory."}
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {adminIdCards
              .filter((c) =>
                adminCardFilterTab === "pending"
                  ? c.card_status === "pending"
                  : true,
              )
              .map((card) => {
                const studentApp = adminApplications.find(
                  (a) => a.student_id === card.student_id,
                );
                const cardClass = studentApp?.target_class || "Grade 10-A";
                return (
                  <div
                    key={card.id}
                    className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50 flex flex-col justify-between gap-4 shadow-sm hover:border-slate-300 transition relative overflow-hidden"
                  >
                    {/* Card badge header */}
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

                    {/* Core contents */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {/* Profile picture */}
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

                        {/* Identity Texts */}
                        <div className="text-left space-y-1">
                          <h4 className="font-bold text-sm text-slate-800 leading-tight">
                            {getStudentName(card.student_id)}
                          </h4>
                          <p className="text-xs text-slate-500">
                            {lang === "fr" ? "Classe" : "Class/Grade"}:{" "}
                            <span className="font-semibold text-slate-700">
                              {cardClass}
                            </span>
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono">
                            Card Ref: {card.id}
                          </p>
                          <p className="text-[10px] text-indigo-600 font-semibold bg-indigo-50 border border-indigo-200/50 rounded-md px-1.5 py-0.5 inline-block mt-1">
                            {lang === "fr" ? "Valide jusqu'au" : "Valid Until"}:{" "}
                            <span className="font-bold font-mono">
                              {card.valid_until || "2027-06-30"}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Dynamic QR code for verification check */}
                      <div className="flex flex-col items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(window.location.origin + "/verify/" + card.student_id)}`}
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

                    {/* Interactive Actions bar */}
                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200/60">
                      <button
                        onClick={() => setViewingCard(card)}
                        className="px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider transition duration-150 flex items-center gap-1 min-h-10 cursor-pointer"
                        title="View ID Card Popup"
                      >
                        <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                        <span>
                          {lang === "fr" ? "Voir Carte" : "View Card"}
                        </span>
                      </button>

                      <button
                        onClick={() => handleOpenEditCard(card)}
                        className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider transition duration-150 flex items-center gap-1 min-h-10 cursor-pointer"
                        title="Edit student identity card info"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                        <span>{lang === "fr" ? "Modifier" : "Edit"}</span>
                      </button>

                      {card.card_status === "pending" ? (
                        <button
                          onClick={() => handleApproveIdCard(card.id)}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition duration-150 flex items-center gap-1 min-h-10 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{getTranslation("approveID", lang)}</span>
                        </button>
                      ) : (
                        card.generated_pdf_url && (
                          <a
                            href={card.generated_pdf_url}
                            download
                            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition duration-150 flex items-center gap-1 min-h-10 cursor-pointer decoration-transparent"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>
                              {lang === "fr" ? "Télécharger" : "Download"}
                            </span>
                          </a>
                        )
                      )}

                      <button
                        onClick={() =>
                          handleDeleteStudentClick(card.student_id)
                        }
                        className="px-3 py-1.5 rounded-lg border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider transition duration-150 flex items-center gap-1 min-h-10 cursor-pointer"
                        title="Delete student profile and card"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-500" />
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
