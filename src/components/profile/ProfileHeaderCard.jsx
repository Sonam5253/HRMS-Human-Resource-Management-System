import Card from "../commons/Card";
import { Camera } from "lucide-react";

export default function ProfileHeaderCard() {
  return (
    <Card className="p-4 rounded-2xl">

      <div className="flex items-center gap-5">

        {/* Avatar */}
        <div className="relative shrink-0">

          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="profile"
            className="w-20 h-20 rounded-full object-cover border"
          />

          {/* FIXED CAMERA ICON */}
          <div className="absolute bottom-1 right-1 bg-green-600 p-1.5 rounded-full text-white shadow-md">
            <Camera size={14} />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">

          <div className="flex justify-between items-start">

            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Alex Johnson
              </h3>

              <p className="text-sm text-slate-500">
                Senior Software Engineer
              </p>
            </div>

            <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">
              Active
            </span>
          </div>

          {/* DETAILS */}
          {/* DETAILS */}
        <div className="flex justify-between items-center mt-3 text-sm">

        <div>
            <p className="text-slate-400 text-xs">Employee ID</p>
            <p className="font-medium text-slate-800">
            EMP-2023-0456
            </p>
        </div>

        <div className="text-right">
            <p className="text-slate-400 text-xs">Department</p>
            <p className="font-medium text-slate-800">
            Engineering
            </p>
        </div>

        </div>

          {/* STATS */}
          <div className="flex justify-between mt-4 text-sm">

            <div>
              <p className="text-slate-400 text-xs">Attendance</p>
              <p className="text-green-600 font-semibold text-base">
                96%
              </p>
            </div>

            <div>
              <p className="text-slate-400 text-xs">Leave</p>
              <p className="text-blue-600 font-semibold text-base">
                12.5
              </p>
            </div>

            <div>
              <p className="text-slate-400 text-xs">Performance</p>
              <p className="text-orange-500 font-semibold text-base">
                4.2/5
              </p>
            </div>

          </div>

        </div>
      </div>

    </Card>
  );
}