import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { logout } from "../../features/auth/authSlice";

export default function Topbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 h-14 border-b border-slate-200 bg-white px-4 md:px-5 flex items-center justify-end">
      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2">
        {/* NOTIFICATION */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100">
          <Bell size={16} />

          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* PROFILE */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 pr-2 transition hover:bg-slate-50 min-w-[120px] max-w-[150px]"
          >
            {/* Avatar */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-[12px] font-semibold uppercase text-white">
              {(
                user?.name ||
                user?.fullName ||
                user?.email?.charAt(0) ||
                "S"
              )
                .charAt(0)
                .toUpperCase()}
            </div>

            {/* Text */}
            <div className="min-w-0 flex-1 text-left leading-tight">
              <p className="truncate text-[12px] font-semibold text-slate-800">
                {user?.name ||
                  user?.fullName ||
                  user?.email?.split("@")[0] ||
                  "Sonam"}
              </p>

              <p className="truncate text-[10px] capitalize text-slate-400">
                {user?.role || "employee"}
              </p>
            </div>

            <ChevronDown
              size={14}
              className={`shrink-0 text-slate-400 transition-transform duration-200 ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* DROPDOWN */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
              <button
                onClick={() => {
                  navigate("/profile");
                  setProfileOpen(false);
                }}
                className="flex w-full items-center gap-2.5 px-3 py-2.5 text-[12px] text-slate-700 transition hover:bg-slate-100"
              >
                <User size={15} />
                My Profile
              </button>

              <button
                onClick={() => {
                  navigate("/settings");
                  setProfileOpen(false);
                }}
                className="flex w-full items-center gap-2.5 px-3 py-2.5 text-[12px] text-slate-700 transition hover:bg-slate-100"
              >
                <Settings size={15} />
                Settings
              </button>

              <button
                onClick={() => {
                  handleLogout();
                  setProfileOpen(false);
                }}
                className="flex w-full items-center gap-2.5 border-t border-slate-100 px-3 py-2.5 text-[12px] text-red-500 transition hover:bg-red-50"
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}