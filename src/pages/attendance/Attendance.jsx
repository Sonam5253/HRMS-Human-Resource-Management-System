import AttendanceCard from "../../components/dashboard/AttendanceCard";
import MonthlySummaryCard from "../../components/attendance/MonthlySummaryCard";
import CalendarCard from "../../components/attendance/CalendarCard";
import TimelineCard from "../../components/attendance/TimelineCard";
import AttendanceHistoryCard from "../../components/attendance/AttendanceHistoryCard";

export default function Attendance() {
  return (
    <div className=" sm:p-0 lg:p-0">

  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

    {/* LEFT */}
    <div className="space-y-4 ">
      <AttendanceCard />
      <CalendarCard />
    </div>

    {/* RIGHT */}
    <div className="space-y-4 md:col-span-2 xl:col-span-2">

      <MonthlySummaryCard />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AttendanceHistoryCard />
        <TimelineCard />
      </div>

    </div>

  </div>

</div>
  );
}