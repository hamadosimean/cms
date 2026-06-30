import React from "react";
import { Menu, Search, LogIn, LogOut } from "lucide-react";
import { getTranslation } from "../../translations";
import logo from "../../assets/images/cms_logo.png";
export default function Header({
  user,
  lang,
  schoolInfo,
  showAuth,
  setShowAuth,
  setIsLoginView,
  mobileSidebarOpen,
  setMobileSidebarOpen,
  setShowCommandPalette,
  toggleLanguage,
  handleLogout,
}) {
  return (
    <header className="sticky top-0 z-40 bg-white text-slate-800 shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 min-w-0">
          {/* Mobile Sidebar Toggle */}
          {user && (
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="md:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition mr-0.5 cursor-pointer shrink-0"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {/* Logo Brand */}
          <div
            onClick={() => !user && setShowAuth(false)}
            className={`flex items-center gap-2 sm:gap-3 min-w-0 ${!user ? "cursor-pointer hover:opacity-90 select-none" : ""}`}
          >
            {schoolInfo?.logo_url ? (
              <img
                src={schoolInfo.logo_url}
                alt="School Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-lg shrink-0"
              />
            ) : (
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm shrink-0">
                CMS
              </div>
            )}
            <div className="min-w-0">
              <h1 className="font-sans font-bold text-xs sm:text-base leading-tight tracking-tight uppercase text-slate-800 truncate">
                {schoolInfo?.name || "College Management System"}
              </h1>
              <p className="text-[9px] text-slate-400 font-mono tracking-widest uppercase hidden sm:block truncate max-w-[200px] lg:max-w-none">
                {getTranslation("appName", lang)}
              </p>
            </div>
          </div>
        </div>

        {/* Action Tools */}
        <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
          {user && (user.role === "admin" || user.role === "principal") && (
            <button
              onClick={() => setShowCommandPalette(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-400 bg-slate-50 text-slate-400 hover:text-slate-600 transition text-xs font-semibold select-none cursor-pointer min-h-[34px]"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>{lang === "fr" ? "Rechercher..." : "Search..."}</span>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[9px] font-mono font-bold text-slate-400">
                ⌘K
              </kbd>
            </button>
          )}

          {/* Language Toggle */}
          <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 shrink-0">
            <button
              id="lang_en"
              onClick={() => lang !== "en" && toggleLanguage()}
              className={`px-1.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold rounded uppercase transition duration-150 ${lang === "en" ? "bg-white shadow-sm text-blue-700 font-bold" : "text-slate-500 hover:text-slate-700"}`}
            >
              EN
            </button>
            <button
              id="lang_fr"
              onClick={() => lang !== "fr" && toggleLanguage()}
              className={`px-1.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold rounded uppercase transition duration-150 ${lang === "fr" ? "bg-white shadow-sm text-blue-700 font-bold" : "text-slate-500 hover:text-slate-700"}`}
            >
              FR
            </button>
          </div>

          <div className="hidden sm:block h-6 w-px bg-slate-200"></div>

          {/* Home / Login Portal Buttons when not authenticated */}
          {!user && showAuth && (
            <button
              onClick={() => setShowAuth(false)}
              className="px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border border-slate-200 text-slate-600 hover:bg-slate-50 transition cursor-pointer"
            >
              {lang === "fr" ? "Accueil" : "Home"}
            </button>
          )}
          {!user && !showAuth && (
            <button
              onClick={() => {
                setShowAuth(true);
                setIsLoginView(true);
              }}
              className="px-2 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {lang === "fr" ? "Connexion" : "Portal Login"}
              </span>
            </button>
          )}

          {/* Authenticated user badge */}
          {user && (
            <div className="hidden sm:flex items-center gap-3 pl-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold">
                {user.first_name[0]}
                {user.last_name[0]}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-800 leading-tight">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-[10px] text-slate-500 font-mono capitalize leading-none">
                  {user.role}
                </p>
              </div>
            </div>
          )}

          {/* Logout */}
          {user && (
            <button
              id="btn_logout"
              onClick={handleLogout}
              className="px-2 sm:px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition duration-200 touch-manipulation cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {getTranslation("logout", lang)}
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
