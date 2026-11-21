import { useState } from "react";
import { useNavigate } from "react-router";
import { Icon } from "@iconify/react";
import { useAuth } from "@/auth/AuthContext";
import { ADMIN_NAV_GROUPS } from "@/config/adminNavConfig";

export default function AdminLayout({
  activeNav,
  onSelectNav,
  search = "",
  onSearchChange,
  subtitle = "Monitor your institute’s performance and daily operations.",
  headerActions,
  children,
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const displayName = user?.first_name
    ? `${user.first_name} ${user.last_name || ""}`.trim()
    : (user?.name || user?.email?.split("@")[0] || "Administrator");
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const renderSidebarBody = ({ mobile = false } = {}) => (
    <>
      {/* Brand Header */}
      <div className="flex items-center justify-between gap-3 px-1">
        <button
          type="button"
          onClick={() => {
            onSelectNav?.("overview");
            if (mobile) setSidebarOpen(false);
          }}
          className="flex items-center gap-3 text-left cursor-pointer"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
            <Icon icon="lucide:graduation-cap" className="text-2xl" />
          </span>
          <span>
            <span className="block font-heading text-xl font-bold tracking-tight text-foreground">
              Learnova
            </span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Admin atelier
            </span>
          </span>
        </button>

        {mobile && (
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
          >
            <Icon icon="lucide:x" className="text-lg" />
          </button>
        )}
      </div>

      {/* Academic Term / Workspace Card */}
      {/* <div className="mt-8 rounded-2xl bg-primary p-5 text-primary-foreground shadow-md">
        <div className="flex items-center justify-between">
          <p className="text-[8px] font-bold uppercase tracking-[0.18em]">
            Academic 2026–27
          </p>
          <Icon icon="lucide:sparkles" className="text-md text-secondary" />
        </div>
        <p className="mt-3 font-heading text-md font-bold">Admin Workspace</p>
        <p className="mt-1 text-xs text-primary-foreground/85">
          Institute operations &amp; portal control
        </p>
        <div className="mt-4 flex items-center gap-2">
          <span className="h-1.5 flex-1 rounded-full bg-card" />
          <span className="h-1.5 w-8 rounded-full bg-secondary" />
        </div>
       
      </div> */}

      {/* Grouped Navigation */}
      <nav className="mt-8 flex-1 space-y-7 overflow-y-auto pr-0.5">
        {ADMIN_NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="mb-2.5 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.items.map(({ id, label, icon: IconComp, iconName, count }) => {
                const isActive = activeNav === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      onSelectNav(id);
                      if (mobile) setSidebarOpen(false);
                    }}
                    className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors cursor-pointer ${
                      isActive
                        ? "bg-primary font-bold text-primary-foreground shadow-md"
                        : "font-semibold text-foreground hover:bg-muted"
                    }`}
                  >
                    {typeof IconComp === "function" ? (
                      <IconComp
                        size={18}
                        className={isActive ? "text-primary-foreground" : "text-tertiary"}
                      />
                    ) : (
                      <Icon
                        icon={iconName || "lucide:circle"}
                        className={`text-lg ${
                          isActive ? "text-primary-foreground" : "text-tertiary"
                        }`}
                      />
                    )}
                    <span className="truncate">{label}</span>
                    {count !== undefined && count !== null && (
                      <span
                        className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          isActive
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-accent text-tertiary"
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer Profile & Logout */}
      <div className="mt-auto border-t border-border pt-4">
        <div className="flex items-center gap-3 rounded-xl px-3 py-2 text-left">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={displayName}
              className="h-9 w-9 shrink-0 rounded-full border-2 border-secondary object-cover"
            />
          ) : (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-secondary bg-accent text-xs font-bold text-tertiary">
              {initials}
            </span>
          )}
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-foreground">
              {displayName}
            </span>
            <span className="block truncate text-[10px] font-medium text-muted-foreground">
              {user?.role || "Course administrator"}
            </span>
          </span>
          <Icon icon="lucide:chevron-down" className="text-base text-muted-foreground" />
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-1 flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-destructive hover:bg-muted transition-colors cursor-pointer"
        >
          <Icon icon="lucide:log-out" className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen w-full bg-background font-sans text-foreground">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 shrink-0 flex-col border-r border-border bg-card p-5 lg:flex">
        {renderSidebarBody({ mobile: false })}
      </aside>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/45 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative flex w-72 max-w-xs flex-col border-r border-border bg-card p-5 shadow-xl">
            {renderSidebarBody({ mobile: true })}
          </aside>
        </div>
      )}

      {/* Main Content Shell */}
      <main className="min-w-0 lg:pl-72">
        <header className="sticky top-0 z-20 flex min-h-20 items-center justify-between border-b border-border bg-card px-5 lg:px-10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open admin navigation"
              className="flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-border bg-card text-foreground hover:bg-muted lg:hidden cursor-pointer"
            >
              <Icon icon="lucide:menu" className="text-xl" />
            </button>

            {onSearchChange ? (
              <div className="relative hidden md:block">
                <Icon
                  icon="lucide:search"
                  className="absolute left-4 top-3.5 text-sm text-muted-foreground"
                />
                <input
                  aria-label="Search workspace"
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search title, slug, or ID"
                  className="min-h-11 w-80 rounded-xl border border-input bg-background pl-11 pr-4 text-xs font-medium text-foreground outline-none focus:border-tertiary"
                />
              </div>
            ) : (
              <div>
                <p className="text-sm font-bold text-foreground">
                  Good morning, {displayName}.
                </p>
                <p className="mt-0.5 hidden text-xs text-muted-foreground sm:block">
                  {subtitle}
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {headerActions}

            <button
              type="button"
              aria-label="View notifications"
              className="relative flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-border bg-card text-foreground hover:bg-muted cursor-pointer"
            >
              <Icon icon="lucide:bell" className="text-lg" />
              <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-secondary" />
            </button>

            <div className="flex items-center gap-3">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={displayName}
                  className="h-10 w-10 rounded-full border-2 border-secondary object-cover"
                />
              ) : (
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-secondary bg-primary text-xs font-bold text-primary-foreground">
                  {initials}
                </span>
              )}
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-foreground">{displayName}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  {user?.role || "Super administrator"}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="px-5 py-7 lg:px-10 lg:py-9">
          {children}

          <footer className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 pb-2 text-[11px] text-muted-foreground">
            <span>© 2026 Learnova. All rights reserved.</span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-tertiary" />
              All systems operational
            </span>
          </footer>
        </div>
      </main>
    </div>
  );
}