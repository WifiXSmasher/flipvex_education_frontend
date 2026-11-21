import { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import Overview from "./views/OverviewView";
import StudentView from "./views/StudentsView";
import CourseView from "./views/CoursesView";
import InstructorView from "./views/InstructorsView";

const VIEW_SUBTITLES = {
  Dashboard: "Monitor your institute’s performance and daily operations.",
  Students: "Manage student enrollments, batches, and academic progress.",
  Courses: "Manage programs, syllabi, pricing, and departmental courses.",
  Instructors: "Manage faculty members, teaching allocations, and contact details.",
};

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [search, setSearch] = useState("");

  const handleNavChange = (navId) => {
    setActiveNav(navId);
    setSearch("");
  };

  const renderActiveView = () => {
    switch (activeNav) {
      case "Dashboard":
      case "Overview":
        return <Overview search={search} />;
      case "Students":
        return <StudentView search={search} />;
      case "Instructors":
        return <InstructorView search={search} />;
      case "Courses":
        return <CourseView search={search} />;
      default:
        return (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 p-12 text-center text-sm text-slate-400">
            <p className="font-semibold text-slate-600">{activeNav} view</p>
            <p className="mt-1">This module is under development.</p>
          </div>
        );
    }
  };

  return (
    <AdminLayout
      activeNav={activeNav}
      onSelectNav={handleNavChange}
      search={search}
      onSearchChange={setSearch}
      subtitle={VIEW_SUBTITLES[activeNav] || "Institute workspace and operations."}
    >
      {renderActiveView()}
    </AdminLayout>
  );
}
