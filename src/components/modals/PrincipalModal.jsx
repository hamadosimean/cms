import React, { useState, useEffect } from "react";
import { X, Shield, Save, UserPlus, Link2 } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { useAppHandlers } from "../../hooks/useAppHandlers";

export default function PrincipalModal() {
  const {
    lang,
    showPrincipalModal,
    setShowPrincipalModal,
    editingPrincipalId,
    formPrincipalUser,
    setFormPrincipalUser,
    formPrincipalYear,
    setFormPrincipalYear,
    formPrincipalIsCurrent,
    setFormPrincipalIsCurrent,
    adminUsers,
  } = useAppStore();

  const { showNotification, fetchPortalData } = useAppHandlers();

  // Local form states for creating a new user account alongside principal registration
  const [createMode, setCreateMode] = useState("link"); // "link" or "create"
  const [newFirst, setNewFirst] = useState("");
  const [newLast, setNewLast] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Reset local states when modal opens/closes
  useEffect(() => {
    if (showPrincipalModal) {
      setCreateMode("link");
      setNewFirst("");
      setNewLast("");
      setNewEmail("");
      setNewPassword("");
    }
  }, [showPrincipalModal]);

  if (!showPrincipalModal) return null;

  // Filter users that have role "principal"
  const principalUsers = adminUsers ? adminUsers.filter((u) => u.role === "principal") : [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    if (editingPrincipalId || createMode === "link") {
      if (!formPrincipalUser || !formPrincipalYear) {
        showNotification(
          lang === "fr" ? "Veuillez remplir tous les champs obligatoires." : "All fields are required.",
          "error"
        );
        return;
      }
    } else {
      if (!newFirst || !newLast || !newEmail || !newPassword || !formPrincipalYear) {
        showNotification(
          lang === "fr" ? "Veuillez remplir tous les champs obligatoires." : "All fields are required.",
          "error"
        );
        return;
      }
    }

    try {
      let url = "";
      let method = "";
      let payload = {};

      if (editingPrincipalId) {
        url = `/api/admin/principals/${editingPrincipalId}`;
        method = "PUT";
        payload = {
          principal: formPrincipalUser,
          year: formPrincipalYear,
          is_current: formPrincipalIsCurrent,
        };
      } else {
        if (createMode === "create") {
          url = "/api/admin/principals/create-with-user";
          method = "POST";
          payload = {
            first_name: newFirst,
            last_name: newLast,
            email: newEmail,
            password: newPassword,
            year: formPrincipalYear,
            is_current: formPrincipalIsCurrent,
          };
        } else {
          url = "/api/admin/principals";
          method = "POST";
          payload = {
            principal: formPrincipalUser,
            year: formPrincipalYear,
            is_current: formPrincipalIsCurrent,
          };
        }
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showNotification(
          editingPrincipalId
            ? lang === "fr"
              ? "Principal mis à jour avec succès."
              : "Principal updated successfully."
            : lang === "fr"
              ? "Principal enregistré et compte utilisateur créé."
              : "Principal registered and user account established.",
          "success"
        );
        setShowPrincipalModal(false);
        fetchPortalData();
      } else {
        const errData = await res.json();
        showNotification(errData.error || "Operation failed", "error");
      }
    } catch (err) {
      showNotification("Error saving principal", "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-left transform transition-all animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800">
              {editingPrincipalId
                ? lang === "fr"
                  ? "Modifier le Principal"
                  : "Edit Principal Record"
                : lang === "fr"
                  ? "Enregistrer un Principal"
                  : "Register Principal"}
            </h3>
          </div>
          <button
            onClick={() => setShowPrincipalModal(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Create Mode Toggle Tabs (Only shown when adding a new record) */}
        {!editingPrincipalId && (
          <div className="grid grid-cols-2 border-b border-slate-100 bg-slate-50/50 p-1">
            <button
              type="button"
              onClick={() => setCreateMode("link")}
              className={`py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
                createMode === "link"
                  ? "bg-white text-blue-600 shadow-sm border border-slate-100"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>{lang === "fr" ? "Lier compte existant" : "Link Existing User"}</span>
            </button>
            <button
              type="button"
              onClick={() => setCreateMode("create")}
              className={`py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
                createMode === "create"
                  ? "bg-white text-blue-600 shadow-sm border border-slate-100"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{lang === "fr" ? "Créer un compte" : "Create New User"}</span>
            </button>
          </div>
        )}

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {editingPrincipalId || createMode === "link" ? (
            /* ================= LINK EXISTING ACCOUNT ================= */
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {lang === "fr" ? "Lier au compte utilisateur" : "Link User Account"}
              </label>
              <select
                value={formPrincipalUser}
                onChange={(e) => setFormPrincipalUser(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 font-medium"
                required
              >
                <option value="">{lang === "fr" ? "-- Sélectionner le Compte --" : "-- Select Principal Account --"}</option>
                {principalUsers.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.first_name} {u.last_name} ({u.email})
                  </option>
                ))}
                {principalUsers.length === 0 && (
                  <option value="usr_principal">Alassane Sana (principal@school.edu)</option>
                )}
              </select>
            </div>
          ) : (
            /* ================= CREATE NEW ACCOUNT ================= */
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {lang === "fr" ? "Prénom" : "First Name"}
                  </label>
                  <input
                    type="text"
                    value={newFirst}
                    onChange={(e) => setNewFirst(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 font-medium"
                    placeholder="e.g. Alassane"
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {lang === "fr" ? "Nom" : "Last Name"}
                  </label>
                  <input
                    type="text"
                    value={newLast}
                    onChange={(e) => setNewLast(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 font-medium"
                    placeholder="e.g. Sana"
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {lang === "fr" ? "Adresse Courriel" : "Email Address"}
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 font-medium"
                  placeholder="e.g. principal@school.edu"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {lang === "fr" ? "Mot de passe" : "Password"}
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          )}

          {/* Tenure Year */}
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {lang === "fr" ? "Année Scolaire / Mandat" : "Tenure Academic Year"}
            </label>
            <input
              type="text"
              value={formPrincipalYear}
              onChange={(e) => setFormPrincipalYear(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 font-medium"
              placeholder="e.g. 2025-2026"
              required
            />
          </div>

          {/* Is Current Principal Checkbox */}
          <div className="flex items-center gap-2 pt-2">
            <input
              id="formPrincipalIsCurrent"
              type="checkbox"
              checked={formPrincipalIsCurrent}
              onChange={(e) => setFormPrincipalIsCurrent(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="formPrincipalIsCurrent" className="text-xs font-bold text-slate-600 select-none cursor-pointer">
              {lang === "fr" ? "Définir comme principal actuel (signataire actif)" : "Set as current active principal (official signatory)"}
            </label>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowPrincipalModal(false)}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition min-h-11 cursor-pointer"
            >
              {lang === "fr" ? "Annuler" : "Cancel"}
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition shadow-md flex items-center gap-1.5 min-h-11 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{lang === "fr" ? "Enregistrer" : "Save Record"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
