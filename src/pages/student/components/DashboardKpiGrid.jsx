import { TrendingUp, Calendar, CreditCard, Activity } from "lucide-react";

export default function DashboardKpiGrid({ onOpenAttendance }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {/* 1. Course Progress */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded-full">
            +12%
          </span>
        </div>
        <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mt-4">
          Course Progress
        </p>
        <p className="text-2xl font-bold text-plum-950 mt-1">75%</p>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-3">
          <div className="h-full bg-plum-600 rounded-full w-3/4" />
        </div>
        <p className="text-[11px] text-slate-400 mt-2">
          12 of 16 modules completed
        </p>
      </div>

      {/* 2. Next Class */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
        <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
          <Calendar className="w-4 h-4" />
        </div>
        <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mt-4">
          Next Class
        </p>
        <p className="text-base font-bold text-plum-950 mt-1.5">
          Design critique
        </p>
        <p className="text-xs font-medium text-plum-600 mt-1">
          Tomorrow · 4:00 PM
        </p>
      </div>

      {/* 3. Fee Status */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs">
        <div className="w-9 h-9 rounded-xl bg-gold-400 text-plum-950 flex items-center justify-center">
          <CreditCard className="w-4 h-4" />
        </div>
        <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mt-4">
          Fee Status
        </p>
        <p className="text-base font-bold text-plum-950 mt-1.5">Paid in full</p>
        <button
          type="button"
          className="text-xs font-medium text-plum-600 hover:underline mt-1 cursor-pointer"
        >
          Receipt available
        </button>
      </div>

      {/* 4. Attendance */}
      <div
        onClick={onOpenAttendance}
        className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs hover:border-plum-600/30 transition-colors cursor-pointer"
      >
        <div className="w-9 h-9 rounded-xl bg-plum-900 text-white flex items-center justify-center">
          <Activity className="w-4 h-4" />
        </div>
        <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mt-4">
          Attendance
        </p>
        <p className="text-2xl font-bold text-plum-950 mt-1">94%</p>
        <p className="text-xs font-medium text-plum-600 mt-1">
          15 of 16 sessions attended
        </p>
      </div>
    </section>
  );
}