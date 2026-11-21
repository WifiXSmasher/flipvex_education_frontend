import React from "react";
import { Icon } from "@iconify/react";

const SESSIONS = [
  { date: "Apr 14, 2026", topic: "Edge Case Flows & States", status: "Present" },
  { date: "Apr 10, 2026", topic: "Checkout Usability Audit", status: "Present" },
  { date: "Apr 07, 2026", topic: "Interview Synthesis Lab", status: "Absent" },
  { date: "Apr 03, 2026", topic: "Component Token Systems", status: "Present" },
];

export default function AttendanceView() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border bg-card p-6 shadow-md flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-tertiary">
            Session log
          </p>
          <h1 className="mt-1 font-heading text-2xl font-bold text-foreground">
            Attendance — 94%
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            15 of 16 live sessions attended in Batch PD-26B
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-bold text-tertiary w-fit">
          <Icon icon="lucide:activity" className="text-base" />
          Eligible for final exam
        </span>
      </section>

      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-accent text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              <th className="py-3.5 px-5">Date</th>
              <th className="py-3.5 px-5">Session Topic</th>
              <th className="py-3.5 px-5 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-xs">
            {SESSIONS.map((s) => (
              <tr key={s.date}>
                <td className="py-4 px-5 font-medium text-foreground">{s.date}</td>
                <td className="py-4 px-5 text-muted-foreground">{s.topic}</td>
                <td className="py-4 px-5 text-right">
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                      s.status === "Present"
                        ? "bg-accent text-tertiary"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}