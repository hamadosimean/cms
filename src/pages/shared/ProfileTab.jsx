import React from "react";
import { Settings, User as UserIcon, ShieldAlert, Download } from "lucide-react";
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
  profileParentName,
  setProfileParentName,
  profileParentPhone,
  setProfileParentPhone,
  profileParentLiving,
  setProfileParentLiving,
  handleProfileUpdateSubmit,
  teacherProfile,
  schoolInfo,
  principalSignature,
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

          {user.role === "student" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                    {lang === "fr" ? "Nom Complet du Parent" : "Parent Full Name"}
                  </label>
                  <input
                    type="text"
                    required
                    value={profileParentName}
                    onChange={(e) => setProfileParentName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                    {lang === "fr" ? "Numéro de Téléphone du Parent" : "Parent Phone Number"}
                  </label>
                  <input
                    type="text"
                    required
                    value={profileParentPhone}
                    onChange={(e) => setProfileParentPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                  {lang === "fr" ? "Lieu de Résidence" : "Place of Living"}
                </label>
                <input
                  type="text"
                  required
                  value={profileParentLiving}
                  onChange={(e) => setProfileParentLiving(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"
                />
              </div>
            </>
          )}

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider transition shadow-md cursor-pointer"
            >
              {lang === "fr" ? "Enregistrer les modifications" : "Save Changes"}
            </button>
          </div>
        </form>

        {/* Teacher ID Card Preview */}
        {user.role === "teacher" && teacherProfile && schoolInfo && (
          <div className="p-6 sm:p-8 pt-0 max-w-2xl">
            <div className="space-y-3 pt-6 border-t border-slate-100">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {lang === "fr"
                  ? "Aperçu de votre carte d'identité"
                  : "Your Digital ID Card Live Preview"}
              </label>

              <div className="mt-4 p-5 rounded-2xl border border-slate-200/80 bg-slate-50 flex flex-col justify-between gap-4 shadow-sm hover:border-slate-300 transition relative overflow-hidden">
                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full border ${
                      teacherProfile.profile_photo_url
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {teacherProfile.profile_photo_url
                      ? lang === "fr"
                        ? "Photo Téléversée"
                        : "Photo Uploaded / Active"
                      : lang === "fr"
                        ? "Photo Manquante"
                        : "Photo Missing"}
                  </span>

                  <span className="text-[10px] text-slate-400 font-mono">
                    Staff ID: {user.id?.substring(0, 8).toUpperCase()}
                  </span>
                </div>

                {/* Core details */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-18 rounded-lg bg-slate-200 border border-slate-300 overflow-hidden shrink-0 shadow-sm flex items-center justify-center">
                    {teacherProfile.profile_photo_url ? (
                      <img
                        src={teacherProfile.profile_photo_url}
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
                      {user.first_name} {user.last_name}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {user.email}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      {teacherProfile.qualifications || (lang === "fr" ? "Sans Diplôme" : "No qualifications entered")}
                    </p>
                    <p className="text-[10px] text-indigo-600 font-semibold bg-indigo-50 border border-indigo-200/50 rounded-md px-1.5 py-0.5 inline-block">
                      {lang === "fr" ? "Expérience" : "Experience"}:{" "}
                      <span className="font-bold font-mono">{teacherProfile.experience_years || 0} {lang === "fr" ? "ans" : "years"}</span>
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200/60">
                  {teacherProfile.profile_photo_url ? (
                    <a
                      href={`/api/teacher-id-cards/download/${user.id}?lang=${lang}`}
                      download={`Teacher_ID_Card_${user.last_name}.pdf`}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 min-h-10 cursor-pointer decoration-transparent font-sans"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{lang === "fr" ? "Télécharger PDF" : "Download PDF"}</span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-1 text-amber-600 text-xs font-bold">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>{lang === "fr" ? "Photo requise" : "Photo required for download"}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
