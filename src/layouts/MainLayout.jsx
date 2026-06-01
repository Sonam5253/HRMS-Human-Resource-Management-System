// MainLayout.jsx

import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { Menu, User } from "lucide-react";

import Sidebar from "../components/layout/sidebar";
import Topbar from "../components/layout/topbar";

export default function MainLayout() {
  const reduxUser = useSelector((state) => state.auth.user);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const user = reduxUser || storedUser;

  const role = user?.role
    ?.toLowerCase()
    ?.replace(/\s+/g, "_");

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarWidth = collapsed ? 74 : 230;

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        role={role}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div
        className={`
          flex min-h-screen flex-col transition-all duration-300
          ${collapsed ? "md:ml-[74px]" : "md:ml-[230px]"}
        `}
      >
        <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-2 md:hidden">
          <div className="flex items-center">
            <button
              onClick={() => setMobileOpen(true)}
              className="flex items-center justify-center rounded-lg p-2 transition hover:bg-slate-100"
            >
              <Menu size={20} className="text-slate-700" />
            </button>

            <span className="ml-2 text-sm font-semibold text-slate-800">
              HRMS Pro
            </span>
          </div>

          <Link
            to="/profile"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-700 transition hover:bg-slate-300"
          >
            <User size={18} />
          </Link>
        </div>

        <div className="sticky top-0 z-20 hidden md:block">
          <Topbar />
        </div>

        <main className="flex-1 overflow-x-hidden px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4 lg:px-5 lg:py-4">
          <div className="mx-auto w-full max-w-[1600px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}