import React from 'react';
import { X, School, FileText, UserIcon, BookOpen, Clock, Users, ChevronDown, Shield, Settings, GraduationCap } from 'lucide-react';
export default function Sidebar({ user, lang, activeSidebarTab, setActiveSidebarTab, mobileSidebarOpen, setMobileSidebarOpen, adminUserMenuOpen, setAdminUserMenuOpen }) {
    return (<>
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-slate-100 flex flex-col justify-between p-6 transform transition-transform duration-300 md:relative md:translate-x-0 md:bg-white md:text-slate-800 md:p-4 md:w-60 md:shrink-0 md:border-r md:border-slate-200/80 md:sticky md:top-24 rounded-2xl md:shadow-none shadow-2xl md:h-[calc(100vh-8rem)]
        ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header (only for mobile overlay) */}
        <div className="flex items-center justify-between md:hidden border-b border-slate-800 pb-4 mb-4">
          <span className="font-bold text-sm tracking-wider uppercase text-slate-300">Navigation</span>
          <button onClick={() => setMobileSidebarOpen(false)} className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5"/>
          </button>
        </div>

        {/* Sidebar Menu Items */}
        <div className="space-y-1.5 w-full flex-1">
          {/* Header for role */}
          <div className="px-3 py-2 text-[10px] font-bold text-slate-400 md:text-slate-500 uppercase tracking-widest border-b border-slate-800 md:border-slate-100 mb-2">
            {user.role === 'principal' ? (lang === 'fr' ? 'Panel du Directeur' : 'Principal Panel') : user.role === 'admin' ? (lang === 'fr' ? 'Admin Système' : 'System Admin') : user.role === 'teacher' ? (lang === 'fr' ? 'Enseignant' : 'Teacher Portal') : (lang === 'fr' ? 'Étudiant' : 'Student Portal')}
          </div>

          {(user.role === 'admin' || user.role === 'principal') && (<>
              {[
                { id: 'overview', label: lang === 'fr' ? 'Aperçu' : 'Institution Overview', icon: School },
                { id: 'admissions', label: lang === 'fr' ? 'Sélections' : 'Screening Queue', icon: FileText },
                { id: 'id_cards', label: lang === 'fr' ? 'Cartes d\'identité' : 'Student ID Cards', icon: UserIcon },
                { id: 'classes', label: lang === 'fr' ? 'Gestion des Classes' : 'Classes & Sections', icon: BookOpen },
                { id: 'audit_logs', label: lang === 'fr' ? 'Logs d\'Audit' : 'System Audit Logs', icon: Clock },
            ].map((item) => {
                const Icon = item.icon;
                return (<button key={item.id} onClick={() => {
                        setActiveSidebarTab(item.id);
                        setMobileSidebarOpen(false);
                    }} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeSidebarTab === item.id
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                        : 'text-slate-400 hover:text-slate-100 md:text-slate-600 md:hover:text-slate-900 md:hover:bg-slate-50'}`}>
                    <Icon className="w-4 h-4 shrink-0"/>
                    <span className="truncate">{item.label}</span>
                  </button>);
            })}

              {/* Collapsible User Directory Submenu */}
              <div className="space-y-1">
                <button onClick={() => {
                setAdminUserMenuOpen(!adminUserMenuOpen);
            }} className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeSidebarTab === 'students_dir' || activeSidebarTab === 'teachers'
                ? 'bg-slate-800 text-white md:bg-slate-100 md:text-slate-900'
                : 'text-slate-400 hover:text-slate-100 md:text-slate-600 md:hover:text-slate-900 md:hover:bg-slate-50'}`}>
                  <div className="flex items-center gap-3 truncate">
                    <Users className="w-4 h-4 shrink-0 text-blue-600"/>
                    <span className="truncate">{lang === 'fr' ? 'Utilisateurs' : 'User Menu'}</span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${adminUserMenuOpen ? 'rotate-180' : ''}`}/>
                </button>

                {adminUserMenuOpen && (<div className="pl-4 space-y-1 mt-1 border-l border-slate-800 md:border-slate-200 ml-4">
                    <button onClick={() => {
                    setActiveSidebarTab('students_dir');
                    setMobileSidebarOpen(false);
                }} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeSidebarTab === 'students_dir'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 md:text-slate-600 md:hover:text-slate-900 hover:bg-slate-800 md:hover:bg-slate-50'}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      <span>{lang === 'fr' ? 'Étudiants' : 'Students'}</span>
                    </button>
                    <button onClick={() => {
                    setActiveSidebarTab('teachers');
                    setMobileSidebarOpen(false);
                }} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeSidebarTab === 'teachers'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 md:text-slate-600 md:hover:text-slate-900 hover:bg-slate-800 md:hover:bg-slate-50'}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      <span>{lang === 'fr' ? 'Enseignants' : 'Teachers'}</span>
                    </button>
                  </div>)}
              </div>

              {[
                { id: 'admins', label: lang === 'fr' ? 'Administrateurs' : 'Admissions Admin', icon: Shield },
                { id: 'profile', label: lang === 'fr' ? 'Mon Profil' : 'My Profile', icon: Settings },
            ].map((item) => {
                const Icon = item.icon;
                return (<button key={item.id} onClick={() => {
                        setActiveSidebarTab(item.id);
                        setMobileSidebarOpen(false);
                    }} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeSidebarTab === item.id
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                        : 'text-slate-400 hover:text-slate-100 md:text-slate-600 md:hover:text-slate-900 md:hover:bg-slate-50'}`}>
                    <Icon className="w-4 h-4 shrink-0"/>
                    <span className="truncate">{item.label}</span>
                  </button>);
            })}
            </>)}

          {user.role === 'teacher' && [
            { id: 'onboarding', label: lang === 'fr' ? 'Profil & Diplômes' : 'Profile & Credentials', icon: UserIcon },
            { id: 'allocations', label: lang === 'fr' ? 'Affectations' : 'My Allocations', icon: BookOpen },
            { id: 'profile', label: lang === 'fr' ? 'Mon Profil' : 'My Profile', icon: Settings },
        ].map((item) => {
            const Icon = item.icon;
            return (<button key={item.id} onClick={() => {
                    setActiveSidebarTab(item.id);
                    setMobileSidebarOpen(false);
                }} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeSidebarTab === item.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                    : 'text-slate-400 hover:text-slate-100 md:text-slate-600 md:hover:text-slate-900 md:hover:bg-slate-50'}`}>
                <Icon className="w-4 h-4 shrink-0"/>
                <span className="truncate">{item.label}</span>
              </button>);
        })}

          {user.role === 'student' && [
            { id: 'application', label: lang === 'fr' ? 'Candidature' : 'Admission Application', icon: FileText },
            { id: 'id_card_request', label: lang === 'fr' ? 'Carte d\'Étudiant' : 'Digital ID Card', icon: GraduationCap },
            { id: 'profile', label: lang === 'fr' ? 'Mon Profil' : 'My Profile', icon: Settings },
        ].map((item) => {
            const Icon = item.icon;
            return (<button key={item.id} onClick={() => {
                    setActiveSidebarTab(item.id);
                    setMobileSidebarOpen(false);
                }} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeSidebarTab === item.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                    : 'text-slate-400 hover:text-slate-100 md:text-slate-600 md:hover:text-slate-900 md:hover:bg-slate-50'}`}>
                <Icon className="w-4 h-4 shrink-0"/>
                <span className="truncate">{item.label}</span>
              </button>);
        })}

        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-800 md:border-slate-200/80 pt-4 mt-auto">
          <div className="p-3 bg-slate-800/50 md:bg-slate-50 rounded-xl border border-slate-800 md:border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
              {user.first_name[0]}{user.last_name[0]}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-200 md:text-slate-800 truncate leading-none">{user.first_name} {user.last_name}</p>
              <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wide mt-0.5 truncate leading-none">{user.role}</p>
            </div>
          </div>
        </div>

      </aside>

      {/* Mobile backdrop for sidebar menu */}
      {mobileSidebarOpen && (<div onClick={() => setMobileSidebarOpen(false)} className="fixed inset-0 z-20 bg-slate-900/40 backdrop-blur-sm md:hidden"/>)}
    </>);
}
