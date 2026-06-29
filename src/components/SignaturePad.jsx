import React, { useRef, useState, useEffect } from 'react';
import { PenTool, Trash2, Check, RefreshCw } from 'lucide-react';
export const SignaturePad = ({ onSave, initialSignatureUrl, lang }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasDrawn, setHasDrawn] = useState(false);
    const [savedSignature, setSavedSignature] = useState(initialSignatureUrl || null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        if (initialSignatureUrl) {
            setSavedSignature(initialSignatureUrl);
        }
    }, [initialSignatureUrl]);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.lineWidth = 2.5;
                ctx.strokeStyle = '#0f172a'; // Deep slate ink
            }
        }
    }, []);
    const getCoordinates = (e) => {
        const canvas = canvasRef.current;
        if (!canvas)
            return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        if ('touches' in e) {
            if (e.touches.length === 0)
                return { x: 0, y: 0 };
            const touch = e.touches[0];
            return {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
            };
        }
        else {
            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        }
    };
    const startDrawing = (e) => {
        e.preventDefault();
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        const { x, y } = getCoordinates(e);
        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
        setHasDrawn(true);
        setSuccess(false);
    };
    const draw = (e) => {
        if (!isDrawing)
            return;
        e.preventDefault();
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        const { x, y } = getCoordinates(e);
        ctx.lineTo(x, y);
        ctx.stroke();
    };
    const stopDrawing = () => {
        setIsDrawing(false);
    };
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setHasDrawn(false);
        setSuccess(false);
    };
    const saveSignature = async () => {
        const canvas = canvasRef.current;
        if (!canvas || !hasDrawn)
            return;
        try {
            setLoading(true);
            const dataUrl = canvas.toDataURL('image/png');
            await onSave(dataUrl);
            setSavedSignature(dataUrl);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }
        catch (err) {
            console.error('Failed to save signature', err);
        }
        finally {
            setLoading(false);
        }
    };
    return (<div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <PenTool className="w-5 h-5 text-blue-600"/>
          <div>
            <h4 className="font-bold text-sm text-slate-800">
              {lang === 'fr' ? 'Signature Numérique du Directeur' : "Principal's Digital Signature"}
            </h4>
            <p className="text-[10px] text-slate-400 font-mono">
              {lang === 'fr' ? 'Sera imprimée sur toutes les cartes d\'étudiant' : 'Will be printed on all student ID cards'}
            </p>
          </div>
        </div>
        {savedSignature && (<span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-mono rounded-full flex items-center gap-1 border border-emerald-100">
            <Check className="w-3 h-3"/>
            {lang === 'fr' ? 'Signature Enregistrée' : 'Active Signature'}
          </span>)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Draw Area */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            {lang === 'fr' ? 'Dessinez votre signature' : 'Draw your signature below'}
          </span>
          <div className="relative border-2 border-dashed border-slate-200 hover:border-blue-300 rounded-xl overflow-hidden bg-slate-50 transition">
            <canvas ref={canvasRef} width={320} height={120} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing} className="w-full h-[120px] cursor-crosshair block touch-none"/>
            {/* Subtle guideline for signing */}
            <div className="absolute left-6 right-6 bottom-6 border-b border-slate-300 pointer-events-none opacity-50 border-dashed"/>
            
            {!hasDrawn && (<div className="absolute inset-0 flex items-center justify-center pointer-events-none text-[11px] text-slate-400 font-medium">
                {lang === 'fr' ? 'Signez ici avec la souris ou l\'écran tactile' : 'Sign here with mouse or touch screen'}
              </div>)}
          </div>

          <div className="flex items-center gap-2 justify-end">
            <button onClick={clearCanvas} disabled={!hasDrawn || loading} className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 disabled:opacity-40 transition flex items-center gap-1.5 cursor-pointer min-h-[38px]">
              <Trash2 className="w-3.5 h-3.5"/>
              {lang === 'fr' ? 'Effacer' : 'Clear'}
            </button>
            <button onClick={saveSignature} disabled={!hasDrawn || loading} className="px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 transition flex items-center gap-1.5 cursor-pointer min-h-[38px]">
              {loading ? (<RefreshCw className="w-3.5 h-3.5 animate-spin"/>) : success ? (<Check className="w-3.5 h-3.5 text-white"/>) : (<PenTool className="w-3.5 h-3.5"/>)}
              {success ? (lang === 'fr' ? 'Enregistré !' : 'Saved!') : (lang === 'fr' ? 'Enregistrer' : 'Save Signature')}
            </button>
          </div>
        </div>

        {/* Current Active Preview */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            {lang === 'fr' ? 'Signature active sur le serveur' : 'Active Server Signature Preview'}
          </span>
          <div className="border border-slate-100 bg-slate-50/50 rounded-xl p-4 h-[120px] flex items-center justify-center relative">
            {savedSignature ? (<img src={savedSignature} alt="Principal Signature" className="max-h-full max-w-full object-contain filter drop-shadow-sm"/>) : (<div className="text-center space-y-1">
                <p className="text-slate-400 text-xs italic font-medium">
                  {lang === 'fr' ? 'Aucune signature dessinée' : 'No active custom signature found'}
                </p>
                <p className="text-[10px] text-slate-400">
                  {lang === 'fr' ? 'Par défaut, le nom textuel sera affiché.' : 'Defaulting to typographic representation.'}
                </p>
              </div>)}
          </div>
          <p className="text-[10px] text-slate-400 leading-normal">
            {lang === 'fr'
            ? "Cette signature sera encodée en format de sécurité et ajoutée à la génération de toutes les cartes d'étudiant approuvées au format PDF."
            : "This signature is dynamically compiled onto the official student identification PDF layout for institution credentials."}
          </p>
        </div>
      </div>
    </div>);
};
