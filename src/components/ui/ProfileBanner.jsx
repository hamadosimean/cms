import React from "react";
import { GraduationCap, Users, BookOpen } from "lucide-react";
import { getTranslation } from "../../translations";
export default function ProfileBanner({ user, lang }) {
  return (
    <div className="bg-slate-900 rounded-2xl shadow-xl text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden border border-blue-500/10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="flex items-center gap-4 text-left">
        <div className="w-16 h-16 bg-blue-500/10 rounded-2xl border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
          {user.role === "student" ? (
            <GraduationCap className="w-9 h-9" />
          ) : user.role === "teacher" ? (
            <Users className="w-9 h-9" />
          ) : (
            <BookOpen className="w-9 h-9" />
          )}
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {user.first_name} {user.last_name}
          </h3>
          <p className="text-xs text-slate-400 font-mono tracking-wider mt-0.5 uppercase flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            {user.role === "student"
              ? getTranslation("roleStudent", lang)
              : user.role === "teacher"
                ? getTranslation("roleTeacher", lang)
                : getTranslation("roleAdmin", lang)}
            {" • "}
            <span className="text-blue-400 font-semibold">{user.email}</span>
          </p>
        </div>
      </div>
      <div className="text-left sm:text-right font-mono text-[11px] text-slate-400">
        <p>MATRICULE: {user.id.toUpperCase()}</p>
        <p className="mt-1">PREF: {user.preferred_language.toUpperCase()}</p>
      </div>
    </div>
  );
}
