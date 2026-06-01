// Sidebar.jsx

import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  PanelLeft,
  ChevronDown,
  Settings,
  LogOut,
} from "lucide-react";
import { sidebarItems } from "../../constants/sidebarConfig";

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  role,
}) {
  const { pathname } = useLocation();

  const [openMenu, setOpenMenu] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  // fixed width so route change pe jump na ho
  const sidebarWidth = collapsed ? 74 : 230;

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [pathname, setMobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredItems = sidebarItems.filter((item) =>
    item.roles.includes(role)
  );

  useEffect(() => {
    const activeParent = filteredItems.find((item) =>
      item.children?.some((sub) => pathname.startsWith(sub.path))
    );

    if (activeParent) {
      setOpenMenu(activeParent.path);
    }
  }, [pathname, filteredItems]);

  const linkClass = (active) => `
    group relative flex items-center rounded-lg text-[13px] font-medium
    transition-colors duration-200
    ${collapsed
      ? "mx-auto h-11 w-11 justify-center"
      : "h-10 gap-2.5 px-3"
    }
    ${active
      ? "bg-brand text-white"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }
  `;

  return (
    <>
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        style={{
          width: `${sidebarWidth}px`,
        }}
        className={`fixed left-0 top-0 z-40 h-full max-h-[100vh] border-r border-slate-200 bg-white
        transition-transform duration-300 ease-in-out
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="flex h-full flex-col ">
          {/* HEADER */}
          <div className="mt-2 px-3">
            <div className="flex items-center gap-2">
              {!collapsed && (
                <div className="flex min-w-0 flex-1 items-center overflow-hidden">
                  <div className="flex h-8 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-sm font-bold text-white">
                    H
                  </div>

                  <div className="ml-2 min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      HRMS
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Management
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={() => setCollapsed(!collapsed)}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100 ${collapsed ? "mx-auto" : ""
                  }`}
              >
                <PanelLeft size={16} />
              </button>
            </div>

            {!collapsed && (
              <div className="mt-2 h-px w-full bg-slate-200" />
            )}
          </div>

          {/* NAVIGATION */}
          <nav className="flex-1 overflow-y-auto px-2 py-4">
            <div className="space-y-1">
              {filteredItems.map((item) => {
                const Icon = item.icon;
                const hasChildren = item.children;
                const itemPath = item.getPath ? item.getPath(role) : item.path;

                const isActive =
                  pathname === itemPath ||
                  item.children?.some((sub) =>
                    pathname.startsWith(sub.path)
                  );

                return (
                  <div key={itemPath}>
                    {hasChildren ? (
                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === item.path ? null : item.path
                          )
                        }
                        className={`${linkClass(isActive)} w-full`}
                      >
                        <Icon size={18} className="shrink-0" />

                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate text-left">
                              {item.label}
                            </span>

                            <ChevronDown
                              size={14}
                              className={`transition-transform duration-200 ${openMenu === item.path ? "rotate-180" : ""
                                }`}
                            />
                          </>
                        )}
                      </button>
                    ) : (
                      <Link
                        to={itemPath}
                        className={linkClass(isActive)}
                      >
                        <Icon size={18} className="shrink-0" />

                        {!collapsed && (
                          <span className="truncate">{item.label}</span>
                        )}
                      </Link>
                    )}

                    {!collapsed &&
                      hasChildren &&
                      openMenu === item.path && (
                        <div className="ml-8 mt-1 space-y-1">
                          {item.children.map((sub) => {
                            const subActive = pathname.startsWith(sub.path);

                            return (
                              <Link
                                key={sub.path}
                                to={sub.path}
                                className={`flex h-8 items-center rounded-md px-2.5 text-[12px] transition-colors
                                ${subActive
                                    ? "bg-brand/10 font-medium text-brand"
                                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                                  }`}
                              >
                                {sub.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* MOBILE PROFILE */}
          <div
            ref={profileRef}
            className="relative border-t border-slate-100 p-2 md:hidden"
          >
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className={`flex w-full items-center rounded-xl text-slate-600 transition hover:bg-slate-100
              ${collapsed ? "h-11 justify-center" : "gap-3 px-3 py-2.5"}`}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
                S
              </div>

              {!collapsed && (
                <div className="min-w-0 flex-1 text-left">
                  <p className="truncate text-[13px] font-medium text-slate-800">
                    My Profile
                  </p>
                  <p className="truncate text-[11px] text-slate-400">
                    sonam@example.com
                  </p>
                </div>
              )}
            </button>

            {profileOpen && (
              <div className="absolute bottom-16 left-2 right-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                <Link
                  to="/settings"
                  className="flex items-center gap-3 px-4 py-3 text-[13px] text-slate-700 hover:bg-slate-100"
                >
                  <Settings size={16} />
                  Settings
                </Link>

                <Link
                  to="/login"
                  className="flex items-center gap-3 border-t border-slate-100 px-4 py-3 text-[13px] text-red-500 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Logout
                </Link>
              </div>
            )}
          </div>


        </div>
      </aside>
    </>
  );
}