import { Sun, Heart, Award, Clock, FileText } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

export default function LeaveSummaryCard() {
  return (
    <SectionWrapper>
      
      {/* TOP 3 CARDS */}
      <div className="grid grid-cols-3 gap-3">
        
        {/* CASUAL */}
        <div className="bg-white border rounded-xl p-2 text-center shadow-sm">
          <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-full bg-blue-100 text-blue-500 ">
            <Sun size={18} />
          </div>
          <p className="text-sm text-slate-600">Casual</p>
          <p className="text-xl font-bold">4/12</p>
          <p className="text-xs text-slate-400">
            Remaining: 8 days
          </p>
        </div>

        {/* SICK */}
        <div className="bg-white border rounded-xl p-2 text-center shadow-sm">
          <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-full bg-red-100 text-red-500 ">
            <Heart size={18} />
          </div>
          <p className="text-sm text-slate-600">Sick</p>
          <p className="text-xl font-bold">2/6</p>
          <p className="text-xs text-slate-400">
            Remaining: 4 days
          </p>
        </div>

        {/* EARNED */}
        <div className="bg-white border rounded-xl p-2 text-center shadow-sm">
          <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-full bg-green-100 text-green-600 ">
            <Award size={18} />
          </div>
          <p className="text-sm text-slate-600">Earned</p>
          <p className="text-xl font-bold">10/15</p>
          <p className="text-xs text-slate-400">
            Remaining: 5 days
          </p>
        </div>

      </div>

      {/* LATE ARRIVAL CARD */}
      <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-xl p-2">
        
        {/* HEADER */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
            <Clock size={18} />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">
              Late Arrival Today
            </p>

            <p className="text-sm text-slate-600 mt-1">
              You punched in at{" "}
              <span className="font-semibold text-slate-800">
                9:25 AM
              </span>{" "}
              -{" "}
              <span className="text-orange-500 font-medium">
                25 minutes late
              </span>
            </p>

            <p className="text-xs text-slate-500 mt-1">
              from scheduled time (9:00 AM).
            </p>

            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>This month's late count:</span>
              <span className="text-orange-500 font-semibold">
                3 times
              </span>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <button className="mt-4 w-full flex items-center justify-center gap-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 py-2 rounded-lg text-sm font-medium">
          <FileText size={16} />
          Submit Explanation
        </button>
      </div>

    </SectionWrapper>
  );
}