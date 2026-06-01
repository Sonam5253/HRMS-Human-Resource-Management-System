import Card from "../commons/Card";
import { User } from "lucide-react";

export default function HRProfileCard() {
  return (
    <Card className="p-4 sm:p-5 rounded-2xl">

      <div className="flex items-center justify-between flex-wrap gap-3">

        {/* LEFT */}
        <div className="flex items-center gap-3">

          {/* Avatar */}
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600">
            <User size={22} />
          </div>

          {/* Info */}
          <div>
            <p className="font-semibold text-slate-900">
              HR Manager
            </p>
            <p className="text-sm text-slate-500">
              admin@company.com
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="text-right">
          <p className="text-xs text-slate-500">Today</p>
          <p className="font-semibold text-slate-900">
            Apr 28, 2026
          </p>
        </div>

      </div>

    </Card>
  );
}