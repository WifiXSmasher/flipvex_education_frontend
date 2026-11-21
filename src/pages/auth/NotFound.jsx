import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  ArrowRight,
  MapPin,
  Home,
  LayoutDashboard,
  Lightbulb,
  Compass,
} from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#1A1A1A] font-sans selection:bg-[#2B1748] selection:text-white">
      {/* Top Navigation Bar */}
      

      {/* Main Content */}
      <main className="flex-1 flex items-center">
        <div className="max-w-7xl w-full mx-auto px-6 sm:px-10 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-6 space-y-6">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FEF3C7] text-[#92400E] text-xs font-bold tracking-wider uppercase">
                <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Wrong Turn</span>
              </div>

              {/* Giant 404 & Headline */}
              <div className="space-y-2">
                <h1 className="text-7xl sm:text-8xl font-extrabold tracking-tight text-[#2B1748] leading-none">
                  404
                </h1>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#141414] tracking-tight leading-tight pt-1">
                  Looks like this lesson wandered off.
                </h2>
              </div>

              {/* Description */}
              <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-md">
                The page you were hoping to learn from has moved, changed, or
                never existed. Let&apos;s guide you back to something worth
                discovering.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#2B1748] text-white text-sm font-semibold hover:bg-[#3A2060] transition-all shadow-md shadow-[#2B1748]/15"
                >
                  <span>Return to homepage</span>
                  <Home className="w-4 h-4" />
                </Link>

                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-[#2B1748] text-sm font-semibold border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all shadow-xs"
                >
                  <span>Open my dashboard</span>
                  <LayoutDashboard className="w-4 h-4 text-[#7C3AED]" />
                </Link>
              </div>

              {/* Study Tip Callout */}
              <div className="flex items-start gap-3.5 pt-6 max-w-md">
                <div className="w-9 h-9 rounded-xl bg-[#FACC15] flex items-center justify-center shrink-0 text-[#422006] shadow-xs">
                  <Lightbulb className="w-4 h-4 stroke-[2.2]" />
                </div>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  <strong className="font-semibold text-gray-800">
                    Study tip:
                  </strong>{' '}
                  A detour is still progress when it helps you find a better
                  path.
                </p>
              </div>
            </div>

            {/* Right Column: Illustration Card */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[520px]">
                {/* Ambient Glow Behind Card */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-4 rounded-[36px] bg-gradient-to-tr from-amber-100/70 via-purple-100/60 to-transparent blur-2xl -z-10"
                />

                {/* Outer White Frame */}
                <div className="bg-white p-5 sm:p-6 rounded-[32px] shadow-[0_20px_50px_rgba(43,23,72,0.07)] border border-gray-100">
                  {/* Inner Warm Cream Canvas */}
                  <div className="relative aspect-[4/3] w-full rounded-2xl bg-[#FBF7F2] overflow-hidden flex items-center justify-center">
                    <NotFoundIllustration />

                    {/* Floating Bottom-Left Status Card */}
                    <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 bg-white/95 backdrop-blur-xs px-4 py-3 rounded-2xl shadow-lg shadow-black/5 border border-gray-100 flex items-center gap-3 max-w-[240px]">
                      <div className="w-9 h-9 rounded-xl bg-[#FACC15] flex items-center justify-center shrink-0 text-[#422006]">
                        <Compass className="w-4 h-4 stroke-[2.2]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#1A1A1A] leading-tight">
                          You&apos;re not stuck
                        </p>
                        <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">
                          Pick a new direction below.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-100 bg-white/60">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 Learnova. Keep learning forward.</p>
          <div className="flex items-center gap-6">
            <Link
              to="/courses"
              className="hover:text-[#2B1748] transition-colors"
            >
              Explore courses
            </Link>
            <Link
              to="/support"
              className="hover:text-[#2B1748] transition-colors"
            >
              Get support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* Custom Editorial Vector Illustration matching the 404 graphic */
function NotFoundIllustration() {
  return (
    <svg
      viewBox="0 0 500 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full object-cover"
      aria-label="Student sitting on a stack of books looking at a floating 404 note"
    >
      {/* Soft Background Clouds / Shapes */}
      <circle cx="385" cy="110" r="85" fill="#F3ECE3" opacity="0.65" />
      <path
        d="M180 340C210 295 270 290 320 315C360 335 420 310 470 330V380H180V340Z"
        fill="#F2EAE0"
      />

      {/* Sparkles */}
      <path
        d="M272 86L275 94L283 97L275 100L272 108L269 100L261 97L269 94L272 86Z"
        fill="#FBBF24"
      />
      <path
        d="M110 218L112 224L118 226L112 228L110 234L108 228L102 226L108 224L110 218Z"
        fill="#FBBF24"
      />
      <circle cx="96" cy="96" r="3" fill="#C4B5FD" />
      <circle cx="295" cy="145" r="2.5" fill="#C4B5FD" />

      {/* Floating 404 Note Paper */}
      <g transform="translate(128, 48) rotate(-6)">
        <rect
          x="0"
          y="10"
          width="136"
          height="148"
          rx="12"
          fill="white"
          stroke="#E5E7EB"
          strokeWidth="1.5"
        />
        {/* Yellow Tape */}
        <rect x="44" y="0" width="48" height="16" rx="3" fill="#FACC15" />
        {/* 404 Text on Paper */}
        <text
          x="68"
          y="78"
          textAnchor="middle"
          fill="#2B1748"
          fontSize="36"
          fontWeight="800"
          fontFamily="sans-serif"
        >
          404
        </text>
        {/* Subtle Paper Lines */}
        <line
          x1="28"
          y1="102"
          x2="108"
          y2="102"
          stroke="#E5E7EB"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="38"
          y1="116"
          x2="98"
          y2="116"
          stroke="#F3F4F6"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      {/* Cute Smiling Star */}
      <g transform="translate(68, 128)">
        <path
          d="M36 4L44.5 22.5L65 25L50 39L54 59L36 49L18 59L22 39L7 25L27.5 22.5L36 4Z"
          fill="#FACC15"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="30" cy="31" r="2" fill="#422006" />
        <circle cx="42" cy="31" r="2" fill="#422006" />
        <path
          d="M32 36C33.5 38 38.5 38 40 36"
          stroke="#422006"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>

      {/* Dashed Curved Trail & Pencil */}
      <path
        d="M126 188C155 212 225 185 268 140"
        stroke="#A78BFA"
        strokeWidth="2"
        strokeDasharray="5 5"
        strokeLinecap="round"
      />
      <g transform="translate(122, 200) rotate(-32)">
        <rect x="0" y="0" width="24" height="8" rx="2" fill="#7C3AED" />
        <polygon points="24,0 32,4 24,8" fill="#FDE68A" />
        <polygon points="29,2.5 32,4 29,5.5" fill="#2B1748" />
      </g>

      {/* Stack of 3 Books (Bottom Right) */}
      {/* Bottom Purple Book */}
      <g transform="translate(260, 326)">
        <rect x="0" y="0" width="240" height="32" rx="8" fill="#4C1D95" />
        <rect x="14" y="5" width="226" height="22" rx="4" fill="#F8FAFC" />
        <line x1="24" y1="12" x2="235" y2="12" stroke="#CBD5E1" strokeWidth="1.5" />
        <line x1="24" y1="19" x2="235" y2="19" stroke="#CBD5E1" strokeWidth="1.5" />
      </g>

      {/* Middle Mustard Yellow Book */}
      <g transform="translate(278, 294)">
        <rect x="0" y="0" width="222" height="32" rx="8" fill="#EAB308" />
        <rect x="14" y="5" width="208" height="22" rx="4" fill="#FFFBEB" />
        <line x1="24" y1="12" x2="215" y2="12" stroke="#FDE68A" strokeWidth="1.5" />
        <line x1="24" y1="19" x2="215" y2="19" stroke="#FDE68A" strokeWidth="1.5" />
      </g>

      {/* Top Lavender Book */}
      <g transform="translate(292, 264)">
        <rect x="0" y="0" width="208" height="30" rx="8" fill="#6D28D9" />
        <rect x="14" y="5" width="194" height="20" rx="4" fill="#F5F3FF" />
        {/* White Bookmark Ribbon */}
        <path d="M168 5H180V28L174 23L168 28V5Z" fill="white" />
      </g>

      {/* Stylized Seated Student Character */}
      <g transform="translate(310, 102)">
        {/* Hair Bun & Back Hair */}
        <circle cx="84" cy="18" r="14" fill="#1F1635" />
        <circle cx="72" cy="34" r="20" fill="#1F1635" />

        {/* Neck & Face */}
        <rect x="64" y="46" width="10" height="14" rx="4" fill="#D99B78" />
        <circle cx="66" cy="36" r="16" fill="#E5A987" />
        {/* Eye & Eyebrow */}
        <path
          d="M55 31C57 29.5 60 29.5 62 31"
          stroke="#1F1635"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="58" cy="35" r="1.8" fill="#1F1635" />

        {/* Purple Sweater */}
        <path
          d="M46 62C46 56 54 54 68 54C82 54 90 58 92 68L98 112H44L46 62Z"
          fill="#6D28D9"
        />

        {/* Thinking Arm & Hand on Chin */}
        <path
          d="M54 64L38 82L54 46"
          stroke="#5B21B6"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="55" cy="45" r="4.5" fill="#E5A987" />

        {/* Yellow Trousers (Cross-legged) */}
        <path
          d="M44 110H98L114 142C116 148 110 154 102 154H32C22 154 18 146 24 138L44 110Z"
          fill="#F59E0B"
        />
        {/* Folded Leg Detail */}
        <path
          d="M42 136H94"
          stroke="#D97706"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Open Book in Lap */}
        <path
          d="M26 106L52 112L76 106L74 116L52 121L28 116L26 106Z"
          fill="white"
          stroke="#CBD5E1"
          strokeWidth="1.5"
        />

        {/* White Sneaker */}
        <g transform="translate(14, 144)">
          <path
            d="M4 12C4 6 12 4 22 4L34 10V18H4V12Z"
            fill="white"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />
          <rect x="3" y="15" width="32" height="4" rx="2" fill="#E2E8F0" />
        </g>
      </g>
    </svg>
  );
}