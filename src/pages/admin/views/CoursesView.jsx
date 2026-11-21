import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { useAdminCourses } from "@/hooks/useAdminCourses";

/* ---------- constants ---------- */

const STATUS_STYLES = {
  published: {
    label: "Published",
    badge: "bg-accent text-tertiary",
    dot: "bg-tertiary",
  },
  draft: {
    label: "Draft",
    badge: "bg-secondary/30 text-foreground",
    dot: "bg-secondary",
  },
  archived: {
    label: "Archived",
    badge: "bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
  },
};

const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

const LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const LEVEL_LABELS = Object.fromEntries(LEVELS.map((l) => [l.value, l.label]));

const EMPTY_FORM = {
  title: "",
  category: "",
  short_description: "",
  description: "",
  level: "beginner",
  duration_weeks: "",
  fee: "",
  status: "draft",
};

const ITEMS_PER_PAGE = 5;

/* ---------- helpers ---------- */

const feeFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const formatFee = (fee) =>
  fee === null || fee === undefined || fee === "" ? "—" : feeFormatter.format(Number(fee));

const formatDuration = (weeks) =>
  weeks ? `${weeks} ${Number(weeks) === 1 ? "week" : "weeks"}` : "—";

const inputClass = (hasError) =>
  `w-full rounded-xl border bg-background px-3 py-2.5 text-xs text-foreground outline-none focus:border-tertiary ${
    hasError ? "border-destructive" : "border-input"
  }`;

const courseToForm = (course) => ({
  title: course?.title ?? "",
  category: course?.category ? String(course.category) : "",
  short_description: course?.short_description ?? "",
  description: course?.description ?? "",
  level: course?.level ?? "beginner",
  duration_weeks: course?.duration_weeks ?? "",
  fee: course?.fee ?? "",
  status: course?.status ?? "draft",
});

/* ---------- subcomponents ---------- */

function Field({ label, htmlFor, error, className = "", children }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold text-foreground">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-[11px] text-destructive">{error}</p>}
    </div>
  );
}

function CourseFormModal({
  mode = "create",
  initialCourse = null,
  categories,
  errors = {},
  isSubmitting,
  onClose,
  onSubmit,
}) {
  const isEdit = mode === "edit";
  const [form, setForm] = useState(() => (isEdit ? courseToForm(initialCourse) : EMPTY_FORM));
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [localErrors, setLocalErrors] = useState({});

  useEffect(() => {
    setForm(isEdit ? courseToForm(initialCourse) : EMPTY_FORM);
    setThumbnail(null);
    setLocalErrors({});
  }, [isEdit, initialCourse]);

  useEffect(() => {
    if (!thumbnail) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(thumbnail);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [thumbnail]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const setField = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    setLocalErrors((e) => ({ ...e, [name]: "" }));
  };

  const errorFor = (name) => localErrors[name] || errors?.[name];

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = "Title is required";
    if (form.duration_weeks !== "" && Number(form.duration_weeks) < 1) {
      next.duration_weeks = "Must be at least 1 week";
    }
    if (form.fee !== "" && Number(form.fee) < 0) {
      next.fee = "Fee cannot be negative";
    }
    setLocalErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({
      title: form.title.trim(),
      category: form.category,
      short_description: form.short_description.trim(),
      description: form.description.trim(),
      level: form.level,
      duration_weeks: form.duration_weeks,
      fee: form.fee,
      ...(isEdit ? { status: form.status } : {}),
      thumbnail,
    });
  };

  const displayImage = preview || (isEdit ? initialCourse?.thumbnail : null);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="course-modal-title"
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-card text-card-foreground shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-border px-5 py-4 sm:px-6">
          <div>
            <h2 id="course-modal-title" className="text-sm font-bold text-foreground">
              {isEdit ? `Edit course — ${initialCourse?.title}` : "Add new course"}
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {isEdit
                ? "Update course metadata, pricing, duration, or publishing status."
                : "New courses are saved as drafts until you publish them."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted cursor-pointer"
          >
            <Icon icon="lucide:x" className="text-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4 px-5 py-5 sm:px-6">
          {errors?.form && (
            <div role="alert" className="rounded-xl bg-destructive/10 p-3 text-xs text-destructive">
              {errors.form}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Title *"
              htmlFor="course-title"
              error={errorFor("title")}
              className={isEdit ? "" : "sm:col-span-2"}
            >
              <input
                id="course-title"
                autoFocus
                value={form.title}
                onChange={(e) => setField("title", e.target.value)}
                placeholder="e.g. Python Basics"
                className={inputClass(errorFor("title"))}
              />
            </Field>

            {isEdit && (
              <Field label="Status" htmlFor="course-status" error={errorFor("status")}>
                <select
                  id="course-status"
                  value={form.status}
                  onChange={(e) => setField("status", e.target.value)}
                  className={inputClass(errorFor("status"))}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </Field>
            )}

            <Field label="Category" htmlFor="course-category" error={errorFor("category")}>
              <select
                id="course-category"
                value={form.category}
                onChange={(e) => setField("category", e.target.value)}
                className={inputClass(errorFor("category"))}
              >
                <option value="">No category</option>
                {categories.map((c) => (
                  <option key={c.id} value={String(c.id)}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Level" htmlFor="course-level" error={errorFor("level")}>
              <select
                id="course-level"
                value={form.level}
                onChange={(e) => setField("level", e.target.value)}
                className={inputClass(errorFor("level"))}
              >
                {LEVELS.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="Duration (weeks)"
              htmlFor="course-duration"
              error={errorFor("duration_weeks")}
            >
              <input
                id="course-duration"
                type="number"
                min="1"
                step="1"
                value={form.duration_weeks}
                onChange={(e) => setField("duration_weeks", e.target.value)}
                placeholder="8"
                className={inputClass(errorFor("duration_weeks"))}
              />
            </Field>

            <Field label="Fee (₹)" htmlFor="course-fee" error={errorFor("fee")}>
              <input
                id="course-fee"
                type="number"
                min="0"
                step="0.01"
                value={form.fee}
                onChange={(e) => setField("fee", e.target.value)}
                placeholder="4999.00"
                className={inputClass(errorFor("fee"))}
              />
            </Field>

            <Field
              label="Short description"
              htmlFor="course-short"
              error={errorFor("short_description")}
              className="sm:col-span-2"
            >
              <input
                id="course-short"
                value={form.short_description}
                onChange={(e) => setField("short_description", e.target.value)}
                placeholder="One line shown on course cards"
                className={inputClass(errorFor("short_description"))}
              />
            </Field>

            <Field
              label="Description"
              htmlFor="course-description"
              error={errorFor("description")}
              className="sm:col-span-2"
            >
              <textarea
                id="course-description"
                rows={4}
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                placeholder="Full course details. Required before the course can be published."
                className={inputClass(errorFor("description"))}
              />
            </Field>

            <Field
              label="Thumbnail"
              htmlFor="course-thumbnail"
              error={errorFor("thumbnail")}
              className="sm:col-span-2"
            >
              <label
                htmlFor="course-thumbnail"
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-input bg-background p-3 hover:border-tertiary"
              >
                {displayImage ? (
                  <img
                    src={displayImage}
                    alt="Thumbnail preview"
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent text-tertiary">
                    <Icon icon="lucide:image-plus" className="text-xl" />
                  </div>
                )}
                <div className="min-w-0 text-xs">
                  <p className="truncate font-semibold text-foreground">
                    {thumbnail ? thumbnail.name : "Choose an image"}
                  </p>
                  <p className="mt-0.5 text-muted-foreground">PNG or JPG. Optional.</p>
                </div>
              </label>
              <input
                id="course-thumbnail"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => setThumbnail(e.target.files?.[0] ?? null)}
              />
            </Field>
          </div>

          <div className="flex justify-end gap-2 border-t border-border pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted disabled:opacity-60 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-md disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting
                ? "Saving..."
                : isEdit
                  ? "Save changes"
                  : "Create course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteCourseModal({ course, isDeleting, onClose, onConfirm }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && !isDeleting && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, isDeleting]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && !isDeleting && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-course-title"
        className="w-full max-w-md rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-2xl"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
          <Icon icon="lucide:trash-2" className="text-xl" />
        </div>
        <h2 id="delete-course-title" className="mt-4 text-base font-bold text-foreground">
          Delete course?
        </h2>
        <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
          You are about to remove <span className="font-semibold text-foreground">{course.title}</span>.
          This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted disabled:opacity-60 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(course.id)}
            disabled={isDeleting}
            className="rounded-xl bg-destructive px-4 py-2 text-xs font-semibold text-white shadow-md hover:opacity-95 disabled:opacity-60 cursor-pointer"
          >
            {isDeleting ? "Deleting..." : "Delete course"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- main view ---------- */

export default function CoursesView({ search: searchProp = "" }) {
  const {
    courses,
    count,
    categories,
    isLoading,
    error,
    reload,
    setSearch,
    isModalOpen,
    openModal,
    closeModal,
    createCourse,
    isCreating,
    formErrors,
    updateCourse,
    deleteCourse,
    isUpdating = false,
    isDeleting = false,
    updateErrors = {},
  } = useAdminCourses();

  const [localCourses, setLocalCourses] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [editingCourse, setEditingCourse] = useState(null);
  const [deletingCourse, setDeletingCourse] = useState(null);
  const [localActionError, setLocalActionError] = useState("");

  useEffect(() => {
    setLocalCourses(null);
  }, [courses]);

  const activeCourses = localCourses ?? courses;

  useEffect(() => {
    setSearch(searchProp);
    setCurrentPage(1);
  }, [searchProp, setSearch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter, levelFilter, statusFilter]);

  const filteredCourses = useMemo(
    () =>
      activeCourses.filter((course) => {
        const matchesCategory =
          categoryFilter === "All" || String(course.category) === categoryFilter;
        const matchesLevel = levelFilter === "All" || course.level === levelFilter;
        const matchesStatus = statusFilter === "All" || course.status === statusFilter;
        return matchesCategory && matchesLevel && matchesStatus;
      }),
    [activeCourses, categoryFilter, levelFilter, statusFilter]
  );

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedCourses = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredCourses.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCourses, safePage]);

  const pageNumbers = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  const countByStatus = (status) => activeCourses.filter((c) => c.status === status).length;
  const totalCount = localCourses ? localCourses.length : count || activeCourses.length;

  const hasActiveFilters =
    Boolean(searchProp) ||
    categoryFilter !== "All" ||
    levelFilter !== "All" ||
    statusFilter !== "All";

  const handleResetFilters = () => {
    setSearch("");
    setCategoryFilter("All");
    setLevelFilter("All");
    setStatusFilter("All");
    setCurrentPage(1);
  };

  const handleUpdateSubmit = async (payload) => {
    if (!editingCourse) return;
    setLocalActionError("");

    if (typeof updateCourse === "function") {
      const ok = await updateCourse(editingCourse.id, payload);
      if (ok !== false) setEditingCourse(null);
      return;
    }

    const matchedCategory = categories.find((c) => String(c.id) === String(payload.category));
    setLocalCourses((prev) =>
      (prev ?? courses).map((item) =>
        item.id === editingCourse.id
          ? {
              ...item,
              ...payload,
              category: payload.category || null,
              category_name: matchedCategory?.name ?? "",
            }
          : item
      )
    );
    setEditingCourse(null);
  };

  const handleConfirmDelete = async (courseId) => {
    setLocalActionError("");

    if (typeof deleteCourse === "function") {
      const ok = await deleteCourse(courseId);
      if (ok !== false) setDeletingCourse(null);
      return;
    }

    setLocalCourses((prev) => (prev ?? courses).filter((item) => item.id !== courseId));
    setDeletingCourse(null);
  };

  const combinedError = error || localActionError;

  const emptyMessage = searchProp
    ? "No courses match your search."
    : activeCourses.length === 0
      ? 'No courses yet. Click "Add new course" to create one.'
      : "No courses match your filters.";

  const startItem = filteredCourses.length === 0 ? 0 : (safePage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(safePage * ITEMS_PER_PAGE, filteredCourses.length);

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
              Your course catalog, thoughtfully managed.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-primary-foreground/90">
              A refined workspace for course content, publishing states, and commercial details.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 border-t border-white/15 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary-foreground">
              Course management
            </p>
            <button
              type="button"
              onClick={openModal}
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-secondary px-5 py-3 text-sm font-bold text-secondary-foreground shadow-md hover:opacity-95 transition-opacity cursor-pointer"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                <Icon icon="lucide:plus" className="text-lg text-primary-foreground" />
              </span>
              <span>Add new course</span>
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
              <Icon icon="lucide:layers" className="text-lg" />
            </div>
            <span className="rounded-full bg-muted px-2 py-1 text-[10px] font-bold text-muted-foreground">
              All records
            </span>
          </div>
          <p className="mt-5 font-heading text-3xl font-bold">
            {String(totalCount).padStart(2, "0")}
          </p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
            Total courses
          </p>
        </article>

        <article className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-md">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-tertiary">
              <Icon icon="lucide:check-circle-2" className="text-lg" />
            </div>
            <span className="rounded-full bg-accent px-2 py-1 text-[10px] font-bold text-tertiary">
              Live
            </span>
          </div>
          <p className="mt-5 font-heading text-3xl font-bold">
            {String(countByStatus("published")).padStart(2, "0")}
          </p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
            Published
          </p>
        </article>

        <article className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-md">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
              <Icon icon="lucide:clock" className="text-lg" />
            </div>
            <span className="rounded-full bg-secondary/30 px-2 py-1 text-[10px] font-bold text-foreground">
              In review
            </span>
          </div>
          <p className="mt-5 font-heading text-3xl font-bold">
            {String(countByStatus("draft")).padStart(2, "0")}
          </p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
            Drafts
          </p>
        </article>

        <article className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-md">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <Icon icon="lucide:archive" className="text-lg" />
            </div>
            <span className="rounded-full bg-muted px-2 py-1 text-[10px] font-bold text-muted-foreground">
              Inactive
            </span>
          </div>
          <p className="mt-5 font-heading text-3xl font-bold">
            {String(countByStatus("archived")).padStart(2, "0")}
          </p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
            Archived
          </p>
        </article>
      </div>

      {/* Catalog Table Card */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-5 sm:px-6">
          <div>
            <h2 className="text-sm font-bold text-foreground">Course catalog</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Manage programs, durations, fees, and publishing status
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              aria-label="Filter by category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-xl border border-input bg-background px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-tertiary"
            >
              <option value="All">All categories</option>
              {categories.map((c) => (
                <option key={c.id} value={String(c.id)}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              aria-label="Filter by level"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="rounded-xl border border-input bg-background px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-tertiary"
            >
              <option value="All">All levels</option>
              {LEVELS.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>

            <select
              aria-label="Filter by status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-input bg-background px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-tertiary"
            >
              <option value="All">All statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>

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

        {combinedError && (
          <div
            role="alert"
            className="mx-5 mb-4 flex items-center justify-between gap-3 rounded-xl bg-destructive/10 p-3 text-xs text-destructive sm:mx-6"
          >
            <span>{combinedError}</span>
            <button type="button" onClick={reload} className="font-semibold underline cursor-pointer">
              Retry
            </button>
          </div>
        )}

        <div
          className={`overflow-x-auto transition-opacity ${
            isLoading && activeCourses.length ? "opacity-60" : ""
          }`}
        >
          
          <table className="w-full min-w-[820px] text-left">
            <thead>
              <tr className="border-y border-border bg-accent text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-3">Course</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Level</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Fee</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCourses.map((course) => {
                const statusStyle = STATUS_STYLES[course.status] ?? STATUS_STYLES.draft;
                return (
                  <tr
                    key={course.id}
                    className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {course.thumbnail ? (
                          <img
                            src={course.thumbnail}
                            alt=""
                            className="h-9 w-9 shrink-0 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                            <Icon icon="lucide:book-open" className="text-base" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="max-w-[240px] truncate text-xs font-semibold text-foreground">
                            {course.title}
                          </p>
                          <p className="mt-0.5 max-w-[240px] truncate text-[10px] text-muted-foreground">
                            {course.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs font-medium text-foreground">
                      {course.category_name || "Uncategorized"}
                    </td>
                    <td className="px-4 py-4 text-xs text-muted-foreground">
                      {LEVEL_LABELS[course.level] ?? "—"}
                    </td>
                    <td className="px-4 py-4 text-xs text-muted-foreground">
                      {formatDuration(course.duration_weeks)}
                    </td>
                    <td className="px-4 py-4 text-xs font-semibold text-foreground">
                      {formatFee(course.fee)}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyle.badge}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
                        {statusStyle.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingCourse(course)}
                          aria-label={`Edit ${course.title}`}
                          title="Edit course"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-colors cursor-pointer"
                        >
                          <Icon icon="lucide:pencil" className="text-sm" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingCourse(course)}
                          aria-label={`Delete ${course.title}`}
                          title="Delete course"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                        >
                          <Icon icon="lucide:trash-2" className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {isLoading && activeCourses.length === 0 && (
            <p className="px-6 py-10 text-center text-sm text-muted-foreground">
              Loading courses...
            </p>
          )}
          {!isLoading && !error && filteredCourses.length === 0 && (
            <p className="px-6 py-10 text-center text-sm text-muted-foreground">{emptyMessage}</p>
          )}
        </div>

        {/* Pagination Footer */}
        {filteredCourses.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-4 sm:px-6">
            <p className="text-xs text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{startItem}</span>–
              <span className="font-semibold text-foreground">{endItem}</span> of{" "}
              <span className="font-semibold text-foreground">{filteredCourses.length}</span> courses
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

      {/* Create Course Modal */}
      {isModalOpen && (
        <CourseFormModal
          mode="create"
          categories={categories}
          errors={formErrors}
          isSubmitting={isCreating}
          onClose={closeModal}
          onSubmit={createCourse}
        />
      )}

      {/* Edit Course Modal */}
      {editingCourse && (
        <CourseFormModal
          mode="edit"
          initialCourse={editingCourse}
          categories={categories}
          errors={updateErrors}
          isSubmitting={isUpdating}
          onClose={() => setEditingCourse(null)}
          onSubmit={handleUpdateSubmit}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingCourse && (
        <DeleteCourseModal
          course={deletingCourse}
          isDeleting={isDeleting}
          onClose={() => setDeletingCourse(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </section>
  );
}