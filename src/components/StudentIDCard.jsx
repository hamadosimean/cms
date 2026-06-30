import React from "react";
import { School } from "lucide-react";
import { useAppStore } from "../store/useAppStore";

export function StudentIDCard({
  lang,
  studentId,
  firstName,
  lastName,
  targetClass,
  idPhoto,
  validUntil = "2027-06-30",
  principalSignature,
  cardStatus,
}) {
  const isFr = lang === "fr";
  const { schoolInfo } = useAppStore();
  const principalName = schoolInfo?.principal_name || "Hamado Simean";
  return (
    <div className="relative w-full aspect-[1.58] bg-white text-slate-800 rounded-xl shadow-xl overflow-hidden border border-slate-200 p-4 flex flex-col justify-between text-left select-none">
      {/* Micro chips and holographic watermarks for ultra high-end visual look */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none"></div>


      {/* Header band */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5 animate-pulse">
        <School className="w-5 h-5 text-blue-400 shrink-0" />
        <div>
          <h4 className="text-[10px] font-bold uppercase leading-none tracking-tight">
            {isFr ? "ACADÉMIE SAINT-JUDE" : "SAINT JUDE ACADEMY"}
          </h4>
          <span className="text-[6px] text-slate-400 block tracking-widest uppercase mt-0.5">
            {isFr
              ? "EXCELLENCE • DISCIPLINE • SUCCÈS"
              : "EXCELLENCE • DISCIPLINE • SUCCESS"}
          </span>
        </div>
      </div>

      {/* Main core details layout */}
      <div className="flex items-center justify-between gap-2 py-1">
        <div className="flex items-center gap-2">
          {/* Profile square */}
          <div className="w-14 h-16 bg-slate-100 rounded border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
            {idPhoto ? (
              <img
                src={idPhoto}
                alt="ID Photo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="text-slate-400 text-[8px] uppercase tracking-wider font-mono">
                {isFr ? "Pas de Photo" : "No Photo"}
              </div>
            )}
          </div>

          {/* Data fields */}
          <div className="space-y-1">
            <div>
              <div className="text-[6px] text-slate-400 uppercase font-bold tracking-wider leading-none">
                {isFr ? "Nom / Prénom" : "Name"}
              </div>
              <div className="text-[10px] font-bold text-slate-900 leading-tight">
                {lastName.toUpperCase()} {firstName}
              </div>
            </div>
            <div>
              <div className="text-[6px] text-slate-400 uppercase font-bold tracking-wider leading-none">
                {isFr ? "Classe" : "Class"}
              </div>
              <div className="text-[10px] font-bold text-slate-700 leading-none">
                {targetClass || (isFr ? "N/A" : "N/A")}
              </div>
            </div>
            <div>
              <div className="text-[6px] text-slate-400 uppercase font-bold tracking-wider leading-none">
                ID / MATRICULE
              </div>
              <div className="text-[10px] font-mono text-slate-700 font-bold leading-none">
                {studentId?.substring(0, 8).toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Live Verification QR Code */}
        <div className="flex flex-col items-center gap-0.5 shrink-0 bg-white p-1 rounded border border-slate-200 shadow-sm">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(window.location.origin + "/verify/" + studentId)}`}
            alt="Scan to Verify"
            className="w-8 h-8"
          />
          <span className="text-[3px] text-slate-500 font-bold font-mono tracking-tighter uppercase">
            VERIFY
          </span>
        </div>
      </div>

      {/* Signatures Row */}
      <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-1 text-[6px] my-0.5">
        {/* Student signature area */}
        <div className="flex flex-col justify-end text-left">
          <div className="border-b border-slate-300 h-4 flex items-end justify-center relative">
            <span className="text-[4.5px] text-slate-400 font-mono absolute -bottom-[3px] bg-white px-1">
              {isFr ? "Signature de l'Élève" : "Student Signature"}
            </span>
          </div>
        </div>

        {/* Principal Signature Area */}
        <div className="flex flex-col justify-end text-right items-end pl-2">
          <span className="text-[5px] text-slate-400 uppercase tracking-widest block leading-none font-bold mb-1">
            {isFr ? "Directeur" : "Principal"}
          </span>
          <div className="bg-transparent h-6 flex items-center justify-center relative w-full border-b border-slate-300">
            {principalSignature && (
              <img
                src={principalSignature}
                alt="Principal Signature"
                className="max-h-5 object-contain absolute"
                referrerPolicy="no-referrer"
              />
            )}
            <span className="text-[4px] text-slate-400 font-mono absolute -bottom-1.5 right-1 bg-white px-0.5">
              {lang === "fr" ? "Autorisé" : "Authorized"}
            </span>
          </div>
          <span className="text-[5.5px] text-blue-600 font-bold uppercase mt-1.5">
            {principalName}
          </span>
        </div>
      </div>

      {/* Footer expiry indicator */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-1 text-[6px] font-mono text-slate-400">
        <span>
          {isFr ? `Expire le : ${validUntil}` : `Expires: ${validUntil}`}
        </span>
      </div>
    </div>
  );
}
