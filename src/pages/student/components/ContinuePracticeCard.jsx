import { PenTool } from "lucide-react";

export default function ContinuePracticeCard({ onViewCourse, onResume }) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-2xs flex flex-col justify-between">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold tracking-widest text-plum-600 uppercase">
            Continue Your Practice
          </p>
          <h3 className="text-xl font-bold text-plum-950 mt-1">
            Keep your momentum going
          </h3>
        </div>
        <button
          type="button"
          onClick={onViewCourse}
          className="text-xs font-semibold text-plum-950 border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-full transition-colors shrink-0 cursor-pointer"
        >
          View course
        </button>
      </div>

      <div className="bg-surface-card rounded-2xl p-5 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-plum-600 text-white flex items-center justify-center shrink-0">
            <PenTool className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-wider text-plum-600 uppercase">
              Module 13 · 24 Minutes
            </p>
            <h4 className="text-base font-bold text-plum-950 mt-0.5">
              Designing for edge cases
            </h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-md">
              Learn how to find the moments that make a product feel
              considered.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onResume}
          className="bg-plum-900 hover:bg-plum-800 text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors self-start sm:self-center shrink-0 cursor-pointer"
        >
          Resume
        </button>
      </div>
    </div>
  );
}