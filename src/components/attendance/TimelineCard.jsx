import Card from "../commons/Card";
import {
  LogIn,
  Coffee,
  UserCheck,
  LogOut,
  Clock
} from "lucide-react";

export default function TimelineCard() {
  return (
    <Card className="p-5 h-[500px] sm:h-[520px] lg:h-[545px] flex flex-col rounded-2xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Today's Timeline
          </h3>
          <p className="text-sm text-slate-500">
            April 24, 2025 - Punch events
          </p>
        </div>

        <div className="flex gap-2">
          <button className="p-2 hover:bg-slate-100 rounded-lg">⟳</button>
          <button className="p-2 hover:bg-slate-100 rounded-lg">⋮</button>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative pl-8 space-y-5 flex-1 overflow-y-auto hide-scrollbar">

        {/* vertical line */}
        <div className="absolute left-2 top-0 bottom-0 w-[2px] bg-slate-200"></div>

        {/* Punch In */}
        <div className="relative">
          <div className="absolute -left-[20px] top-2 w-3 h-3 bg-green-500 rounded-full"></div>

          <div className="bg-slate-50 p-4 rounded-xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <LogIn className="text-green-600" size={18} />
                <span className="font-medium text-slate-900">Punch In</span>
              </div>
              <span className="text-sm font-medium">09:00 AM</span>
            </div>

            <p className="text-xs text-slate-500 mt-2">
              Office Main Gate (GPS: 12.9716° N, 77.5946° E)
            </p>
          </div>
        </div>

        {/* Break Start */}
        <div className="relative">
          <div className="absolute -left-[20px] top-2 w-3 h-3 bg-yellow-500 rounded-full"></div>

          <div className="bg-slate-50 p-4 rounded-xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Coffee className="text-yellow-600" size={18} />
                <span className="font-medium text-slate-900">Break Start</span>
              </div>
              <span className="text-sm font-medium">01:00 PM</span>
            </div>

            <p className="text-xs text-slate-500 mt-2">
              Lunch break - 60 minutes allocated
            </p>
          </div>
        </div>

        {/* Break End */}
        <div className="relative">
          <div className="absolute -left-[20px] top-2 w-3 h-3 bg-slate-400 rounded-full"></div>

          <div className="bg-slate-50 p-4 rounded-xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Coffee className="text-slate-600" size={18} />
                <span className="font-medium text-slate-900">Break End</span>
              </div>
              <span className="text-sm font-medium">02:00 PM</span>
            </div>

            <p className="text-xs text-slate-500 mt-2">
              Break duration: 60 minutes
            </p>
          </div>
        </div>

        {/* Current */}
        <div className="relative">
          <div className="absolute -left-[20px] top-2 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>

          <div className="bg-slate-50 p-4 rounded-xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <UserCheck className="text-green-600" size={18} />
                <span className="font-medium text-slate-900">
                  Currently Working
                </span>
              </div>
              <span className="text-green-600 text-sm font-medium">Active</span>
            </div>

            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <Clock size={12} /> Elapsed time: 4 hours 41 minutes
            </p>
          </div>
        </div>

        {/* Expected Out */}
        <div className="relative">
          <div className="absolute -left-[20px] top-2 w-3 h-3 bg-slate-400 rounded-full"></div>

          <div className="bg-slate-50 p-4 rounded-xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <LogOut className="text-slate-600" size={18} />
                <span className="font-medium text-slate-900">
                  Expected Punch Out
                </span>
              </div>
              <span className="text-sm font-medium">06:00 PM</span>
            </div>

            <p className="text-xs text-slate-500 mt-2">
              Remaining: 1 hour 19 minutes
            </p>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-slate-200">
        <button className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-sm font-medium">
          + Add Manual Entry
        </button>
      </div>

    </Card>
  );
}