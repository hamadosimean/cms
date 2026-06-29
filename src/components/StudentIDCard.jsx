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
    <div className="relative w-full aspect-[1.58] bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl shadow-xl overflow-hidden border border-blue-500/20 p-4 flex flex-col justify-between text-left select-none">
      {/* Micro chips and holographic watermarks for ultra high-end visual look */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none"></div>

      {/* Dynamic Status Badge */}
      <div
        className={`absolute top-2 right-2 px-1.5 py-0.5 rounded text-[6px] font-bold tracking-wider uppercase border shadow-sm flex items-center justify-center pointer-events-none z-10 ${
          cardStatus === "generated" || cardStatus === "active"
            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
            : "bg-amber-500/20 text-amber-300 border-amber-500/30"
        }`}
      >
        {cardStatus === "generated" || cardStatus === "active"
          ? lang === "fr"
            ? "Générée"
            : "Generated"
          : lang === "fr"
            ? "En attente"
            : "Pending"}
      </div>

      {/* Header band */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-1.5 animate-pulse">
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
          <div className="w-14 h-16 bg-slate-950/40 rounded border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
            {idPhoto ? (
              <img
                src={idPhoto}
                alt="ID Photo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="text-slate-600 text-[8px] uppercase tracking-wider font-mono">
                {isFr ? "Pas de Photo" : "No Photo"}
              </div>
            )}
          </div>

          {/* Student texts */}
          <div className="text-[10px] space-y-0.5">
            <span className="inline-block px-1 py-0.5 bg-blue-500/10 text-[6px] border border-blue-500/30 text-blue-400 font-bold tracking-widest uppercase rounded leading-none mb-0.5">
              {isFr ? "ÉTUDIANT VÉRIFIÉ" : "VERIFIED STUDENT"}
            </span>
            <p className="font-bold text-[10px] leading-tight break-all">
              {lastName.toUpperCase()} {firstName}
            </p>
            <p className="text-[8px] text-slate-400">
              {isFr ? "Classe" : "Class/Grade"}:{" "}
              <span className="text-slate-100 font-semibold">
                {targetClass ||
                  (isFr ? "Admission en cours" : "Admissions Pending")}
              </span>
            </p>
            <p className="text-[6px] text-slate-500 font-mono tracking-tight">
              {isFr ? "Matricule" : "Student ID"}: {studentId.toUpperCase()}
            </p>
          </div>
        </div>

        {/* Live Verification QR Code */}
        <div className="flex flex-col items-center gap-0.5 shrink-0 bg-white p-1 rounded border border-slate-700/30 shadow-sm">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(window.location.origin + "/verify/" + studentId)}`}
            alt="Scan to Verify"
            className="w-8 h-8"
          />
          <span className="text-[3px] text-slate-950 font-bold font-mono tracking-tighter uppercase">
            ONLINE VERIFY
          </span>
        </div>
      </div>

      {/* Dual Signatures Bar */}
      <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-1 text-[6px] my-0.5">
        {/* Student signature area */}
        <div className="flex flex-col justify-end text-left">
          <div className="border-b border-white/20 h-4 flex items-end justify-center relative">
            <span className="text-[4.5px] text-slate-500 font-mono absolute -bottom-[3px] bg-slate-800 px-1">
              {isFr ? "Signature de l'Élève" : "Student Signature"}
            </span>
          </div>
        </div>

        {/* Principal Signature Area */}
        <div className="flex flex-col justify-end text-right items-end">
          <div className="h-4 flex items-center justify-center relative w-full border-b border-white/20">
            <span className="text-[4.5px] text-slate-500 font-mono absolute -bottom-[3px] bg-slate-800 px-1">
              {isFr ? "Signature du Directeur" : "Principal Signature"}
            </span>
            {principalSignature && (
              <img
                src={principalSignature}
                alt="Principal Signature"
                className="max-h-4 object-contain brightness-125 select-none pointer-events-none absolute -top-1"
                referrerPolicy="no-referrer"
              />
            )}
          </div>
          <span className="text-[5.5px] text-blue-300 font-bold uppercase mt-1">
            {principalName}
          </span>
        </div>
      </div>

      {/* Footer expiry indicator */}
      <div className="flex items-center justify-between border-t border-white/10 pt-1 text-[6px] font-mono text-slate-400">
        <span>
          {isFr ? `Expire le : ${validUntil}` : `Expires: ${validUntil}`}
        </span>
      </div>
    </div>
  );
}
