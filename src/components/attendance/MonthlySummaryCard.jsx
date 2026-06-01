import Card from "../commons/Card";

export default function MonthlySummaryCard() {
  return (
    <Card className="p-4 sm:p-5 rounded-2xl">

      {/* Title */}
      <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">
        April 2025 Summary
      </h3>

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-3">

        {/* Present Days */}
        <div className="rounded-xl p-3 sm:p-4 bg-[#A7F3D0]">
          <p className="text-xs sm:text-sm text-slate-700">Present Days</p>
          <p className="text-xl sm:text-2xl font-bold text-slate-900">18</p>
          <p className="text-[10px] sm:text-xs text-slate-600 mt-1">
            Out of 22 working days
          </p>
        </div>

        {/* Late Marks */}
        <div className="rounded-xl p-3 sm:p-4 bg-[#FDE68A]">
          <p className="text-xs sm:text-sm text-slate-700">Late Marks</p>
          <p className="text-xl sm:text-2xl font-bold text-slate-900">3</p>
          <p className="text-[10px] sm:text-xs text-slate-600 mt-1">
            Avg. 8 min late
          </p>
        </div>

        {/* Total Hours */}
        <div className="rounded-xl p-3 sm:p-4 bg-[#BFDBFE]">
          <p className="text-xs sm:text-sm text-slate-700">Total Hours</p>
          <p className="text-xl sm:text-2xl font-bold text-slate-900">142.5</p>
          <p className="text-[10px] sm:text-xs text-slate-600 mt-1">
            +6.5h overtime
          </p>
        </div>

        {/* Absent Days */}
        <div className="rounded-xl p-3 sm:p-4 bg-[#FECACA]">
          <p className="text-xs sm:text-sm text-slate-700">Absent Days</p>
          <p className="text-xl sm:text-2xl font-bold text-slate-900">1</p>
          <p className="text-[10px] sm:text-xs text-slate-600 mt-1">
            Regularized pending
          </p>
        </div>

      </div>
    </Card>
  );
}