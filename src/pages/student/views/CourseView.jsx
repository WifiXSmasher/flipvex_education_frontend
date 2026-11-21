import React from "react";
import { Icon } from "@iconify/react";

const MODULES = [
  { id: 1, title: "Design Foundations & Grids", lessons: 4, duration: "1h 40m", completed: true },
  { id: 2, title: "User Research & Synthesis", lessons: 5, duration: "2h 15m", completed: true },
  { id: 3, title: "Interaction & Edge Cases", lessons: 4, duration: "1h 55m", completed: false },
];

export default function CourseView() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border bg-card p-6 shadow-md">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-tertiary">
          Enrolled program · Batch PD-26B
        </p>
        <h1 className="mt-1 font-heading text-2xl font-bold text-foreground">
          Product Design Essentials
        </h1>
        <p className="mt-2 text-xs text-muted-foreground">
          12 of 16 modules completed · Registration REG-LNV-24018
        </p>
      </section>

      <section className="grid gap-4">
        {MODULES.map((mod) => (
          <article
            key={mod.id}
            className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-card p-5 shadow-md sm:flex-row sm:items-center"
          >
            <div className="flex items-center gap-4">
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                  mod.completed
                    ? "bg-tertiary text-tertiary-foreground"
                    : "bg-accent text-tertiary"
                }`}
              >
                <Icon
                  icon={mod.completed ? "lucide:check-circle-2" : "lucide:book-open"}
                  className="text-xl"
                />
              </span>
              <div>
                <h2 className="text-sm font-bold text-foreground">{mod.title}</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {mod.lessons} lessons · {mod.duration}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex min-h-10 items-center justify-center rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:opacity-90 cursor-pointer"
            >
              {mod.completed ? "Review module" : "Continue module"}
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}