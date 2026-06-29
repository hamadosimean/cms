import React from "react";
import { Clock, Download, Search, Filter } from "lucide-react";
export default function AuditLogsTab({
  lang,
  adminAuditLogs,
  auditSearchQuery,
  setAuditSearchQuery,
  auditActionFilter,
  setAuditActionFilter,
  filteredAuditLogs,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 bg-white text-slate-800 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-left">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800">
              {lang === "fr"
                ? "Journal d'Audit du Système"
                : "System Audit Log"}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {lang === "fr"
              ? "Historique complet des actions administratives critiques et des modifications du système."
              : "Complete record of critical administrative actions, security updates, and database modifications."}
          </p>
        </div>

        {/* Export button */}
        <button
          onClick={() => {
            const headers = [
              "ID",
              "Timestamp",
              "Actor Email",
              "Actor Role",
              "Action",
              "Details",
            ];
            const rows = adminAuditLogs.map((l) => [
              l.id,
              l.timestamp,
              l.user_email,
              l.user_role,
              l.action,
              l.details,
            ]);
            const csvContent =
              "data:text/csv;charset=utf-8," +
              [
                headers.join(","),
                ...rows.map((e) =>
                  e
                    .map((val) => `"${String(val).replace(/"/g, '""')}"`)
                    .join(","),
                ),
              ].join("\n");
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute(
              "download",
              `system_audit_log_${new Date().toISOString().split("T")[0]}.csv`,
            );
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          disabled={adminAuditLogs.length === 0}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{lang === "fr" ? "Exporter" : "Export Logs"}</span>
        </button>
      </div>

      {/* Filter & Search Controls */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search box */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={
              lang === "fr"
                ? "Rechercher un log..."
                : "Search logs by actor or details..."
            }
            value={auditSearchQuery}
            onChange={(e) => setAuditSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs border border-slate-200 bg-white focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Action Type filter */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={auditActionFilter}
            onChange={(e) => setAuditActionFilter(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs border border-slate-200 bg-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer font-bold text-slate-700"
          >
            <option value="ALL">
              {lang === "fr" ? "Toutes les actions" : "All Actions"}
            </option>
            <option value="STUDENT_DELETED">
              {lang === "fr" ? "Suppression d'étudiant" : "Student Deleted"}
            </option>
            <option value="BULK_APPROVAL">
              {lang === "fr" ? "Approbation en masse" : "Bulk Approval"}
            </option>
            <option value="BULK_DELETION">
              {lang === "fr" ? "Suppression en masse" : "Bulk Deletion"}
            </option>
            <option value="SCHOOL_SETTINGS_CHANGED">
              {lang === "fr"
                ? "Changement de paramètres"
                : "School Settings Changed"}
            </option>
            <option value="SYSTEM_START">
              {lang === "fr" ? "Démarrage système" : "System Start"}
            </option>
            <option value="TEACHER_ADDED">
              {lang === "fr" ? "Enseignant ajouté" : "Teacher Added"}
            </option>
          </select>
        </div>
      </div>

      {/* Audit Logs Table/List */}
      <div className="overflow-x-auto text-left">
        {filteredAuditLogs.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-medium">
              {lang === "fr"
                ? "Aucun log d'audit trouvé"
                : "No audit logs found"}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {lang === "fr"
                ? "Ajustez vos filtres ou effectuez une nouvelle recherche."
                : "Try adjusting your filters or search criteria."}
            </p>
          </div>
        ) : (
          <table className="w-full text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5 text-left">
                  {lang === "fr" ? "Date & Heure" : "Timestamp"}
                </th>
                <th className="px-6 py-3.5 text-left">
                  {lang === "fr" ? "Utilisateur" : "Actor / User"}
                </th>
                <th className="px-6 py-3.5 text-left">
                  {lang === "fr" ? "Action" : "Action Type"}
                </th>
                <th className="px-6 py-3.5 text-left">
                  {lang === "fr" ? "Détails de l'Événement" : "Event Details"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAuditLogs.map((log) => {
                // Styling badge helper
                let badgeColor =
                  "bg-slate-100 text-slate-700 border border-slate-200";
                if (
                  log.action === "STUDENT_DELETED" ||
                  log.action === "BULK_DELETION"
                ) {
                  badgeColor =
                    "bg-rose-50 text-rose-700 border border-rose-200/50";
                } else if (log.action === "BULK_APPROVAL") {
                  badgeColor =
                    "bg-emerald-50 text-emerald-700 border border-emerald-200/50";
                } else if (log.action === "SCHOOL_SETTINGS_CHANGED") {
                  badgeColor =
                    "bg-blue-50 text-blue-700 border border-blue-200/50";
                } else if (log.action === "SYSTEM_START") {
                  badgeColor =
                    "bg-indigo-50 text-indigo-700 border border-indigo-200/50";
                } else if (log.action === "TEACHER_ADDED") {
                  badgeColor =
                    "bg-amber-50 text-amber-700 border border-amber-200/50";
                }
                const formattedDate = new Date(log.timestamp).toLocaleString(
                  lang === "fr" ? "fr-FR" : "en-US",
                  {
                    dateStyle: "medium",
                    timeStyle: "short",
                  },
                );
                return (
                  <tr
                    key={log.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-[11px] text-slate-500 shrink-0 whitespace-nowrap">
                      {formattedDate}
                    </td>
                    <td className="px-6 py-4 shrink-0">
                      <div className="font-semibold text-slate-800">
                        {log.user_email}
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                        {log.user_role}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${badgeColor}`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {log.details}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
