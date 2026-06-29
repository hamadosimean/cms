import React from "react";
import { School, Info, Mail, Globe, MapPin, ExternalLink } from "lucide-react";
export default function StudentSchoolInfoPanel({ lang, schoolInfo }) {
  if (!schoolInfo) return null;
  return (
    <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden text-left mt-4">
      <div className="px-6 py-5 bg-linear-to-r from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center shrink-0 p-1 border border-white/10">
            {schoolInfo.logo_url ? (
              <img
                src={schoolInfo.logo_url}
                alt="Logo"
                className="w-full h-full object-contain rounded"
              />
            ) : (
              <School className="w-6 h-6 text-blue-400" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-base tracking-tight">
              {schoolInfo.name}
            </h3>
            <p className="text-xs text-slate-300 font-medium">
              {lang === "fr"
                ? "Profil officiel de l'établissement"
                : "Official School Profile"}
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded-full uppercase tracking-wider font-bold border border-blue-400/20 self-start sm:self-auto">
          {lang === "fr" ? "Informations Générales" : "General School Info"}
        </span>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: History & References */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-600" />
              {lang === "fr" ? "Notre Histoire" : "Our Rich History"}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {schoolInfo.history}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                {lang === "fr" ? "Références & Agréments" : "Accreditations"}
              </span>
              <p className="text-xs font-semibold text-slate-700 italic">
                "{schoolInfo.references}"
              </p>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                {lang === "fr" ? "Devise" : "Motto"}
              </span>
              <p className="text-xs font-semibold text-blue-600 italic">
                "{schoolInfo.motto || "Excellence, Discipline, Progress"}"
              </p>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                {lang === "fr" ? "Année de création" : "Established"}
              </span>
              <p className="text-xs font-semibold text-slate-700">
                {schoolInfo.established_year || 1982}
              </p>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                {lang === "fr" ? "Directeur" : "Principal"}
              </span>
              <p className="text-xs font-semibold text-slate-700">
                {schoolInfo.principal_name || "Dr. Marianne Rousseau"}
              </p>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {lang === "fr" ? "Site Internet" : "Official Website"}
              </span>
              {schoolInfo.website_url ? (
                <a
                  href={
                    schoolInfo.website_url.startsWith("http")
                      ? schoolInfo.website_url
                      : `https://${schoolInfo.website_url}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <span>{schoolInfo.website_url}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-xs font-semibold text-slate-400">
                  N/A
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Contact & Geolocation */}
        <div className="space-y-6 bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              {lang === "fr"
                ? "Coordonnées & Contact"
                : "School Contact Details"}
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-medium truncate">
                  {schoolInfo.contact_email}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-medium">{schoolInfo.contact_phone}</span>
              </div>
              <div className="flex items-start gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span className="font-medium leading-normal">
                  {schoolInfo.contact_address}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive map iframe */}
          <div className="space-y-2 pt-4 border-t border-slate-200">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between">
              <span>{lang === "fr" ? "Géolocalisation" : "Campus Map"}</span>
              <span className="font-mono text-slate-500 text-[9px]">
                {schoolInfo.geolocation_lat.toFixed(4)}°,{" "}
                {schoolInfo.geolocation_lng.toFixed(4)}°
              </span>
            </h4>

            <div className="w-full h-32 rounded-lg overflow-hidden border border-slate-200 shadow-inner bg-slate-200 relative">
              <iframe
                title="School Map Location"
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
    </div>
  );
}
