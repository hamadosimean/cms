import React from "react";
import { Shield, Plus, Trash2 } from "lucide-react";
export default function AdminsTab({
  lang,
  adminUsers,
  user,
  setShowAdminModal,
  handleAdminDeleteAdmin,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="px-6 py-4 bg-white text-slate-800 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800">
            {lang === "fr"
              ? "Gestion des Administrateurs"
              : "Administrator Management"}
          </h3>
        </div>
        <button
          onClick={() => setShowAdminModal(true)}
          className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white transition flex items-center gap-1 min-h-11 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{lang === "fr" ? "Ajouter un Admin" : "Add Admin"}</span>
        </button>
      </div>

      <div className="p-6">
        {adminUsers.filter((u) => u.role === "admin").length === 0 ? (
          <p className="text-slate-400 text-xs italic text-center py-6">
            {lang === "fr"
              ? "Aucun administrateur trouvé."
              : "No administrators registered."}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminUsers
              .filter((u) => u.role === "admin")
              .map((adm) => (
                <div
                  key={adm.id}
                  className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between gap-4 text-left relative overflow-hidden"
                >
                  {/* Accent indicator line on left */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />

                  <div className="space-y-3 pl-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                          <span>
                            {adm.first_name} {adm.last_name}
                          </span>
                          {adm.id === user?.id && (
                            <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 font-mono text-[8px] rounded font-bold uppercase tracking-wider shrink-0">
                              {lang === "fr" ? "Vous" : "You"}
                            </span>
                          )}
                        </h4>
                        <p className="text-xs text-slate-400 font-mono break-all">
                          {adm.email}
                        </p>
                      </div>
                    </div>

                    <div className="text-xs space-y-1">
                      <p className="text-slate-500">
                        <span className="font-semibold text-slate-700">
                          {lang === "fr" ? "Rôle :" : "System Role:"}
                        </span>{" "}
                        {lang === "fr"
                          ? "Administrateur Système"
                          : "System Administrator"}
                      </p>
                      <p className="text-slate-500">
                        <span className="font-semibold text-slate-700">
                          {lang === "fr"
                            ? "Langue préférée :"
                            : "Preferred Language:"}
                        </span>{" "}
                        <span className="uppercase font-semibold font-mono">
                          {adm.preferred_language}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Remove button */}
                  <div className="flex items-center justify-end border-t border-slate-100 pt-3">
                    {adm.id === user?.id ? (
                      <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400 italic">
                        {lang === "fr" ? "Compte actif" : "Current Session"}
                      </span>
                    ) : (
                      <button
                        onClick={() => handleAdminDeleteAdmin(adm.id)}
                        className="px-2.5 py-1.5 rounded bg-rose-50 hover:bg-rose-100 text-rose-600 text-[10px] font-bold uppercase tracking-wider transition flex items-center gap-1 cursor-pointer"
                        title={
                          lang === "fr"
                            ? "Retirer cet administrateur"
                            : "Remove this administrator"
                        }
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>
                          {lang === "fr" ? "Retirer" : "Remove Admin"}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
