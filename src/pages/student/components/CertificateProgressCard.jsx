import { Award } from "lucide-react";

export default function CertificateProgressCard({ onViewRequirements }) {
  return (
    <div className="bg-plum-900 rounded-3xl p-6 text-white flex flex-col justify-between shadow-sm">
      <div>
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-xl bg-gold-400 text-plum-950 flex items-center justify-center">
            <Award className="w-4 h-4" />
          </div>
          <span className="bg-gold-400 text-plum-950 text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full">
            Almost There
          </span>
        </div>

        <h3 className="text-xl font-bold leading-snug mt-5">
          Your certificate is within reach.
        </h3>
        <p className="text-xs text-purple-200/80 mt-2 leading-relaxed">
          Complete 4 more modules and submit your capstone to unlock it.
        </p>
      </div>

      <div className="mt-6">
        <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
          <div className="h-full bg-gold-400 rounded-full w-3/4" />
        </div>
        <div className="flex items-center justify-between text-[11px] text-purple-200/80 mt-2">
          <span>12 completed</span>
          <span>4 remaining</span>
        </div>

        <button
          type="button"
          onClick={onViewRequirements}
          className="w-full mt-5 bg-gold-400 hover:bg-gold-500 text-plum-950 text-xs font-bold py-3 rounded-full transition-colors cursor-pointer"
        >
          View requirements
        </button>
      </div>
    </div>
  );
}