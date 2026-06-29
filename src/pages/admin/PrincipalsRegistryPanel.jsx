import React from "react";
import { UserCheck, Plus, Edit2, Trash2, CheckCircle2, ShieldAlert, FileSignature } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { useAppHandlers } from "../../hooks/useAppHandlers";

export default function PrincipalsRegistryPanel() {
  const {
    lang,
    adminPrincipals,
    setShowPrincipalModal,
    setEditingPrincipalId,
    setFormPrincipalUser,
    setFormPrincipalFirst,
    setFormPrincipalLast,
    setFormPrincipalYear,
    setFormPrincipalIsCurrent,
  } = useAppStore();

  const { handleDeletePrincipal, handleSetCurrentPrincipal } = useAppHandlers();

  const handleAddClick = () => {
    setEditingPrincipalId(null);
    setFormPrincipalUser("");
    setFormPrincipalFirst("");
    setFormPrincipalLast("");
    setFormPrincipalYear("");
    setFormPrincipalIsCurrent(false);
    setShowPrincipalModal(true);
  };

  const handleEditClick = (p) => {
    setEditingPrincipalId(p.id);
    setFormPrincipalUser(p.principal || "");
    setFormPrincipalFirst(p.first_name || "");
    setFormPrincipalLast(p.last_name || "");
    setFormPrincipalYear(p.year || "");
    setFormPrincipalIsCurrent(p.is_current || false);
    setShowPrincipalModal(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm text-left">
      <div className="px-6 py-4 bg-white text-slate-800 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileSignature className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800">
            {lang === "fr" ? "Registre des Directeurs & Signatures" : "Principals Registry & Official Signatures"}
          </h3>
        </div>
        <button
          onClick={handleAddClick}
          className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase bg-blue-600 hover:bg-blue-700 text-white transition flex items-center gap-1 min-h-11 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{lang === "fr" ? "Ajouter un Directeur" : "Add Principal"}</span>
        </button>
      </div>

      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">{lang === "fr" ? "Directeur (Utilisateur)" : "Principal (User)"}</th>
                <th className="py-3 px-4">{lang === "fr" ? "Nom Complet" : "Full Name"}</th>
                <th className="py-3 px-4">{lang === "fr" ? "Année Scolaire" : "Academic Year"}</th>
                <th className="py-3 px-4">{lang === "fr" ? "Signature Officielle" : "Official Signature"}</th>
                <th className="py-3 px-4">{lang === "fr" ? "Statut" : "Status"}</th>
                <th className="py-3 px-4 text-right">{lang === "fr" ? "Actions" : "Actions"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {adminPrincipals && adminPrincipals.length > 0 ? (
                adminPrincipals.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition font-medium text-slate-700">
                    <td className="py-4 px-4 font-mono text-[11px]">{p.principal || "usr_principal"}</td>
                    <td className="py-4 px-4 font-bold text-slate-900">
                      {p.first_name} {p.last_name}
                    </td>
                    <td className="py-4 px-4 font-mono">{p.year}</td>
                    <td className="py-4 px-4">
                      {p.signature ? (
                        <div className="h-10 w-28 bg-slate-50 border border-slate-200 rounded flex items-center justify-center p-1">
                          <img
                            src={p.signature}
                            alt={`${p.first_name} Signature`}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-amber-600 font-bold">
                          <ShieldAlert className="w-4 h-4 shrink-0" />
                          <span>{lang === "fr" ? "Non signée" : "No Signature"}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      {p.is_current ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-full border border-emerald-100">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{lang === "fr" ? "Actif (Signataire)" : "Current Principal"}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 bg-slate-100 text-slate-500 rounded-full">
                          <span>{lang === "fr" ? "Ancien" : "Former Principal"}</span>
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      {!p.is_current && (
                        <button
                          onClick={() => handleSetCurrentPrincipal(p)}
                          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition text-[10px] font-bold uppercase cursor-pointer"
                        >
                          {lang === "fr" ? "Rendre Actif" : "Set Active"}
                        </button>
                      )}
                      <button
                        onClick={() => handleEditClick(p)}
                        className="p-1.5 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded transition cursor-pointer"
                        title={lang === "fr" ? "Modifier" : "Edit Principal Details"}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePrincipal(p.id)}
                        className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded transition cursor-pointer"
                        title={lang === "fr" ? "Supprimer" : "Delete Principal"}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 italic">
                    {lang === "fr" ? "Aucun directeur enregistré." : "No principals registered in the system registry."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
