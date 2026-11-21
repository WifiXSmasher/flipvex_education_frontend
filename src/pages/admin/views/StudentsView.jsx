import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { useAdminStudents } from "@/hooks/useAdminStudents";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
};

const ITEMS_PER_PAGE = 5;

const inputClass = (hasError) =>
  `w-full rounded-xl border bg-background px-3 py-2.5 text-xs text-foreground outline-none focus:border-tertiary ${
    hasError ? "border-destructive" : "border-input"
  }`;

export default function StudentsView({ search: searchProp = "" }) {
  const {
    students,
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
    createStudent,
    isCreating,
    formErrors = {},
    toggleStudentStatus,
  } = useAdminStudents();

  const [form, setForm] = useState(EMPTY_FORM);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setSearch(searchProp);
    setCurrentPage(1);
  }, [searchProp, setSearch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = (e) => e.key === "Escape" && !isCreating && closeModal();
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isModalOpen, isCreating, closeModal]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const success = await createStudent(form);
    if (success) {
      setForm(EMPTY_FORM);
    }
  };

  const activeCount = useMemo(
    () => students.filter((s) => s.is_active).length,
    [students]
  );
  const verifiedCount = useMemo(
    () => students.filter((s) => s.is_verified).length,
    [students]
  );
  const inactiveCount = useMemo(
    () => students.filter((s) => !s.is_active).length,
    [students]
  );

  const totalCount = count || students.length;
  const totalPages = Math.max(1, Math.ceil(students.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedStudents = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return students.slice(start, start + ITEMS_PER_PAGE);
  }, [students, safePage]);

  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  const hasActiveFilters = Boolean(searchProp) || statusFilter !== "All";

  const handleResetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setCurrentPage(1);
  };

  const startItem = students.length === 0 ? 0 : (safePage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(safePage * ITEMS_PER_PAGE, students.length);

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
              Student accounts, clearly organized.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-primary-foreground/90">
              Manage student profiles, email verification status, and portal access across batches.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 border-t border-white/15 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary-foreground">
              Student management
            </p>
            <button
              type="button"
              onClick={openModal}
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-secondary px-5 py-3 text-sm font-bold text-secondary-foreground shadow-md hover:opacity-95 transition-opacity cursor-pointer"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                <Icon icon="lucide:user-plus" className="text-base text-primary-foreground" />
              </span>
              <span>Add new student</span>
              <Icon icon="lucide:arrow-right" className="text-base" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-md">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Icon icon="lucide:users" className="text-lg" />
            </div>
            <span className="rounded-full bg-muted px-2 py-1 text-[10px] font-bold text-muted-foreground">
              All records
            </span>
          </div>
          <p className="mt-5 font-heading text-3xl font-bold">
            {String(totalCount).padStart(2, "0")}
          </p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
            Total students
          </p>
        </article>

        <article className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-md">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-tertiary">
              <Icon icon="lucide:user-check" className="text-lg" />
            </div>
            <span className="rounded-full bg-accent px-2 py-1 text-[10px] font-bold text-tertiary">
              Enabled
            </span>
          </div>
          <p className="mt-5 font-heading text-3xl font-bold">
            {String(activeCount).padStart(2, "0")}
          </p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
            Active accounts
          </p>
        </article>

        <article className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-md">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
              <Icon icon="lucide:shield-check" className="text-lg" />
            </div>
            <span className="rounded-full bg-secondary/30 px-2 py-1 text-[10px] font-bold text-foreground">
              Confirmed
            </span>
          </div>
          <p className="mt-5 font-heading text-3xl font-bold">
            {String(verifiedCount).padStart(2, "0")}
          </p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
            Verified emails
          </p>
        </article>

        <article className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-md">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <Icon icon="lucide:user-x" className="text-lg" />
            </div>
            <span className="rounded-full bg-destructive/10 px-2 py-1 text-[10px] font-bold text-destructive">
              Restricted
            </span>
          </div>
          <p className="mt-5 font-heading text-3xl font-bold">
            {String(inactiveCount).padStart(2, "0")}
          </p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
            Deactivated
          </p>
        </article>
      </div>

      {/* Directory Section */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-5 sm:px-6">
          <div>
            <h2 className="text-sm font-bold text-foreground">Student directory</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Manage student accounts, view verification status, and grant access
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              aria-label="Filter by student status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-input bg-background px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-tertiary"
            >
              <option value="All">All statuses</option>
              <option value="Active">Active only</option>
              <option value="Inactive">Deactivated</option>
            </select>

            <button
              type="button"
              onClick={reload}
              disabled={isLoading}
              aria-label="Refresh student list"
              title="Refresh student list"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background text-foreground hover:bg-muted disabled:opacity-50 cursor-pointer"
            >
              <Icon
                icon="lucide:refresh-cw"
                className={`text-sm ${isLoading ? "animate-spin" : ""}`}
              />
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="rounded-xl border border-border px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
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
            <span className="flex items-center gap-2">
              <Icon icon="lucide:alert-circle" className="text-base shrink-0" />
              <span>{error}</span>
            </span>
            <button type="button" onClick={reload} className="font-semibold underline cursor-pointer">
              Retry
            </button>
          </div>
        )}

        {/* Students Table */}
        <div
          className={`overflow-x-auto transition-opacity ${
            isLoading && students.length ? "opacity-60" : ""
          }`}
        >
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-y border-border bg-accent text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-3">Student</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Joined Date</th>
                <th className="px-4 py-3">Verified</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && students.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs text-muted-foreground">
                    <Icon
                      icon="lucide:loader-2"
                      className="mx-auto mb-2 h-5 w-5 animate-spin text-tertiary"
                    />
                    Loading students...
                  </td>
                </tr>
              ) : paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs text-muted-foreground">
                    {searchProp
                      ? "No students match your search."
                      : "No students registered yet."}
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((student) => {
                  const fullName =
                    `${student.first_name || ""} ${student.last_name || ""}`.trim() || "No Name";
                  const initials = fullName
                    .split(" ")
                    .map((n) => n[0])
                    .filter(Boolean)
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();

                  const joinedDate = student.date_joined
                    ? new Date(student.date_joined).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "—";

                  return (
                    <tr
                      key={student.id}
                      className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-[11px] font-bold text-primary-foreground">
                            {initials}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-foreground">
                              {fullName}
                            </p>
                            <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                              ID: #{student.id} · {student.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-xs text-muted-foreground">
                        {student.phone ? (
                          <span className="inline-flex items-center gap-1.5 text-foreground">
                            <Icon icon="lucide:phone" className="text-sm text-tertiary" />
                            {student.phone}
                          </span>
                        ) : (
                          <span className="text-muted-foreground/60">Not provided</span>
                        )}
                      </td>

                      <td className="px-4 py-4 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <Icon icon="lucide:calendar" className="text-sm text-tertiary" />
                          {joinedDate}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        {student.is_verified ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold text-tertiary">
                            <Icon icon="lucide:shield-check" className="text-xs" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-secondary/30 px-2.5 py-1 text-[10px] font-bold text-foreground">
                            Unverified
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                            student.is_active
                              ? "bg-accent text-tertiary"
                              : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              student.is_active ? "bg-tertiary" : "bg-destructive"
                            }`}
                          />
                          {student.is_active ? "Active" : "Deactivated"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => toggleStudentStatus(student)}
                          className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                            student.is_active
                              ? "border-destructive/30 text-destructive hover:bg-destructive/10"
                              : "border-border bg-background text-foreground hover:bg-muted"
                          }`}
                        >
                          {student.is_active ? "Deactivate" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {students.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-4 sm:px-6">
            <p className="text-xs text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{startItem}</span>–
              <span className="font-semibold text-foreground">{endItem}</span> of{" "}
              <span className="font-semibold text-foreground">{students.length}</span> students
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

      {/* Add Student Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
          onMouseDown={(e) => e.target === e.currentTarget && !isCreating && closeModal()}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-student-title"
            className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <h3 id="add-student-title" className="text-sm font-bold text-foreground">
                  Add new student
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Pre-verified student account created by administrator
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                disabled={isCreating}
                aria-label="Close modal"
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted cursor-pointer"
              >
                <Icon icon="lucide:x" className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="mt-5 space-y-4">
              {formErrors.form && (
                <div
                  role="alert"
                  className="rounded-xl bg-destructive/10 p-3 text-xs text-destructive"
                >
                  {formErrors.form}
                </div>
              )}

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="student-first-name"
                    className="mb-1.5 block text-xs font-semibold text-foreground"
                  >
                    First name *
                  </label>
                  <input
                    id="student-first-name"
                    required
                    value={form.firstName}
                    onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
                    placeholder="e.g. Aarav"
                    className={inputClass(formErrors.first_name)}
                  />
                  {formErrors.first_name && (
                    <p className="mt-1 text-[11px] text-destructive">{formErrors.first_name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="student-last-name"
                    className="mb-1.5 block text-xs font-semibold text-foreground"
                  >
                    Last name *
                  </label>
                  <input
                    id="student-last-name"
                    required
                    value={form.lastName}
                    onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
                    placeholder="e.g. Menon"
                    className={inputClass(formErrors.last_name)}
                  />
                  {formErrors.last_name && (
                    <p className="mt-1 text-[11px] text-destructive">{formErrors.last_name}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="student-email"
                  className="mb-1.5 block text-xs font-semibold text-foreground"
                >
                  Email address *
                </label>
                <div className="relative">
                  <Icon
                    icon="lucide:mail"
                    className="absolute left-3.5 top-3 text-sm text-muted-foreground"
                  />
                  <input
                    id="student-email"
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="student@example.com"
                    className={`${inputClass(formErrors.email)} pl-9`}
                  />
                </div>
                {formErrors.email && (
                  <p className="mt-1 text-[11px] text-destructive">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="student-phone"
                  className="mb-1.5 block text-xs font-semibold text-foreground"
                >
                  Phone (Optional)
                </label>
                <div className="relative">
                  <Icon
                    icon="lucide:phone"
                    className="absolute left-3.5 top-3 text-sm text-muted-foreground"
                  />
                  <input
                    id="student-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="e.g. +91 9876543210"
                    className={`${inputClass(formErrors.phone)} pl-9`}
                  />
                </div>
                {formErrors.phone && (
                  <p className="mt-1 text-[11px] text-destructive">{formErrors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="student-password"
                  className="mb-1.5 block text-xs font-semibold text-foreground"
                >
                  Password (Optional)
                </label>
                <input
                  id="student-password"
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="Leave empty for user to set via forgot-password"
                  className={inputClass(formErrors.password)}
                />
                <p className="mt-1 text-[10px] text-muted-foreground">
                  If left blank, the student can use &ldquo;Forgot password&rdquo; to set their
                  password.
                </p>
                {formErrors.password && (
                  <p className="mt-1 text-[11px] text-destructive">{formErrors.password}</p>
                )}
              </div>

              <div className="mt-6 flex justify-end gap-2 border-t border-border pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isCreating}
                  className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted disabled:opacity-60 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-md disabled:opacity-60 cursor-pointer"
                >
                  {isCreating && <Icon icon="lucide:loader-2" className="text-sm animate-spin" />}
                  {isCreating ? "Saving..." : "Create student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}