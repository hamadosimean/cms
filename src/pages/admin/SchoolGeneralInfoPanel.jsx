import React from "react";
import { School, Edit3, Mail, Globe, MapPin } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { useAppHandlers } from "../../hooks/useAppHandlers";

export default function SchoolGeneralInfoPanel() {
  const {
    lang,
    schoolInfo,
    isEditingSchoolInfo,
    setIsEditingSchoolInfo,
    formSchoolName,
    setFormSchoolName,
    formSchoolLogo,
    setFormSchoolLogo,
    formSchoolHistory,
    setFormSchoolHistory,
    formSchoolReferences,
    setFormSchoolReferences,
    formSchoolEmail,
    setFormSchoolEmail,
    formSchoolPhone,
    setFormSchoolPhone,
    formSchoolAddress,
    setFormSchoolAddress,
    formSchoolLat,
    setFormSchoolLat,
    formSchoolLng,
    setFormSchoolLng,
    formSchoolMapIframe,
    setFormSchoolMapIframe,
    formSchoolMotto,
    setFormSchoolMotto,
    formSchoolEstablished,
    setFormSchoolEstablished,
    formSchoolPrincipal,
    setFormSchoolPrincipal,
    formSchoolWebsite,
    setFormSchoolWebsite,
    formSchoolColor,
    setFormSchoolColor,
  } = useAppStore();

  const { handleSaveSchoolInfo, handleSchoolLogoUpload } = useAppHandlers();

  if (!schoolInfo) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm text-left">
      <div className="px-6 py-4 bg-white text-slate-800 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <School className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800">
            {lang === "fr"
              ? "Configuration de l'Établissement"
              : "School Profile & General Campus Settings"}
          </h3>
        </div>

        {!isEditingSchoolInfo && (
          <button
            onClick={() => {
              setFormSchoolName(schoolInfo.name);
              setFormSchoolLogo(schoolInfo.logo_url);
              setFormSchoolHistory(schoolInfo.history);
              setFormSchoolReferences(schoolInfo.references);
              setFormSchoolEmail(schoolInfo.contact_email);
              setFormSchoolPhone(schoolInfo.contact_phone);
              setFormSchoolAddress(schoolInfo.contact_address);
              setFormSchoolLat(schoolInfo.geolocation_lat);
              setFormSchoolLng(schoolInfo.geolocation_lng);
              setFormSchoolMapIframe(schoolInfo.map_iframe_url);
              setFormSchoolMotto(schoolInfo.motto || "");
              setFormSchoolEstablished(schoolInfo.established_year || 1982);
              setFormSchoolPrincipal(schoolInfo.principal_name || "");
              setFormSchoolWebsite(schoolInfo.website_url || "");
              setFormSchoolColor(schoolInfo.color_theme || "#2563eb");
              setIsEditingSchoolInfo(true);
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase border border-blue-200 hover:bg-blue-50 text-blue-600 transition flex items-center gap-1 min-h-11 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>
              {lang === "fr" ? "Modifier le Profil" : "Edit School Profile"}
            </span>
          </button>
        )}
      </div>

      <div className="p-6">
        {isEditingSchoolInfo ? (
          <form onSubmit={handleSaveSchoolInfo} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* School Name */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-400">
                  School Name
                </label>
                <input
                  type="text"
                  value={formSchoolName}
                  onChange={(e) => setFormSchoolName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 font-medium"
                  required
                />
              </div>

              {/* Logo upload and preview */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-400">
                  School Logo
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                    {formSchoolLogo ? (
                      <img
                        src={formSchoolLogo}
                        alt="Logo preview"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <School className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSchoolLogoUpload}
                      className="text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* History */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-400">
                  School History
                </label>
                <textarea
                  value={formSchoolHistory}
                  onChange={(e) => setFormSchoolHistory(e.target.value)}
                  rows={4}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 font-medium leading-relaxed"
                />
              </div>

              {/* References */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-400">
                  Accreditations & References
                </label>
                <input
                  type="text"
                  value={formSchoolReferences}
                  onChange={(e) => setFormSchoolReferences(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              {/* Contact Email */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-400">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={formSchoolEmail}
                  onChange={(e) => setFormSchoolEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              {/* Contact Phone */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-400">
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={formSchoolPhone}
                  onChange={(e) => setFormSchoolPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              {/* Contact Address */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-400">
                  Contact Address
                </label>
                <input
                  type="text"
                  value={formSchoolAddress}
                  onChange={(e) => setFormSchoolAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              {/* Geolocation Lat */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-400">
                  Latitude (e.g., 48.8462)
                </label>
                <input
                  type="number"
                  step="any"
                  value={formSchoolLat}
                  onChange={(e) => {
                    const lat = Number(e.target.value);
                    setFormSchoolLat(lat);
                    setFormSchoolMapIframe(
                      `https://maps.google.com/maps?q=${lat},${formSchoolLng}&t=&z=13&ie=UTF8&iwloc=&output=embed`,
                    );
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              {/* Geolocation Lng */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-400">
                  Longitude (e.g., 2.3447)
                </label>
                <input
                  type="number"
                  step="any"
                  value={formSchoolLng}
                  onChange={(e) => {
                    const lng = Number(e.target.value);
                    setFormSchoolLng(lng);
                    setFormSchoolMapIframe(
                      `https://maps.google.com/maps?q=${formSchoolLat},${lng}&t=&z=13&ie=UTF8&iwloc=&output=embed`,
                    );
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              {/* Map Iframe URL (Preview / Read Only) */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-400">
                  Embedded Map URL
                </label>
                <input
                  type="text"
                  value={formSchoolMapIframe}
                  readOnly
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-100 bg-slate-50 text-xs text-slate-400 font-mono focus:outline-none"
                />
                <p className="text-[10px] text-slate-400">
                  Note: Map URL is automatically structured according to
                  coordinates.
                </p>
              </div>

              {/* School Motto */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-400">
                  School Motto
                </label>
                <input
                  type="text"
                  value={formSchoolMotto}
                  onChange={(e) => setFormSchoolMotto(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 font-medium"
                  placeholder="e.g. Excellence, Discipline, Progress"
                />
              </div>

              {/* Established Year */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-400">
                  Established Year
                </label>
                <input
                  type="number"
                  value={formSchoolEstablished}
                  onChange={(e) =>
                    setFormSchoolEstablished(Number(e.target.value))
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              {/* Principal Name */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-400">
                  Principal / Head of School
                </label>
                <input
                  type="text"
                  value={formSchoolPrincipal}
                  onChange={(e) => setFormSchoolPrincipal(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              {/* Website URL */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-400">
                  Official Website
                </label>
                <input
                  type="text"
                  value={formSchoolWebsite}
                  onChange={(e) => setFormSchoolWebsite(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 font-medium"
                  placeholder="e.g. school.edu"
                />
              </div>

              {/* Color Accent Theme */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-400">
                  Color Accent Theme
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formSchoolColor}
                    onChange={(e) => setFormSchoolColor(e.target.value)}
                    className="w-10 h-10 rounded border border-slate-200 cursor-pointer p-0"
                  />
                  <input
                    type="text"
                    value={formSchoolColor}
                    onChange={(e) => setFormSchoolColor(e.target.value)}
                    className="w-24 px-2 py-1 text-xs border border-slate-200 rounded font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditingSchoolInfo(false)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition min-h-11"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition shadow-md min-h-11"
              >
                Save Settings
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-xs font-medium text-slate-700">
            {/* Left Columns (Logo, History, Refs) */}
            <div className="lg:col-span-2 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl border border-slate-200 flex items-center justify-center p-1 shrink-0 bg-slate-50">
                  {schoolInfo.logo_url ? (
                    <img
                      src={schoolInfo.logo_url}
                      alt="Logo"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <School className="w-8 h-8 text-blue-500" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm leading-tight">
                    {schoolInfo.name}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                    Live campus credentials
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  History & Background
                </span>
                <p className="text-slate-600 leading-relaxed font-normal">
                  {schoolInfo.history}
                </p>
              </div>

              <div className="space-y-1.5 pt-4 border-t border-slate-100">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Official References
                </span>
                <p className="text-slate-600 leading-relaxed font-semibold italic">
                  "{schoolInfo.references}"
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    School Motto
                  </span>
                  <p className="text-slate-700 font-semibold italic">
                    "{schoolInfo.motto || "Excellence, Discipline, Progress"}"
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    Established Year
                  </span>
                  <p className="text-slate-700 font-semibold">
                    {schoolInfo.established_year || 1982}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    Principal / Head of School
                  </span>
                  <p className="text-slate-700 font-semibold">
                    {schoolInfo.principal_name || "Dr. Marianne Rousseau"}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    Official Website
                  </span>
                  <p className="text-blue-600 font-bold hover:underline">
                    <a
                      href={
                        schoolInfo.website_url
                          ? schoolInfo.website_url.startsWith("http")
                            ? schoolInfo.website_url
                            : `https://${schoolInfo.website_url}`
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {schoolInfo.website_url || "N/A"}
                    </a>
                  </p>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    Color Accent Theme
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className="w-4 h-4 rounded-full border border-slate-300 block shadow-sm"
                      style={{
                        backgroundColor: schoolInfo.color_theme || "#2563eb",
                      }}
                    />
                    <span className="font-mono text-[10px] text-slate-500">
                      {schoolInfo.color_theme || "#2563eb"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Contact & Map) */}
            <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200/50">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Contact Coordinates
                </span>
                <div className="space-y-2 pt-1.5 text-xs">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />{" "}
                    <span className="text-slate-600 font-semibold">
                      {schoolInfo.contact_email}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-slate-400 shrink-0" />{" "}
                    <span className="text-slate-600 font-semibold">
                      {schoolInfo.contact_phone}
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />{" "}
                    <span className="text-slate-600 leading-normal font-semibold">
                      {schoolInfo.contact_address}
                    </span>
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-200">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    Campus Location
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">
                    {schoolInfo.geolocation_lat.toFixed(4)},{" "}
                    {schoolInfo.geolocation_lng.toFixed(4)}
                  </span>
                </div>
                <div className="w-full h-28 rounded-lg overflow-hidden border border-slate-200 bg-slate-200">
                  <iframe
                    title="School Map Location Preview"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    src={schoolInfo.map_iframe_url}
                    className="w-full h-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
