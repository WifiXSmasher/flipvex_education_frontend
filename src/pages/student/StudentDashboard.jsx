import React from "react";
import { Icon } from "@iconify/react";
import { useAuth } from "@/auth/AuthContext";

const PATHWAY_STEPS = [
  { label: "Enrolled", meta: "Jan 12", icon: "lucide:check", state: "done" },
  { label: "Training", meta: "12 modules", icon: "lucide:check", state: "done" },
  { label: "Assignments", meta: "2 remaining", icon: "lucide:clipboard-list", state: "current" },
  { label: "Final exam", meta: "May 28", icon: "lucide:clipboard-check", state: "upcoming" },
  { label: "Certificate", meta: "After passing", icon: "lucide:award", state: "upcoming" },
  { label: "Placement", meta: "Career support", icon: "lucide:briefcase-business", state: "upcoming" },
];

const PENDING_ASSIGNMENTS = [
  {
    code: "MC",
    title: "Mobile checkout critique",
    meta: "Due Apr 17 · 100 marks",
    badge: "In progress",
    badgeClass: "bg-secondary text-secondary-foreground",
  },
  {
    code: "ID",
    title: "Interview discussion guide",
    meta: "Due Apr 22 · 50 marks",
    badge: "Not started",
    badgeClass: "bg-muted text-muted-foreground",
  },
];

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const displayName = user?.first_name ? `${user.first_name} ${user.last_name || ""}`.trim() : (user?.name || "Student");

  return (
    <>
      {/* Welcome Hero */}
      <section className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-md sm:p-8">
        <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-[10px] font-bold tracking-wider text-secondary-foreground">
                <Icon icon="lucide:shield-check" className="text-sm" />
                STUDENT PORTAL
              </span>
              <p className="text-xs">Tuesday, April 14</p>
            </div>
            <h1 className="mt-5 max-w-2xl font-heading text-3xl font-bold tracking-tight text-balance">
              Welcome back, {displayName  }.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6">
              You are enrolled in Product Design Essentials, Batch PD-26B. Your registration number is
              REG-LNV-24018.
            </p>
          </div>
          <div className="rounded-2xl bg-card p-4 text-card-foreground shadow-md min-w-[180px]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Current stage
            </p>
            <p className="mt-1 text-sm font-bold">Assignments</p>
            <p className="mt-3 text-[10px] text-muted-foreground">Program ends Jun 26, 2026</p>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-border bg-card p-5 shadow-md">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-tertiary">
            <Icon icon="lucide:trending-up" className="text-xl" />
          </span>
          <p className="mt-5 text-xs font-medium text-muted-foreground">Course completion</p>
          <p className="mt-1 font-heading text-2xl font-bold text-foreground">75%</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-3/4 rounded-full bg-tertiary" />
          </div>
        </article>

        <article className="rounded-2xl border border-border bg-card p-5 shadow-md">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
            <Icon icon="lucide:activity" className="text-xl" />
          </span>
          <p className="mt-5 text-xs font-medium text-muted-foreground">Attendance</p>
          <p className="mt-1 font-heading text-2xl font-bold text-foreground">94%</p>
          <p className="mt-3 text-xs text-muted-foreground">15 of 16 sessions attended</p>
        </article>

        <article className="rounded-2xl border border-border bg-card p-5 shadow-md">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-tertiary">
            <Icon icon="lucide:clipboard-list" className="text-xl" />
          </span>
          <p className="mt-5 text-xs font-medium text-muted-foreground">Pending assignments</p>
          <p className="mt-1 font-heading text-2xl font-bold text-foreground">02</p>
          <p className="mt-3 text-xs text-muted-foreground">One due this Friday</p>
        </article>

        <article className="rounded-2xl border border-border bg-card p-5 shadow-md">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Icon icon="lucide:credit-card" className="text-xl" />
          </span>
          <p className="mt-5 text-xs font-medium text-muted-foreground">Fee status</p>
          <p className="mt-1 font-heading text-2xl font-bold text-foreground">Paid</p>
          <p className="mt-3 text-xs text-muted-foreground">All installments cleared</p>
        </article>
      </section>

      {/* Learning Pathway */}
      <section className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-md sm:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-tertiary">
              Learning pathway
            </p>
            <h2 className="mt-1 text-lg font-heading font-semibold text-foreground">Course journey</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              3 of 6 milestones complete · You are currently in assignments.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-[10px] font-bold text-tertiary">
            <span className="h-2 w-2 rounded-full bg-tertiary" />
            75% course complete
          </span>
        </div>

        <div className="mt-7 overflow-x-auto pb-2">
          <div className="relative min-w-[720px] px-5">
            <div className="absolute left-11 right-11 top-6 h-1 rounded-full bg-muted" />
            <div className="absolute left-11 top-6 h-1 w-[42%] rounded-full bg-gradient-to-r from-tertiary to-secondary" />
            <ol className="relative grid grid-cols-6 gap-3">
              {PATHWAY_STEPS.map((step) => {
                const isDone = step.state === "done";
                const isCurrent = step.state === "current";
                return (
                  <li key={step.label} className="flex flex-col items-center text-center">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-full shadow-md ${
                        isDone
                          ? "bg-tertiary text-tertiary-foreground ring-4 ring-card"
                          : isCurrent
                          ? "bg-secondary text-secondary-foreground ring-4 ring-accent"
                          : "border-2 border-border bg-card text-muted-foreground ring-4 ring-card"
                      }`}
                    >
                      <Icon icon={step.icon} className="text-lg" />
                    </span>
                    {isCurrent && (
                      <span className="mt-2 rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold text-primary-foreground">
                        Current
                      </span>
                    )}
                    <p className={`${isCurrent ? "mt-2" : "mt-3"} text-xs font-bold text-foreground`}>
                      {step.label}
                    </p>
                    <p className="mt-1 text-[10px] text-muted-foreground">{step.meta}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* Next Class & Pending Assignments */}
      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-md">
          <div className="bg-gradient-to-r from-primary to-tertiary p-5 text-primary-foreground sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground">
                  <Icon icon="lucide:radio" className="text-sm" />
                  Up next
                </div>
                <h2 className="mt-3 text-lg font-heading font-semibold">Next class</h2>
                <p className="mt-1 text-xs">Your live studio session is ready when you are.</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-[10px] font-bold text-secondary-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                Live class
              </span>
            </div>
          </div>
          <div className="m-4 rounded-2xl border border-border bg-card p-5 shadow-md sm:m-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-accent text-tertiary">
                <span className="text-[10px] font-bold uppercase">Apr</span>
                <span className="font-heading text-2xl font-bold leading-6">15</span>
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-tertiary">
                  Wednesday · 4:00–5:30 PM
                </p>
                <h3 className="mt-2 text-base font-heading font-bold text-foreground">
                  Design critique: mobile commerce
                </h3>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Icon icon="lucide:video" className="text-sm text-tertiary" />
                    Learnova Meet
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Icon icon="lucide:user" className="text-sm text-tertiary" />
                    Anika Shah
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-primary-foreground shadow-md hover:opacity-90 transition-opacity cursor-pointer"
            >
              Join live class <Icon icon="lucide:arrow-up-right" className="text-sm" />
            </button>
          </div>
        </article>

        <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-md">
          <div className="flex items-center justify-between bg-accent px-5 py-5 sm:px-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-tertiary">
                Action required
              </p>
              <h2 className="mt-1 text-lg font-heading font-semibold text-foreground">
                Pending assignments
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">Two submissions need your attention.</p>
            </div>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
              <Icon icon="lucide:clipboard-list" className="text-xl" />
            </span>
          </div>
          <div className="space-y-3 p-3 sm:p-4">
            {PENDING_ASSIGNMENTS.map((item) => (
              <div key={item.code} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-xs font-bold text-secondary-foreground">
                      {item.code}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-foreground">{item.title}</p>
                      <p className="mt-1 text-[10px] text-muted-foreground">{item.meta}</p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${item.badgeClass}`}
                  >
                    {item.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </>
  );
}