export const STUDENT_NAV_ITEMS = [
  { name: "Dashboard", to: "/student/dashboard", icon: "lucide:layout-dashboard" },
  { name: "My Courses", to: "/student/courses", icon: "lucide:book-open" },
  { name: "Attendance", to: "/student/attendance", icon: "lucide:calendar-check-2" },
  { name: "Assignments", to: "/student/assignments", icon: "lucide:clipboard-check" },
];



// For Courses status styling - Admin/views/CourseView.jsx
export const STATUS_STYLES = {
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

export const LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];


//---------------------------------------------------------

export const INSTRUCTOR_STATUS_STYLES = {
  active: {
    label: "Active",
    badge: "bg-accent text-tertiary",
    dot: "bg-tertiary",
  },
  on_leave: {
    label: "On leave",
    badge: "bg-secondary/30 text-foreground",
    dot: "bg-secondary",
  },
  inactive: {
    label: "Inactive",
    badge: "bg-destructive/10 text-destructive",
    dot: "bg-destructive",
  },
};

export const INSTRUCTOR_STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "on_leave", label: "On leave" },
  { value: "inactive", label: "Inactive" },
];
