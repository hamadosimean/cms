import React from 'react';
import { motion } from 'motion/react';
import { Search, X, Info, GraduationCap } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { useAppHandlers } from '../../hooks/useAppHandlers';

export const CommandPalette = () => {
  const store = useAppStore();
  const handlers = useAppHandlers();

  const {
    lang,
    showCommandPalette,
    setShowCommandPalette,
    commandPaletteQuery,
    setCommandPaletteQuery
  } = store;

  const {
    getFilteredCommandPaletteItems
  } = handlers;

  if (!showCommandPalette) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-start justify-center p-4 pt-[15vh]">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={() => setShowCommandPalette(false)} />
      
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative z-10 flex flex-col text-left"
      >
        {/* Input box */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder={lang === 'fr' ? 'Rechercher des élèves, profs ou actions... (Cmd+K)' : 'Search students, teachers, or actions... (Cmd+K)'}
            value={commandPaletteQuery}
            onChange={(e) => setCommandPaletteQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-slate-800 text-sm placeholder-slate-400 min-h-[30px]"
          />
          <button
            onClick={() => setShowCommandPalette(false)}
            className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-600 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results list */}
        <div className="p-2 max-h-96 overflow-y-auto space-y-1">
          {getFilteredCommandPaletteItems().length === 0 ? (
            <div className="text-center py-8 text-slate-400 space-y-1">
              <Info className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs italic font-medium">
                {lang === 'fr' ? 'Aucun résultat correspondant.' : 'No matching records or commands found.'}
              </p>
            </div>
          ) : (
            getFilteredCommandPaletteItems().map((item, idx) => {
              const Icon = item.icon || GraduationCap;
              return (
                <button
                  key={item.id + '_' + idx}
                  onClick={item.action}
                  className="w-full text-left flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-150 transition cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition">
                        {item.label}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  {item.type === 'action' ? (
                    <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 bg-slate-100 text-slate-500 rounded font-mono group-hover:bg-blue-50 group-hover:text-blue-600">
                      Action
                    </span>
                  ) : (
                    <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-mono">
                      {item.type}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Keyboard guide footer */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex justify-between text-[9px] text-slate-400 font-medium select-none">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded shadow-sm">Esc</kbd> {lang === 'fr' ? 'Fermer' : 'Close'}</span>
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded shadow-sm">↵ Enter</kbd> {lang === 'fr' ? 'Sélectionner' : 'Select'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 font-mono rounded">Shortcut: N</span>
            <span>{lang === 'fr' ? 'Nouveau dossier' : 'Add new record'}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
