import React, { useState, useRef, useEffect } from "react";
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  Crop,
  Move,
  Check,
  RefreshCw,
} from "lucide-react";
export function ImageCropperModal({ imageSrc, onCrop, onClose, lang = "en" }) {
  const [zoom, setZoom] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imgSize, setImgSize] = useState({ baseW: 0, baseH: 0 });
  const [imgLoaded, setImgLoaded] = useState(false);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const isFr = lang === "fr";
  // Target crop box size: 280 x 320 px (7:8 aspect ratio for student IDs)
  const cropW = 280;
  const cropH = 320;
  // Initialize and calculate base cover-fit dimensions
  useEffect(() => {
    if (!imageSrc) return;
    setZoom(1.0);
    setRotation(0);
    setOffsetX(0);
    setOffsetY(0);
    setImgLoaded(false);
  }, [imageSrc]);
  const handleImageLoad = (e) => {
    const img = e.currentTarget;
    const naturalW = img.naturalWidth;
    const naturalH = img.naturalHeight;
    const containerRatio = cropW / cropH;
    const imageRatio = naturalW / naturalH;
    let baseW = cropW;
    let baseH = cropH;
    if (imageRatio > containerRatio) {
      // Image is wider than container, scale to height
      baseH = cropH;
      baseW = cropH * imageRatio;
    } else {
      // Image is taller than container, scale to width
      baseW = cropW;
      baseH = cropW / imageRatio;
    }
    setImgSize({ baseW, baseH });
    setImgLoaded(true);
  };
  // Dragging event handlers (Mouse & Touch)
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - offsetX, y: e.clientY - offsetY });
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setOffsetX(e.clientX - dragStart.x);
    setOffsetY(e.clientY - dragStart.y);
  };
  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      const touch = e.touches[0];
      setDragStart({ x: touch.clientX - offsetX, y: touch.clientY - offsetY });
    }
  };
  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setOffsetX(touch.clientX - dragStart.x);
    setOffsetY(touch.clientY - dragStart.y);
  };
  const handleReset = () => {
    setZoom(1.0);
    setRotation(0);
    setOffsetX(0);
    setOffsetY(0);
  };
  // Perform the cropping using HTML5 Canvas
  const handleCropSave = () => {
    if (!imageRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = cropW;
    canvas.height = cropH;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Enable high quality image scaling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    // Clear canvas
    ctx.clearRect(0, 0, cropW, cropH);
    // 1. Move origin to center of canvas crop box
    ctx.translate(cropW / 2, cropH / 2);
    // 2. Apply user drag translations
    ctx.translate(offsetX, offsetY);
    // 3. Apply rotation
    ctx.rotate((rotation * Math.PI) / 180);
    // 4. Apply zoom scale
    ctx.scale(zoom, zoom);
    // 5. Draw image centered
    const { baseW, baseH } = imgSize;
    ctx.drawImage(imageRef.current, -baseW / 2, -baseH / 2, baseW, baseH);
    // Export to Base64 JPEG with high quality
    try {
      const croppedBase64 = canvas.toDataURL("image/jpeg", 0.95);
      onCrop(croppedBase64);
    } catch (err) {
      console.error("Failed to crop image:", err);
    }
  };
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in print:hidden">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Crop className="w-5 h-5 text-blue-400 shrink-0" />
            <h3 className="font-bold text-sm uppercase tracking-wider">
              {isFr ? "Cadrer la Photo" : "Frame & Crop Photo"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Crop Stage Area */}
        <div className="flex-1 p-6 flex flex-col items-center justify-center bg-slate-950/50">
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-4 flex items-center gap-1.5 select-none">
            <Move className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            {isFr
              ? "Faites glisser pour déplacer et utilisez le zoom"
              : "Drag image to position & use slider to zoom"}
          </p>

          {/* The viewport container */}
          <div
            ref={containerRef}
            style={{ width: `${cropW}px`, height: `${cropH}px` }}
            className="relative bg-slate-950 rounded-xl overflow-hidden border-2 border-dashed border-blue-500/50 shadow-inner cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUpOrLeave}
          >
            <img
              ref={imageRef}
              src={imageSrc}
              alt="Source to crop"
              onLoad={handleImageLoad}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: imgSize.baseW ? `${imgSize.baseW}px` : "auto",
                height: imgSize.baseH ? `${imgSize.baseH}px` : "auto",
                transform: `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px) scale(${zoom}) rotate(${rotation}deg)`,
                transformOrigin: "center",
                maxWidth: "none",
                maxHeight: "none",
              }}
              className={`select-none pointer-events-none transition-opacity duration-200 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
              referrerPolicy="no-referrer"
              crossOrigin={imageSrc?.startsWith("data:") ? undefined : "anonymous"}
            />
            {/* Aspect Ratio Guide Box (Outer darkening, optional grid) */}
            <div className="absolute inset-0 pointer-events-none border border-white/20 rounded-xl flex items-center justify-center">
              {/* Overlay guides */}
              <div className="absolute inset-0 bg-slate-950/20"></div>
              {/* Subtle visual grid lines */}
              <div className="w-full h-[1px] bg-white/10 absolute top-1/3"></div>
              <div className="w-full h-[1px] bg-white/10 absolute top-2/3"></div>
              <div className="h-full w-[1px] bg-white/10 absolute left-1/3"></div>
              <div className="h-full w-[1px] bg-white/10 absolute left-2/3"></div>
            </div>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="px-6 py-5 bg-slate-900 border-t border-slate-800 space-y-4">
          {/* Zoom Control */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <ZoomOut className="w-3.5 h-3.5" /> Zoom
              </span>
              <span className="font-mono text-blue-400">
                {(zoom * 100).toFixed(0)}%
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setZoom((z) => Math.max(1.0, z - 0.1))}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <input
                type="range"
                min="1.0"
                max="3.0"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="flex-1 accent-blue-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
              <button
                onClick={() => setZoom((z) => Math.min(3.0, z + 0.1))}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Rotate Control */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <RotateCw className="w-3.5 h-3.5" />{" "}
                {isFr ? "Rotation" : "Rotation"}
              </span>
              <span className="font-mono text-blue-400">{rotation}°</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setRotation((r) => (r - 90 < -180 ? 180 : r - 90))
                }
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition cursor-pointer flex items-center gap-1"
                title="Rotate 90° CCW"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-[9px] font-bold">-90°</span>
              </button>
              <input
                type="range"
                min="-180"
                max="180"
                step="5"
                value={rotation}
                onChange={(e) => setRotation(parseInt(e.target.value))}
                className="flex-1 accent-blue-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
              <button
                onClick={() =>
                  setRotation((r) => (r + 90 > 180 ? -180 : r + 90))
                }
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition cursor-pointer flex items-center gap-1"
                title="Rotate 90° CW"
              >
                <RotateCw className="w-4 h-4" />
                <span className="text-[9px] font-bold">+90°</span>
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleReset}
              className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700"
            >
              <RefreshCw className="w-4 h-4" />
              {isFr ? "Réinitialiser" : "Reset"}
            </button>
            <button
              onClick={handleCropSave}
              className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/20 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              {isFr ? "Valider le cadre" : "Apply Crop"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
