const STATUS_STYLES = {
  "In progress": "bg-amber-100/80 text-amber-800",
  "Not started": "bg-slate-100 text-slate-600",
  Upcoming: "bg-gold-400 text-plum-950 font-semibold",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
        STATUS_STYLES[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}