import React from "react";
import { Settings } from "lucide-react";
export default function ProfileTab({
  lang,
  user,
  profileFirstName,
  setProfileFirstName,
  profileLastName,
  setProfileLastName,
  profileEmail,
  profileLang,
  setProfileLang,
  handleProfileUpdateSubmit,
}) {
  return (
    <div className="space-y-8 text-left">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-white text-slate-800 border-b border-slate-200 flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800">
            {lang === "fr" ? "Paramètres du Profil" : "Profile Settings"}
          </h3>
        </div>

        <form
          onSubmit={handleProfileUpdateSubmit}
          className="p-6 sm:p-8 space-y-6 max-w-2xl"
        >
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-xl shadow-inner shrink-0">
              {user.first_name?.[0]?.toUpperCase() || ""}
              {user.last_name?.[0]?.toUpperCase() || ""}
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-base">
                {user.first_name} {user.last_name}
              </h4>
              <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mt-0.5">
                {user.role} • ID: {user.id}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                {lang === "fr" ? "Prénom" : "First Name"}
              </label>
              <input
                type="text"
                required
                value={profileFirstName}
                onChange={(e) => setProfileFirstName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                {lang === "fr" ? "Nom" : "Last Name"}
              </label>
              <input
                type="text"
                required
                value={profileLastName}
                onChange={(e) => setProfileLastName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"
              />
            </div>
          </div>

          {/* Email (Read only) */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
              {lang === "fr"
                ? "Adresse Email (Lecture seule)"
                : "Email Address (Read-only)"}
            </label>
            <input
              type="email"
              disabled
              value={profileEmail}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-100 bg-slate-50 text-slate-400 text-sm font-mono cursor-not-allowed"
            />
          </div>

          {/* Preferred Language */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
              {lang === "fr" ? "Langue préférée" : "Preferred Language"}
            </label>
            <select
              value={profileLang}
              onChange={(e) => setProfileLang(e.target.value)}
              className="w-full max-w-xs px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition bg-white"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider transition shadow-md cursor-pointer"
            >
              {lang === "fr" ? "Enregistrer les modifications" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
