import Card from "../commons/Card";
import {
  Bell,
  Mail,
  ShieldCheck,
  Moon,
  Key,
  LogOut,
  Settings,
} from "lucide-react";

export default function SettingsCard() {
  return (
    <Card className="p-5 rounded-2xl">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-slate-900">
          Settings & Preferences
        </h3>

        <button className="flex items-center gap-1 text-green-600 text-sm font-medium">
          <Settings size={16} />
          Manage
        </button>
      </div>

      {/* Toggles */}
      <div className="space-y-4">

        {/* Push */}
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-start">
            <Bell size={18} className="text-slate-500 mt-1" />
            <div>
              <p className="text-sm font-medium">Push Notifications</p>
              <p className="text-xs text-slate-500">
                Receive alerts for attendance, leaves, etc.
              </p>
            </div>
          </div>

          <input type="checkbox" defaultChecked className="toggle" />
        </div>

        {/* Email */}
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-start">
            <Mail size={18} className="text-slate-500 mt-1" />
            <div>
              <p className="text-sm font-medium">Email Notifications</p>
              <p className="text-xs text-slate-500">
                Weekly reports and updates
              </p>
            </div>
          </div>

          <input type="checkbox" defaultChecked className="toggle" />
        </div>

        {/* 2FA */}
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-start">
            <ShieldCheck size={18} className="text-slate-500 mt-1" />
            <div>
              <p className="text-sm font-medium">
                Two-Factor Authentication
              </p>
              <p className="text-xs text-slate-500">
                Enhanced security for login
              </p>
            </div>
          </div>

          <input type="checkbox" className="toggle" />
        </div>

        {/* Dark */}
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-start">
            <Moon size={18} className="text-slate-500 mt-1" />
            <div>
              <p className="text-sm font-medium">Dark Mode</p>
              <p className="text-xs text-slate-500">
                Switch to dark theme
              </p>
            </div>
          </div>

          <input type="checkbox" className="toggle" />
        </div>

      </div>

      {/* Footer */}
      <div className="mt-5 pt-4 border-t flex gap-3">

        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-medium">
          <Key size={16} />
          Change Password
        </button>

        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-100 hover:bg-red-100 text-sm font-medium text-red-600">
          <LogOut size={16} />
          Logout
        </button>

      </div>

    </Card>
  );
}