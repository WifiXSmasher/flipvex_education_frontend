import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { INSTRUCTOR_STATUS_STYLES } from "@/config/navigation";
import { useAdminInstructors } from "@/hooks/useAdminInstructors";

/* ---------- constants & helpers ---------- */

const EMPTY_FORM = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  password: "",
};

const ITEMS_PER_PAGE = 5;

const inputClass = (hasError) =>
  `w-full rounded-xl border bg-background px-3 py-2.5 text-xs text-foreground outline-none focus:border-tertiary ${
    hasError ? "border-destructive" : "border-input"
  }`;

// Dates arrive as ISO 8601 UTC strings. Convert them for display.
const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});
const formatDate = (iso) => (iso ? dateFormatter.format(new Date(iso)) : "—");

const getInitials = (first, last) =>
  `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase() || "?";

/* ---------- subcomponents ---------- */

function Field({ label, htmlFor, error, hint, className = "", children }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold text-foreground">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>}
      {error && <p className="mt-1 text-[11px] text-destructive">{error}</p>}
    </div>
  );
}

function StatCard({ icon, iconClass, badge, badgeClass, value, label }) {
  return (
    <article className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-md">
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}>
          <Icon icon={icon} className="text-lg" />
        </div>
        <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${badgeClass}`}>{badge}</span>
      </div>
      <p className="mt-5 font-heading text-3xl font-bold">{String(value).padStart(2, "0")}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
    </article>
  );
}

function AddInstructorModal({ errors, isSubmitting, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [localErrors, setLocalErrors] = useState({});

  // Close on Escape and stop the page behind from scrolling
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && !isSubmitting && onClose();
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, isSubmitting]);

  const setField = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    setLocalErrors((e) => ({ ...e, [name]: "" }));
  };

  // Browser-side check first, then the server's message if there is one
  const errorFor = (name) => localErrors[name] || errors[name];

  const validate = () => {
    const next = {};
    if (!form.first_name.trim()) next.first_name = "First name is required";
    if (!form.last_name.trim()) next.last_name = "Last name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Enter a valid email address";
    if (form.password && form.password.length < 8) next.password = "Use at least 8 characters";
    setLocalErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    // On success the hook closes the modal, which also resets this form
    await onSubmit({
      firstName: form.first_name,
      lastName: form.last_name,
      email: form.email,
      phone: form.phone,
      password: form.password,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && !isSubmitting && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="instructor-modal-title"
        className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-border pb-4">
          <div>
            <h2 id="instructor-modal-title" className="text-sm font-bold text-foreground">
              Add new instructor
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              The account is created verified. The instructor can sign in right away.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close"
            className="cursor-pointer rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
          >
            <Icon icon="lucide:x" className="text-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
          {errors.form && (
            <div role="alert" className="rounded-xl bg-destructive/10 p-3 text-xs text-destructive">
              {errors.form}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="First name *" htmlFor="inst-first" error={errorFor("first_name")}>
              <input
                id="inst-first"
                autoFocus
                value={form.first_name}
                onChange={(e) => setField("first_name", e.target.value)}
                placeholder="e.g. Anika"
                className={inputClass(errorFor("first_name"))}
              />
            </Field>

            <Field label="Last name *" htmlFor="inst-last" error={errorFor("last_name")}>
              <input
                id="inst-last"
                value={form.last_name}
                onChange={(e) => setField("last_name", e.target.value)}
                placeholder="e.g. Shah"
                className={inputClass(errorFor("last_name"))}
              />
            </Field>

            <Field label="Email address *" htmlFor="inst-email" error={errorFor("email")}>
              <input
                id="inst-email"
                type="email"
                autoComplete="off"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                placeholder="instructor@learnova.edu"
                className={inputClass(errorFor("email"))}
              />
            </Field>

            <Field label="Phone" htmlFor="inst-phone" error={errorFor("phone")}>
              <input
                id="inst-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setField("phone", e.target.value)}
                placeholder="+91 98470 11223"
                className={inputClass(errorFor("phone"))}
              />
            </Field>

            <Field
              label="Temporary password (optional)"
              htmlFor="inst-password"
              error={errorFor("password")}
              hint="Leave blank and the instructor can set their own using Forgot password."
              className="sm:col-span-2"
            >
              <input
                id="inst-password"
                type="password"
                autoComplete="new-password"
                value={form.password}
                onChange={(e) => setField("password", e.target.value)}
                className={inputClass(errorFor("password"))}
              />
            </Field>
          </div>

          <div className="flex justify-end gap-2 border-t border-border pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="cursor-pointer rounded-xl border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-md disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Add instructor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeactivateInstructorModal({ instructor, isBusy, onClose, onConfirm }) {
  const fullName = `${instructor.first_name} ${instructor.last_name}`.trim();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && !isBusy && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, isBusy]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && !isBusy && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="deactivate-instructor-title"
        className="w-full max-w-md rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-2xl"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
          <Icon icon="lucide:user-x" className="text-xl" />
        </div>
        <h2 id="deactivate-instructor-title" className="mt-4 text-base font-bold text-foreground">
          Deactivate instructor?
        </h2>
        <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
          <span className="font-semibold text-foreground">{fullName}</span> will be signed out everywhere and
          blocked from logging in. You can activate the account again at any time.
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isBusy}
            className="cursor-pointer rounded-xl border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(instructor)}
            disabled={isBusy}
            className="cursor-pointer rounded-xl bg-destructive px-4 py-2 text-xs font-semibold text-white shadow-md hover:opacity-95 disabled:opacity-60"
          >
            {isBusy ? "Deactivating..." : "Deactivate"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- main view ---------- */

export default function InstructorView({ search: searchProp = "" }) {
  const {
    instructors,
    count,
    isLoading,
    error,
    reload,
    setSearch,
    statusFilter,
    setStatusFilter,
    isModalOpen,
    openModal,
    closeModal,
    createInstructor,
    isCreating,
    formErrors,
    toggleInstructorStatus,
  } = useAdminInstructors();

  const [deactivating, setDeactivating] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // The dashboard's top search box drives the server-side search
  useEffect(() => {
    setSearch(searchProp);
    setCurrentPage(1);
  }, [searchProp, setSearch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  // Counted from the loaded rows. Only `count` (total) comes from the server.
  const activeCount = useMemo(
    () => instructors.filter((i) => i.is_active).length,
    [instructors]
  );
  const inactiveCount = instructors.length - activeCount;
  const neverSignedInCount = useMemo(
    () => instructors.filter((i) => !i.last_login).length,
    [instructors]
  );

  const totalPages = Math.max(1, Math.ceil(instructors.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedInstructors = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return instructors.slice(start, start + ITEMS_PER_PAGE);
  }, [instructors, safePage]);

  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  const startItem =
    instructors.length === 0 ? 0 : (safePage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(safePage * ITEMS_PER_PAGE, instructors.length);

  const runToggle = async (instructor) => {
    setBusyId(instructor.id);
    await toggleInstructorStatus(instructor);
    setBusyId(null);
    setDeactivating(null);
  };

  // Deactivating asks first. Activating does not need a confirmation.
  const handleRowAction = (instructor) => {
    if (instructor.is_active) setDeactivating(instructor);
    else runToggle(instructor);
  };

  const emptyMessage = searchProp.trim()
    ? "No instructors match your search."
    : statusFilter !== "All"
      ? "No instructors match your current filter."
      : 'No instructors yet. Click "Add new instructor" to create one.';

  return (
    <section className="space-y-5">
      {/* Hero Banner */}
      <div className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-md lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              Learnova administration
            </div>
            <h1 className="mt-4 max-w-2xl font-heading text-3xl font-bold tracking-tight text-balance lg:text-4xl">
              Faculty &amp; instructors, thoughtfully coordinated.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-primary-foreground/90">
              Manage instructor accounts, contact details, and access to the portal.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 border-t border-white/15 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary-foreground">
              Faculty management
            </p>
            <button
              type="button"
              onClick={openModal}
              className="group inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 rounded-xl bg-secondary px-5 py-3 text-sm font-bold text-secondary-foreground shadow-md transition-opacity hover:opacity-95"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                <Icon icon="lucide:plus" className="text-lg text-primary-foreground" />
              </span>
              <span>Add new instructor</span>
              <Icon icon="lucide:arrow-right" className="text-base" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon="lucide:graduation-cap"
          iconClass="bg-primary text-primary-foreground"
          badge="Faculty"
          badgeClass="bg-muted text-muted-foreground"
          value={count}
          label="Total instructors"
        />
        <StatCard
          icon="lucide:user-check"
          iconClass="bg-accent text-tertiary"
          badge="Teaching"
          badgeClass="bg-accent text-tertiary"
          value={activeCount}
          label="Active"
        />
        <StatCard
          icon="lucide:user-x"
          iconClass="bg-secondary text-secondary-foreground"
          badge="Blocked"
          badgeClass="bg-secondary/30 text-foreground"
          value={inactiveCount}
          label="Inactive"
        />
        <StatCard
          icon="lucide:log-in"
          iconClass="bg-muted text-muted-foreground"
          badge="Onboarding"
          badgeClass="bg-muted text-muted-foreground"
          value={neverSignedInCount}
          label="Never signed in"
        />
      </div>

      {/* Directory Table Card */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-5 sm:px-6">
          <div>
            <h2 className="text-sm font-bold text-foreground">Instructor directory</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              View contact details, sign-in activity, and account status
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              aria-label="Filter by instructor status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-input bg-background px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-tertiary"
            >
              <option value="All">All statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            {statusFilter !== "All" && (
              <button
                type="button"
                onClick={() => setStatusFilter("All")}
                className="cursor-pointer rounded-xl border border-border px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="mx-5 mb-4 flex items-center justify-between gap-3 rounded-xl bg-destructive/10 p-3 text-xs text-destructive sm:mx-6"
          >
            <span>{error}</span>
            <button type="button" onClick={reload} className="cursor-pointer font-semibold underline">
              Retry
            </button>
          </div>
        )}

        <div className={`overflow-x-auto transition-opacity ${isLoading && instructors.length ? "opacity-60" : ""}`}>
          <table className="w-full min-w-[820px] text-left">
            <thead>
              <tr className="border-y border-border bg-accent text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-3">Instructor</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Last sign-in</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedInstructors.map((inst) => {
                const fullName = `${inst.first_name} ${inst.last_name}`.trim() || inst.email;
                const statusStyle =
                  INSTRUCTOR_STATUS_STYLES[inst.is_active ? "active" : "inactive"] ??
                  INSTRUCTOR_STATUS_STYLES.active;
                const isBusy = busyId === inst.id;

                return (
                  <tr
                    key={inst.id}
                    className="border-b border-border transition-colors last:border-0 hover:bg-accent/50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {inst.profile_photo ? (
                          <img
                            src={inst.profile_photo}
                            alt=""
                            className="h-9 w-9 shrink-0 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-[11px] font-bold text-primary-foreground">
                            {getInitials(inst.first_name, inst.last_name)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-foreground">{fullName}</p>
                          <p className="mt-0.5 truncate text-[10px] text-muted-foreground">{inst.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-xs text-muted-foreground">{inst.phone || "—"}</td>
                    <td className="px-4 py-4 text-xs text-muted-foreground">{formatDate(inst.date_joined)}</td>
                    <td className="px-4 py-4 text-xs text-muted-foreground">
                      {inst.last_login ? formatDate(inst.last_login) : "Never"}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyle.badge}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
                        {inst.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleRowAction(inst)}
                        disabled={isBusy}
                        aria-label={`${inst.is_active ? "Deactivate" : "Activate"} ${fullName}`}
                        title={inst.is_active ? "Deactivate instructor" : "Activate instructor"}
                        className={`inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-border bg-background transition-colors disabled:opacity-50 ${
                          inst.is_active
                            ? "text-destructive hover:bg-destructive/10"
                            : "text-tertiary hover:bg-accent"
                        }`}
                      >
                        <Icon
                          icon={inst.is_active ? "lucide:user-x" : "lucide:user-check"}
                          className="text-sm"
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {isLoading && instructors.length === 0 && (
            <p className="px-6 py-10 text-center text-sm text-muted-foreground">Loading instructors...</p>
          )}
          {!isLoading && !error && instructors.length === 0 && (
            <p className="px-6 py-10 text-center text-sm text-muted-foreground">{emptyMessage}</p>
          )}
        </div>

        {instructors.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-4 sm:px-6">
            <p className="text-xs text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{startItem}</span>–
              <span className="font-semibold text-foreground">{endItem}</span> of{" "}
              <span className="font-semibold text-foreground">{instructors.length}</span> instructors
            </p>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safePage <= 1}
                aria-label="Previous page"
                className="inline-flex h-9 items-center gap-1 rounded-xl border border-border bg-background px-3 text-xs font-semibold text-foreground hover:bg-muted disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              >
                <Icon icon="lucide:chevron-left" className="text-sm" />
                <span>Prev</span>
              </button>

              {pageNumbers.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  aria-current={safePage === page ? "page" : undefined}
                  className={`h-9 min-w-9 rounded-xl px-3 text-xs font-bold transition-colors cursor-pointer ${
                    safePage === page
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "border border-border bg-background text-foreground hover:bg-muted"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage >= totalPages}
                aria-label="Next page"
                className="inline-flex h-9 items-center gap-1 rounded-xl border border-border bg-background px-3 text-xs font-semibold text-foreground hover:bg-muted disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              >
                <span>Next</span>
                <Icon icon="lucide:chevron-right" className="text-sm" />
              </button>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <AddInstructorModal
          errors={formErrors}
          isSubmitting={isCreating}
          onClose={closeModal}
          onSubmit={createInstructor}
        />
      )}

      {deactivating && (
        <DeactivateInstructorModal
          instructor={deactivating}
          isBusy={busyId === deactivating.id}
          onClose={() => setDeactivating(null)}
          onConfirm={runToggle}
        />
      )}
    </section>
  );
}
