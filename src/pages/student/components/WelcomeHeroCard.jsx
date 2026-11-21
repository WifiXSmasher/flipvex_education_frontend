import { Sparkles, ArrowRight, Calendar } from "lucide-react";

export default function WelcomeHeroCard({ onContinue, onViewCourse }) {
  return (
    <section className="bg-plum-900 rounded-3xl p-8 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-sm">
      {/* Left Content */}
      <div className="max-w-xl">
        <span className="inline-flex items-center gap-1.5 bg-gold-400 text-plum-950 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full">
          <Sparkles className="w-3 h-3" />
          Your Learning Studio
        </span>

        <p className="text-[11px] font-semibold tracking-widest text-purple-200/70 uppercase mt-5">
          Tuesday, April 14
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-1">
          Good morning, Maya.
        </h2>
        <p className="text-sm text-purple-200/80 mt-2.5 leading-relaxed">
          Your design practice is compounding beautifully. One focused session
          today keeps your certificate timeline on track.
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-6">
          <button
            type="button"
            onClick={onContinue}
            className="inline-flex items-center gap-2 bg-gold-400 hover:bg-gold-500 text-plum-950 text-xs font-bold px-5 py-3 rounded-full transition-colors cursor-pointer"
          >
            <span>Continue learning</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onViewCourse}
            className="inline-flex items-center justify-center border border-white/25 hover:bg-white/10 text-white text-xs font-semibold px-5 py-3 rounded-full transition-colors cursor-pointer"
          >
            View course
          </button>
        </div>
      </div>

      {/* Right Embedded Session Card */}
      <div className="bg-white text-slate-900 rounded-2xl p-5 w-full lg:w-80 shrink-0 shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            This Week
          </span>
          <Calendar className="w-4 h-4 text-plum-600" />
        </div>
        <h3 className="text-lg font-bold text-plum-950 mt-2">
          Design critique
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">Tomorrow · 4:00 PM</p>

        <div className="border-t border-slate-100 mt-4 pt-3">
          <a
            href="#workshop"
            className="text-xs font-semibold text-plum-600 hover:underline"
          >
            Live workshop with Anika Shah
          </a>
        </div>
      </div>
    </section>
  );
}