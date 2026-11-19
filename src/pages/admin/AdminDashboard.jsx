import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/auth/AuthContext";
import {
  LayoutDashboard, GraduationCap, Users, BookOpen, CalendarDays,
  ClipboardCheck, Wallet, BarChart3, MessageSquare, Bell, Settings,
  Search, ChevronDown, ChevronLeft, ChevronRight, ArrowUpRight,
  ArrowDownRight, MoreHorizontal, Plus, Download, Clock3, CheckCircle2,
  AlertCircle, XCircle, Menu, LogOut, FileText, UserRound, TrendingUp,
  CircleHelp, Sparkles, Filter
} from "lucide-react";

const navGroups = [
  {
    label: "OVERVIEW",
    items: [{ label: "Dashboard", icon: LayoutDashboard }, { label: "Analytics", icon: BarChart3 }],
  },
  {
    label: "ACADEMIC",
    items: [
      { label: "Students", icon: Users },
      { label: "Instructors", icon: GraduationCap },
      { label: "Courses", icon: BookOpen },
      { label: "Batches", icon: CalendarDays },
      { label: "Attendance", icon: ClipboardCheck },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      { label: "Fees & Payments", icon: Wallet },
      { label: "Assignments", icon: FileText },
      { label: "Messages", icon: MessageSquare, count: "4" },
    ],
  },
];

const activities = [
  { initials: "AM", name: "Aarav Menon", email: "aarav.m@email.com", action: "Enrolled in", target: "Full Stack Development", date: "Today, 10:42 AM", status: "Completed", color: "blue" },
  { initials: "SP", name: "Sneha Pillai", email: "sneha.p@email.com", action: "Submitted", target: "UI/UX Design Assignment", date: "Today, 09:18 AM", status: "Pending", color: "violet" },
  { initials: "RK", name: "Rahul Kumar", email: "rahul.k@email.com", action: "Payment for", target: "Data Science — Semester 2", date: "Yesterday, 04:35 PM", status: "Completed", color: "amber" },
  { initials: "NF", name: "Nisha Faisal", email: "nisha.f@email.com", action: "Requested", target: "Course certificate", date: "Yesterday, 02:10 PM", status: "Review", color: "rose" },
];

const chartValues = [36, 45, 40, 58, 52, 67, 60, 72, 64, 82, 75, 88];

function StatCard({ title, value, change, positive, icon: Icon, tone, note }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/85 p-5 shadow-[0_8px_28px_-20px_rgba(15,23,42,0.22)] backdrop-blur-xl">
      <div className="flex items-start justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}>
          <Icon size={20} />
        </div>
        <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"><MoreHorizontal size={19} /></button>
      </div>
      <p className="mt-5 text-sm font-medium text-slate-500">{title}</p>
      <div className="mt-1 flex items-end justify-between gap-2">
        <p className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">{value}</p>
        <span className={`mb-1 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${positive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
          {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{change}
        </span>
      </div>
      <p className="mt-2 text-xs text-slate-400">{note}</p>
    </div>
  );
}

function EnrollmentChart() {
  const points = useMemo(() => chartValues.map((v, i) => `${i * 58},${118 - v}`).join(" "), []);
  return (
    <div className="relative mt-5">
      <div className="mb-2 flex justify-between text-[11px] text-slate-400"><span>120</span><span>90</span><span>60</span><span>30</span><span>0</span></div>
      <svg viewBox="0 0 638 132" className="h-36 w-full overflow-visible" preserveAspectRatio="none" role="img" aria-label="Student enrollment trend chart">
        <defs>
          <linearGradient id="enrollmentFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity=".24" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[20, 48, 76, 104].map(y => <line key={y} x1="0" x2="638" y1={y} y2={y} stroke="#e8eef7" strokeDasharray="4 5" />)}
        <polygon points={`0,132 ${points} 638,132`} fill="url(#enrollmentFill)" />
        <polyline points={points} fill="none" stroke="#4778e8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="522" cy={118 - chartValues[9]} r="5" fill="#fff" stroke="#4778e8" strokeWidth="3" />
      </svg>
      <div className="mt-1 grid grid-cols-6 text-[11px] text-slate-400 sm:grid-cols-12">
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => <span key={m} className="text-center">{m}</span>)}
      </div>
    </div>
  );
}

function StatusDonut() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative mt-3 flex h-40 w-40 items-center justify-center rounded-full" style={{ background: "conic-gradient(#4f7df0 0 42%, #8b9cf5 42% 63%, #f4b66a 63% 82%, #5bc6a2 82% 100%)" }}>
        <div className="flex h-[112px] w-[112px] flex-col items-center justify-center rounded-full bg-white shadow-inner">
          <span className="text-3xl font-bold text-slate-900">86%</span>
          <span className="text-[11px] text-slate-400">Overall progress</span>
        </div>
      </div>
      <div className="mt-5 grid w-full grid-cols-2 gap-x-3 gap-y-2 text-xs">
        {[["Active", "1,248", "bg-blue-500"], ["Completed", "426", "bg-indigo-400"], ["On hold", "84", "bg-amber-400"], ["Inactive", "62", "bg-emerald-400"]].map(([label, value, color]) => (
          <div key={label} className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${color}`} /><span className="text-slate-500">{label}</span><b className="ml-auto text-slate-700">{value}</b></div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState("Dashboard");
  const [period, setPeriod] = useState("Last 12 months");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filteredActivities = activities.filter(a => `${a.name} ${a.action} ${a.target}`.toLowerCase().includes(search.toLowerCase()));

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#f5f7fc] font-sans text-slate-800">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-blue-200/25 blur-[100px]" />
        <div className="absolute -right-32 top-20 h-[380px] w-[380px] rounded-full bg-indigo-200/25 blur-[110px]" />
      </div>

      {sidebarOpen && <button aria-label="Close navigation" onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[258px] flex-col border-r border-slate-200/80 bg-white/90 px-5 py-6 shadow-[10px_0_40px_-32px_rgba(15,23,42,.25)] backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center gap-3 px-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20"><GraduationCap size={23} /></div>
          <div><p className="text-[19px] font-extrabold tracking-tight text-slate-900">learnova<span className="text-blue-600">.</span></p><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-slate-400">Institute portal</p></div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto rounded-lg p-1 text-slate-400 lg:hidden"><XCircle size={19} /></button>
        </div>

        <div className="mt-9 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50/70 p-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm"><Sparkles size={17} /></div>
            <div className="min-w-0"><p className="text-xs font-bold text-slate-800">Admin workspace</p><p className="mt-0.5 text-[10px] text-slate-500">Academic year 2026–27</p></div>
            <ChevronDown size={15} className="ml-auto text-slate-400" />
          </div>
        </div>

        <nav className="mt-8 flex-1 space-y-7 overflow-y-auto">
          {navGroups.map(group => (
            <div key={group.label}>
              <p className="mb-3 px-3 text-[10px] font-bold tracking-[.16em] text-slate-400">{group.label}</p>
              <div className="space-y-1">
                {group.items.map(({ label, icon: Icon, count }) => (
                  <button key={label} onClick={() => { setActive(label); setSidebarOpen(false); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition-colors ${active === label ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}`}>
                    <Icon size={17} strokeWidth={1.9} /><span>{label}</span>
                    {count && <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] ${active === label ? "bg-white/20 text-white" : "bg-blue-50 text-blue-700"}`}>{count}</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-5 rounded-2xl bg-slate-50 p-3.5">
          <div className="flex items-center gap-2"><CircleHelp size={16} className="text-blue-600" /><span className="text-xs font-semibold text-slate-700">Need some help?</span></div>
          <p className="mt-1.5 text-[11px] leading-5 text-slate-500">Visit our help center or contact support.</p>
          <button className="mt-2 text-xs font-bold text-blue-600">Get support <ArrowUpRight size={12} className="inline" /></button>
        </div>
        <button
          onClick={handleLogout}
          className="mt-4 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors"
        >
          <LogOut size={17} /> Sign out
        </button>
      </aside>

      <main className="relative min-h-screen lg:ml-[258px]">
        <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-slate-200/70 bg-white/75 px-5 backdrop-blur-2xl sm:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="rounded-xl border border-slate-200 p-2 text-slate-600 lg:hidden"><Menu size={19} /></button>
            <div><p className="text-sm font-bold text-slate-900">Good morning, Admin <span>👋</span></p><p className="mt-0.5 hidden text-xs text-slate-400 sm:block">Here’s what’s happening at your institute today.</p></div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <label className="hidden h-10 w-52 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-3 md:flex"><Search size={16} className="text-slate-400" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search activity..." className="w-full bg-transparent text-xs outline-none placeholder:text-slate-400" /></label>
            <button className="relative rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 hover:text-blue-600"><Bell size={17} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white" /></button>
            <div className="hidden h-8 w-px bg-slate-200 sm:block" />
            <button className="flex items-center gap-2"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 text-xs font-bold text-white ring-2 ring-blue-100">AD</div><span className="hidden text-left sm:block"><b className="block text-xs text-slate-800">Admin</b><small className="text-[10px] text-slate-400">Super administrator</small></span><ChevronDown size={14} className="hidden text-slate-400 sm:block" /></button>
          </div>
        </header>

        <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 sm:py-9">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div><div className="mb-2 flex items-center gap-2 text-xs text-slate-400"><span>Workspace</span><ChevronRight size={13} /><span className="font-semibold text-blue-600">{active}</span></div><h1 className="text-[26px] font-extrabold tracking-tight text-slate-900 sm:text-[30px]">{active}</h1><p className="mt-1.5 text-sm text-slate-500">Monitor your institute’s performance and daily operations.</p></div>
            <div className="flex gap-2"><button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-600 shadow-sm hover:border-blue-200"><Download size={15} /> <span className="hidden sm:inline">Export report</span></button><button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30"><Plus size={15} /> Add new</button></div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Total students" value="1,820" change="+12.8%" positive icon={Users} tone="bg-blue-50 text-blue-600" note="Compared to last month" />
            <StatCard title="Active courses" value="24" change="+3.2%" positive icon={BookOpen} tone="bg-violet-50 text-violet-600" note="Across 6 departments" />
            <StatCard title="Attendance rate" value="92.4%" change="+2.4%" positive icon={ClipboardCheck} tone="bg-emerald-50 text-emerald-600" note="Average this month" />
            <StatCard title="Fee collection" value="₹8.42L" change="-1.8%" positive={false} icon={Wallet} tone="bg-amber-50 text-amber-600" note="Collected this month" />
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[1.65fr_1fr]">
            <section className="rounded-2xl border border-slate-200/80 bg-white/85 p-5 shadow-[0_8px_28px_-20px_rgba(15,23,42,0.22)] backdrop-blur-xl sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-sm font-bold text-slate-900">Student enrollment</h2><p className="mt-1 text-xs text-slate-400">Enrollment growth over time</p><div className="mt-4 flex items-baseline gap-2"><span className="text-2xl font-extrabold text-slate-900">1,820</span><span className="text-xs font-semibold text-emerald-600">↑ 12.8%</span><span className="text-[11px] text-slate-400">vs. previous year</span></div></div><select value={period} onChange={e => setPeriod(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 outline-none focus:border-blue-300"><option>Last 12 months</option><option>Last 6 months</option><option>Last 30 days</option></select></div>
              <EnrollmentChart />
              <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4 text-[11px] text-slate-400"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-blue-500" /> New student enrollments</span><span>Updated just now</span></div>
            </section>
            <section className="rounded-2xl border border-slate-200/80 bg-white/85 p-5 shadow-[0_8px_28px_-20px_rgba(15,23,42,0.22)] backdrop-blur-xl sm:p-6">
              <div className="flex items-start justify-between"><div><h2 className="text-sm font-bold text-slate-900">Student overview</h2><p className="mt-1 text-xs text-slate-400">Current student distribution</p></div><button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"><MoreHorizontal size={18} /></button></div>
              <StatusDonut />
            </section>
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
            <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/85 shadow-[0_8px_28px_-20px_rgba(15,23,42,0.22)] backdrop-blur-xl">
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-5 sm:px-6"><div><h2 className="text-sm font-bold text-slate-900">Recent activity</h2><p className="mt-1 text-xs text-slate-400">Latest updates across your institute</p></div><button className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700">View all <ArrowUpRight size={13} /></button></div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-left">
                  <thead><tr className="border-y border-slate-100 bg-slate-50/70 text-[10px] font-bold uppercase tracking-wider text-slate-400"><th className="px-6 py-3">User</th><th className="px-4 py-3">Activity</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Status</th></tr></thead>
                  <tbody>{filteredActivities.map(a => <tr key={a.name} className="border-b border-slate-100 last:border-0 hover:bg-blue-50/30"><td className="px-6 py-4"><div className="flex items-center gap-3"><div className={`flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-bold ${a.color === "blue" ? "bg-blue-100 text-blue-700" : a.color === "violet" ? "bg-violet-100 text-violet-700" : a.color === "amber" ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"}`}>{a.initials}</div><div><p className="text-xs font-semibold text-slate-800">{a.name}</p><p className="mt-0.5 text-[10px] text-slate-400">{a.email}</p></div></div></td><td className="px-4 py-4"><p className="text-xs text-slate-500">{a.action}</p><p className="mt-0.5 max-w-[190px] truncate text-xs font-semibold text-slate-700">{a.target}</p></td><td className="whitespace-nowrap px-4 py-4 text-[11px] text-slate-400">{a.date}</td><td className="px-4 py-4"><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${a.status === "Completed" ? "bg-emerald-50 text-emerald-700" : a.status === "Pending" ? "bg-amber-50 text-amber-700" : "bg-violet-50 text-violet-700"}`}><span className={`h-1.5 w-1.5 rounded-full ${a.status === "Completed" ? "bg-emerald-500" : a.status === "Pending" ? "bg-amber-500" : "bg-violet-500"}`} />{a.status}</span></td></tr>)}</tbody>
                </table>
                {filteredActivities.length === 0 && <p className="px-6 py-10 text-center text-sm text-slate-400">No activity matches your search.</p>}
              </div>
              <div className="flex items-center justify-between px-6 py-3.5 text-[11px] text-slate-400"><span>Showing {filteredActivities.length} of 4 activities</span><div className="flex gap-1"><button className="rounded-lg border border-slate-200 p-1.5 hover:bg-slate-50"><ChevronLeft size={14} /></button><button className="rounded-lg border border-slate-200 p-1.5 hover:bg-slate-50"><ChevronRight size={14} /></button></div></div>
            </section>

            <section className="rounded-2xl border border-slate-200/80 bg-white/85 p-5 shadow-[0_8px_28px_-20px_rgba(15,23,42,0.22)] backdrop-blur-xl sm:p-6">
              <div className="flex items-start justify-between"><div><h2 className="text-sm font-bold text-slate-900">Today’s schedule</h2><p className="mt-1 text-xs text-slate-400">Wednesday, 18 November 2026</p></div><button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"><CalendarDays size={17} /></button></div>
              <div className="mt-5 space-y-4">
                {[["09:00 AM","Full Stack Development","Batch A · Room 204","blue"],["11:30 AM","UI/UX Design","Batch B · Design Lab","violet"],["02:00 PM","Data Science","Batch C · Room 108","amber"],["04:00 PM","Faculty meeting","Conference room","emerald"]].map(([time,title,sub,tone]) => <div key={title} className="flex gap-3"><div className="w-[68px] pt-1 text-[10px] font-semibold text-slate-400">{time}</div><div className={`w-1 rounded-full ${tone === "blue" ? "bg-blue-500" : tone === "violet" ? "bg-violet-500" : tone === "amber" ? "bg-amber-500" : "bg-emerald-500"}`} /><div className="min-w-0 flex-1 pb-1"><p className="text-xs font-bold text-slate-800">{title}</p><p className="mt-1 text-[11px] text-slate-400">{sub}</p></div><span className="mt-1 h-2 w-2 rounded-full bg-slate-200" /></div>)}
              </div>
              <button className="mt-5 w-full rounded-xl border border-blue-100 bg-blue-50/70 py-2.5 text-xs font-semibold text-blue-700 hover:bg-blue-50">View full timetable <ArrowUpRight size={13} className="ml-1 inline" /></button>
            </section>
          </div>
          <footer className="mt-8 flex flex-wrap items-center justify-between gap-2 pb-3 text-[11px] text-slate-400"><span>© 2026 Learnova. All rights reserved.</span><span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> All systems operational</span></footer>
        </div>
      </main>
    </div>
  );
}
