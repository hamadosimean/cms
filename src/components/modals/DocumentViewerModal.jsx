import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, Download, Printer } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { getTranslation } from '../../translations';

export const DocumentViewerModal = () => {
  const { viewingDocument, setViewingDocument, lang } = useAppStore();

  if (!viewingDocument) return null;

  const pdfUrl = `/api/documents/preview?filename=${encodeURIComponent(viewingDocument)}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
        onClick={() => setViewingDocument(null)}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[96vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">
                  {viewingDocument}
                </h3>
                <p className="text-[10px] text-slate-500 font-mono">
                  Secure Document Viewer
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a 
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 hover:bg-slate-200 text-slate-500 rounded-lg transition-colors cursor-pointer" 
                title="Print / Open"
              >
                <Printer className="w-4 h-4" />
              </a>
              <a 
                href={pdfUrl}
                download={viewingDocument}
                className="p-2 hover:bg-slate-200 text-slate-500 rounded-lg transition-colors cursor-pointer" 
                title="Download"
              >
                <Download className="w-4 h-4" />
              </a>
              <div className="w-px h-6 bg-slate-300 mx-1"></div>
              <button
                onClick={() => setViewingDocument(null)}
                className="p-2 hover:bg-rose-100 hover:text-rose-600 text-slate-400 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Viewer Content */}
          <div className="flex-1 bg-slate-100/50 p-4 h-[80vh] flex justify-center">
            <iframe
              src={`${pdfUrl}#toolbar=0`}
              title={viewingDocument}
              className="w-full h-full bg-white shadow-sm border border-slate-200 rounded"
            />
          </div>
          
          {/* Footer Info */}
          <div className="px-6 py-3 bg-white border-t border-slate-100 text-[10px] text-slate-400 font-mono text-center">
            Secured Student Record Archive • College LA SALE • Verified Preview
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
