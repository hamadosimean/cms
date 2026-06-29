import React from "react";
import { School, AlertTriangle, CheckCircle } from "lucide-react";
import { getTranslation } from "../translations";
export default function Auth({
  isLoginView,
  setIsLoginView,
  authError,
  setAuthError,
  authSuccess,
  setAuthSuccess,
  lang,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  authRole,
  setAuthRole,
  authLang,
  setAuthLang,
  handleAuthSubmit,
  handleQuickLogin,
}) {
  return (
    <div className="max-w-md mx-auto my-12 bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden">
      <div className="px-8 pt-8 pb-6 bg-slate-900 text-white text-center relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mx-auto mb-4 border border-blue-500/20">
          <School className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold uppercase tracking-tight">
          {isLoginView
            ? getTranslation("login", lang)
            : getTranslation("register", lang)}
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          {isLoginView
            ? "Welcome to our elite enrollment engine"
            : "Onboard your academic records with ease"}
        </p>
      </div>

      <div className="p-8">
        {authError && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{authError}</span>
          </div>
        )}
        {authSuccess && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{authSuccess}</span>
          </div>
        )}

        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {/* Registration fields */}
          {!isLoginView && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  {getTranslation("firstName", lang)}{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  {getTranslation("lastName", lang)}{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"
                />
              </div>
            </div>
          )}

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
              {getTranslation("emailAddress", lang)}{" "}
              <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@school.edu"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
              {getTranslation("password", lang)}{" "}
              <span className="text-rose-500">*</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"
            />
            {isLoginView && (
              <p className="text-[10px] text-slate-400 mt-1">
                {lang === "fr"
                  ? 'Le mot de passe par défaut pour tous les comptes de démonstration est "password"'
                  : 'Default password for all pre-seeded accounts is "password"'}
              </p>
            )}
          </div>

          {/* Role and Preferred Language Selection for Register */}
          {!isLoginView && (
            <div className="space-y-4 pt-2 border-t border-slate-100 mt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                  {getTranslation("selectRole", lang)}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["student", "teacher"].map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setAuthRole(r)}
                      className={`py-2 px-1 text-[11px] font-bold uppercase tracking-wider rounded-lg border transition duration-150 ${
                        authRole === r
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {r === "student"
                        ? getTranslation("student", lang)
                        : getTranslation("teacher", lang)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                  {getTranslation("preferredLang", lang)}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAuthLang("en")}
                    className={`py-2 px-3 text-xs font-bold uppercase tracking-wider rounded-lg border transition ${
                      authLang === "en"
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    English 🇬🇧
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthLang("fr")}
                    className={`py-2 px-3 text-xs font-bold uppercase tracking-wider rounded-lg border transition ${
                      authLang === "fr"
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Français 🇫🇷
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white text-xs uppercase tracking-widest font-bold py-3.5 px-4 rounded-xl transition duration-200 touch-manipulation shadow-md"
          >
            {isLoginView
              ? getTranslation("login", lang)
              : getTranslation("register", lang)}
          </button>
        </form>

        {/* View Toggle */}
        <div className="text-center mt-6 pt-6 border-t border-slate-100">
          <button
            onClick={() => {
              setIsLoginView(!isLoginView);
              setAuthError("");
              setAuthSuccess("");
            }}
            className="text-xs text-slate-500 hover:text-blue-600 hover:underline font-semibold"
          >
            {isLoginView
              ? getTranslation("noAccount", lang)
              : getTranslation("alreadyAccount", lang)}
          </button>
        </div>

        {/* --- PRE-SEEDED QUICK DEMO LOGIN CONTROLS --- */}
        {/* <div className="mt-8 pt-6 border-t border-dashed border-slate-200 bg-slate-50 -mx-8 -mb-8 p-8 rounded-b-2xl">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
            Pre-seeded Demonstration Accounts
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => handleQuickLogin("student")}
              className="p-2 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-left transition duration-200 group text-xs shadow-sm"
            >
              <span className="block font-bold text-[10px] uppercase text-slate-400 group-hover:text-blue-600 transition leading-none">
                Student
              </span>
              <span className="block font-mono text-[9px] mt-1 text-slate-600 truncate">
                I. Sawadogo
              </span>
            </button>
            <button
              onClick={() => handleQuickLogin("teacher")}
              className="p-2 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-left transition duration-200 group text-xs shadow-sm"
            >
              <span className="block font-bold text-[10px] uppercase text-slate-400 group-hover:text-blue-600 transition leading-none">
                Teacher
              </span>
              <span className="block font-mono text-[9px] mt-1 text-slate-600 truncate">
                S. Barro
              </span>
            </button>
            <button
              onClick={() => handleQuickLogin("admin")}
              className="p-2 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-left transition duration-200 group text-xs shadow-sm"
            >
              <span className="block font-bold text-[10px] uppercase text-slate-400 group-hover:text-blue-600 transition leading-none">
                Admin
              </span>
              <span className="block font-mono text-[9px] mt-1 text-slate-600 truncate">
                S. Ouédraogo
              </span>
            </button>
            <button
              onClick={() => handleQuickLogin("principal")}
              className="p-2 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-left transition duration-200 group text-xs shadow-sm"
            >
              <span className="block font-bold text-[10px] uppercase text-slate-400 group-hover:text-blue-600 transition leading-none">
                Principal
              </span>
              <span className="block font-mono text-[9px] mt-1 text-slate-600 truncate">
                A. Sana
              </span>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}
