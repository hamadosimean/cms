import React from "react";
export default function StatCard({
  title,
  value,
  icon,
  valueColorClass = "text-slate-800",
  iconContainerClass = "bg-slate-50 border-slate-100 text-slate-600",
}) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
      <div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
          {title}
        </span>
        <span
          className={`text-2xl sm:text-3xl font-bold font-mono leading-none mt-1 block ${valueColorClass}`}
        >
          {value}
        </span>
      </div>
      <div className={`p-3 rounded-xl border ${iconContainerClass}`}>
        {icon}
      </div>
    </div>
  );
}
