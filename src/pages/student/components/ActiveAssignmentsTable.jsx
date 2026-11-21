import StatusBadge from "@/components/ui/StatusBadge";

const ASSIGNMENTS = [
  {
    id: 1,
    title: "Mobile checkout critique",
    module: "UX Foundations",
    dueDate: "Apr 17, 2026",
    status: "In progress",
  },
  {
    id: 2,
    title: "Interview discussion guide",
    module: "User research",
    dueDate: "Apr 22, 2026",
    status: "Not started",
  },
  {
    id: 3,
    title: "Portfolio case study outline",
    module: "Career studio",
    dueDate: "Apr 28, 2026",
    status: "Upcoming",
  },
];

export default function ActiveAssignmentsTable({ onViewAll, onOpenItem }) {
  return (
    <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-2xs">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <p className="text-[10px] font-bold tracking-widest text-plum-600 uppercase">
            Assignments
          </p>
          <h3 className="text-xl font-bold text-plum-950 mt-1">
            Your active work
          </h3>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-plum-950 border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-full transition-colors cursor-pointer"
        >
          View all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-card text-[10px] font-bold tracking-wider text-slate-500 uppercase">
              <th className="py-3 px-4 rounded-l-xl">Assignment</th>
              <th className="py-3 px-4">Module</th>
              <th className="py-3 px-4">Due Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 rounded-r-xl text-right" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {ASSIGNMENTS.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-surface/60 transition-colors"
              >
                <td className="py-4 px-4 font-bold text-plum-950">
                  {item.title}
                </td>
                <td className="py-4 px-4 text-slate-500">{item.module}</td>
                <td className="py-4 px-4 text-slate-500">{item.dueDate}</td>
                <td className="py-4 px-4">
                  <StatusBadge status={item.status} />
                </td>
                <td className="py-4 px-4 text-right">
                  <button
                    type="button"
                    onClick={() => onOpenItem?.(item)}
                    className="font-semibold text-plum-600 hover:underline cursor-pointer"
                  >
                    Open
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}