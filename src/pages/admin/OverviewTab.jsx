import React from "react";
import { Users, CheckCircle, X, Clock, GraduationCap } from "lucide-react";
import StatCard from "../../components/ui/StatCard";
import { useAppStore } from "../../store/useAppStore";
import { getTranslation } from "../../translations";
export default function OverviewTab({ lang }) {
  const { adminStats } = useAppStore();
  return (
    <>
      {/* 1. Bento Grid KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Applicants */}
        <StatCard
          title={getTranslation("totalApplicants", lang)}
          value={adminStats?.total_applicants ?? 0}
          icon={<Users className="w-5 h-5" />}
          valueColorClass="text-slate-800"
          iconContainerClass="bg-slate-50 border-slate-100 text-slate-600"
        />

        {/* Approved */}
        <StatCard
          title={getTranslation("approvedApps", lang)}
          value={adminStats?.approved ?? 0}
          icon={<CheckCircle className="w-5 h-5" />}
          valueColorClass="text-emerald-600"
          iconContainerClass="bg-emerald-50 border-emerald-100 text-emerald-600"
        />

        {/* Rejected */}
        <StatCard
          title={getTranslation("rejectedApps", lang)}
          value={adminStats?.rejected ?? 0}
          icon={<X className="w-5 h-5" />}
          valueColorClass="text-rose-600"
          iconContainerClass="bg-rose-50 border-rose-100 text-rose-600"
        />

        {/* Pending */}
        <StatCard
          title={getTranslation("pendingApps", lang)}
          value={adminStats?.pending ?? 0}
          icon={<Clock className="w-5 h-5 text-blue-500" />}
          valueColorClass="text-blue-600"
          iconContainerClass="bg-blue-50 border-blue-100 text-blue-500"
        />
      </div>

      {/* 2. Custom SVG Visual Analytics Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* SVG Chart 1: Status Funnel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold uppercase text-slate-800 tracking-wider mb-6 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-blue-600" />
            {getTranslation("adminMetrics", lang)}
          </h3>

          {/* Responsive custom vector SVG chart */}
          <div className="w-full flex items-center justify-center p-2">
            <svg viewBox="0 0 400 200" className="w-full max-w-md h-auto">
              {/* Grid lines */}
              <line
                x1="50"
                y1="20"
                x2="380"
                y2="20"
                stroke="#f1f5f9"
                strokeWidth="1"
              />
              <line
                x1="50"
                y1="65"
                x2="380"
                y2="65"
                stroke="#f1f5f9"
                strokeWidth="1"
              />
              <line
                x1="50"
                y1="110"
                x2="380"
                y2="110"
                stroke="#f1f5f9"
                strokeWidth="1"
              />
              <line
                x1="50"
                y1="150"
                x2="380"
                y2="150"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />

              {/* Y-Axis Labels */}
              <text
                x="35"
                y="24"
                className="text-[10px] font-mono fill-slate-400 text-right"
              >
                Max
              </text>
              <text
                x="35"
                y="85"
                className="text-[10px] font-mono fill-slate-400 text-right"
              >
                Mid
              </text>
              <text
                x="35"
                y="154"
                className="text-[10px] font-mono fill-slate-400 text-right"
              >
                0
              </text>

              {/* Calculations for reactive visual bars */}
              {(() => {
                const maxCount = Math.max(adminStats?.total_applicants || 1, 5);
                const calcHeight = (count) => (count / maxCount) * 120;
                const totalH = calcHeight(adminStats?.total_applicants || 0);
                const approvedH = calcHeight(adminStats?.approved || 0);
                const rejectedH = calcHeight(adminStats?.rejected || 0);
                const pendingH = calcHeight(adminStats?.pending || 0);
                return (
                  <>
                    {/* BAR 1: TOTAL */}
                    <rect
                      x="80"
                      y={150 - totalH}
                      width="40"
                      height={totalH}
                      fill="#334155"
                      rx="4"
                      className="transition-all duration-500 hover:fill-slate-600 cursor-pointer"
                    />
                    <text
                      x="100"
                      y={145 - totalH}
                      textAnchor="middle"
                      className="text-[11px] font-bold font-mono fill-slate-700"
                    >
                      {adminStats?.total_applicants || 0}
                    </text>
                    <text
                      x="100"
                      y="170"
                      textAnchor="middle"
                      className="text-[9px] font-bold uppercase fill-slate-400"
                    >
                      Total
                    </text>

                    {/* BAR 2: APPROVED */}
                    <rect
                      x="155"
                      y={150 - approvedH}
                      width="40"
                      height={approvedH}
                      fill="#10b981"
                      rx="4"
                      className="transition-all duration-500 hover:fill-emerald-600 cursor-pointer"
                    />
                    <text
                      x="175"
                      y={145 - approvedH}
                      textAnchor="middle"
                      className="text-[11px] font-bold font-mono fill-emerald-700"
                    >
                      {adminStats?.approved || 0}
                    </text>
                    <text
                      x="175"
                      y="170"
                      textAnchor="middle"
                      className="text-[9px] font-bold uppercase fill-slate-400"
                    >
                      Appr.
                    </text>

                    {/* BAR 3: REJECTED */}
                    <rect
                      x="230"
                      y={150 - rejectedH}
                      width="40"
                      height={rejectedH}
                      fill="#f43f5e"
                      rx="4"
                      className="transition-all duration-500 hover:fill-rose-600 cursor-pointer"
                    />
                    <text
                      x="250"
                      y={145 - rejectedH}
                      textAnchor="middle"
                      className="text-[11px] font-bold font-mono fill-rose-700"
                    >
                      {adminStats?.rejected || 0}
                    </text>
                    <text
                      x="250"
                      y="170"
                      textAnchor="middle"
                      className="text-[9px] font-bold uppercase fill-slate-400"
                    >
                      Rej.
                    </text>

                    {/* BAR 4: PENDING */}
                    <rect
                      x="305"
                      y={150 - pendingH}
                      width="40"
                      height={pendingH}
                      fill="#3b82f6"
                      rx="4"
                      className="transition-all duration-500 hover:fill-blue-600 cursor-pointer"
                    />
                    <text
                      x="325"
                      y={145 - pendingH}
                      textAnchor="middle"
                      className="text-[11px] font-bold font-mono fill-blue-700"
                    >
                      {adminStats?.pending || 0}
                    </text>
                    <text
                      x="325"
                      y="170"
                      textAnchor="middle"
                      className="text-[9px] font-bold uppercase fill-slate-400"
                    >
                      Pend.
                    </text>
                  </>
                );
              })()}
            </svg>
          </div>
        </div>

        {/* SVG Chart 2: Capacity allocations */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold uppercase text-slate-800 tracking-wider mb-6 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            {getTranslation("classCapacityTitle", lang)}
          </h3>

          {/* Horizontal progress capacity bars */}
          <div className="space-y-4 pt-2">
            {adminStats?.class_capacities.map((item) => {
              const percent = Math.min(
                Math.round((item.count / item.capacity) * 100),
                100,
              );
              return (
                <div key={item.class_name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span className="font-mono">{item.class_name}</span>
                    <span className="font-mono">
                      {item.count} / {item.capacity} students{" "}
                      <span className="text-slate-400">({percent}%)</span>
                    </span>
                  </div>
                  {/* Outer Track */}
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 relative">
                    <div
                      style={{ width: `${percent}%` }}
                      className={`h-full rounded-full transition-all duration-500 ${percent > 85 ? "bg-rose-500" : percent > 50 ? "bg-blue-600" : "bg-slate-700"}`}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
