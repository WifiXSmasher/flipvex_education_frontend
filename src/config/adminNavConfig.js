export const ADMIN_NAV_GROUPS = [
  {
    label: "OVERVIEW",
    items: [
      { id: "Dashboard", label: "Dashboard", iconName: "lucide:layout-dashboard" },
      { id: "Analytics", label: "Analytics", iconName: "lucide:bar-chart-3" },
    ],
  },
  {
    label: "ACADEMIC",
    items: [
      { id: "Students", label: "Students", iconName: "lucide:users" },
      { id: "Instructors", label: "Instructors", iconName: "lucide:graduation-cap" },
      { id: "Courses", label: "Courses", iconName: "lucide:book-open" },
      { id: "Batches", label: "Batches", iconName: "lucide:calendar-days" },
      { id: "Attendance", label: "Attendance", iconName: "lucide:clipboard-check" },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      { id: "Fees & Payments", label: "Fees & Payments", iconName: "lucide:wallet" },
      { id: "Assignments", label: "Assignments", iconName: "lucide:file-text" },
      { id: "Messages", label: "Messages", iconName: "lucide:message-square", count: "4" },
    ],
  },
];
