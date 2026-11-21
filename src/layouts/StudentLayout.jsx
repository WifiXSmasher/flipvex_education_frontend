import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useAuth } from "@/auth/AuthContext";
import { STUDENT_NAV_ITEMS } from "@/config/navigation";
import TermProgressCard from "@/pages/student/components/TermProgressCard";

export default function StudentLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const displayName = user?.first_name ? `${user.first_name} ${user.last_name || ""}`.trim() : (user?.name || "Student");

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const renderNavLinks = (onItemClick) => (
    <nav className="mt-3 space-y-1">

      {STUDENT_NAV_ITEMS.map((item) => (
        <NavLink
          key={item.name}
          to={item.to}
          onClick={onItemClick}
          className={({ isActive }) =>
            `flex min-h-11 items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${isActive
              ? "bg-primary text-primary-foreground shadow-md font-bold"
              : "font-semibold hover:bg-muted text-foreground"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon
                icon={item.icon}
                className={`text-lg ${isActive ? "text-primary-foreground" : "text-tertiary"}`}
              />
              {item.name}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen w-full bg-background flex flex-col relative pb-16 lg:pb-0">
      <div className="flex flex-1">

        {/* Desktop Sidebar (Fixed) */}
        <aside className="hidden w-72 shrink-0 border-r border-border bg-card p-5 lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:flex lg:flex-col lg:overflow-y-auto">
          <NavLink className="flex items-center gap-3 shrink-0" to="/student/dashboard">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
              <Icon icon="lucide:graduation-cap" className="text-2xl" />
            </span>
            <span>
              <span className="block font-heading text-xl font-bold tracking-tight">Learnova</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Student portal
              </span>
            </span>
          </NavLink>

          {/* Progress Card in SlideBar */}
          <div className="mt-6 shrink-0">
            <TermProgressCard compact />
          </div>

          <p className="mt-8 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground shrink-0">
            Learning space
          </p>
          <div className="flex-1 overflow-y-auto">
            {renderNavLinks()}
          </div>

          <div className="mt-auto border-t border-border pt-4 shrink-0">
            <button
              type="button"
              onClick={() => navigate("/student/profile")}
              className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold hover:bg-muted text-foreground cursor-pointer"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white shadow-sm ring-2 ring-emerald-100">
                  {initials}
              </div>
              {displayName}
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-1 flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 cursor-pointer"
            >
              <Icon icon="lucide:log-out" className="text-lg" />
              Logout
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="fixed inset-0 bg-black/50 transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <aside className="relative flex w-72 max-w-xs flex-col bg-card p-5 shadow-xl">
              <div className="flex items-center justify-between">
                <NavLink
                  className="flex items-center gap-3"
                  to="/student/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
                    <Icon icon="lucide:graduation-cap" className="text-2xl" />
                  </span>
                  <span>
                    <span className="block font-heading text-xl font-bold tracking-tight">Learnova</span>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      Student portal
                    </span>
                  </span>
                </NavLink>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border cursor-pointer"
                  aria-label="Close menu"
                >
                  <Icon icon="lucide:x" className="text-lg" />
                </button>
              </div>

              <div className="mt-6 rounded-2xl bg-primary p-4 text-primary-foreground shadow-md">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em]">Spring 2026</p>
                <p className="mt-2 font-heading text-base font-bold">Product Design</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-card">
                  <div className="h-full w-3/4 rounded-full bg-secondary" />
                </div>
              </div>

              <div className="mt-3 overflow-y-auto flex-1">
                {renderNavLinks(() => setIsMobileMenuOpen(false))}
              </div>

              <div className="border-t border-border pt-4 mt-auto">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate("/student/profile");
                  }}
                  className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold hover:bg-muted text-foreground cursor-pointer"
                >
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Maya Patel"
                  />
                  Profile
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-1 flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 cursor-pointer"
                >
                  <Icon icon="lucide:log-out" className="text-lg" />
                  Logout
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="min-w-0 flex-1 lg:pl-72">
          <header className="sticky top-0 z-20 flex min-h-20 items-center justify-between border-b border-border bg-card/95 backdrop-blur-md px-5 lg:px-10">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open student navigation"
                className="flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-border lg:hidden text-foreground hover:bg-muted cursor-pointer"
              >
                <Icon icon="lucide:menu" className="text-xl" />
              </button>
              <div className="relative hidden md:block">
                <Icon icon="lucide:search" className="absolute left-4 top-3.5 text-muted-foreground" />
                <input
                  aria-label="Search student resources"
                  className="min-h-11 w-80 rounded-xl border border-input bg-background pl-11 pr-4 text-xs font-medium outline-none focus:border-tertiary text-foreground"
                  placeholder="Search classes, lessons or help"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="View notifications"
                className="relative flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-border bg-card text-foreground hover:bg-muted cursor-pointer"
              >
                <Icon icon="lucide:bell" className="text-lg" />
                <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-secondary" />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white shadow-sm ring-2 ring-emerald-100">
                  {initials}
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-bold text-foreground">{displayName}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">Student · Learnova</p>
                </div>
              </div>
            </div>
          </header>

          <div className="px-5 py-7 lg:px-10 lg:py-9">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}