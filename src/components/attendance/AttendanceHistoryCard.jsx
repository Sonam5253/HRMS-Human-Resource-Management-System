import Card from "../commons/Card";
import { Download, CheckCircle, XCircle } from "lucide-react";

export default function AttendanceHistoryCard() {
  const data = [
    {
      day: "Monday, April 21",
      week: "Week 17",
      in: "09:15 AM",
      out: "06:30 PM",
      duration: "8h 45m",
      status: "Present",
      late: "Late by 15m",
    },
    {
      day: "Friday, April 18",
      week: "Week 16",
      in: "09:00 AM",
      out: "06:00 PM",
      duration: "8h 0m",
      status: "Present",
      late: "On time",
    },
    {
      day: "Thursday, April 10",
      week: "Week 15",
      status: "Absent",
      note: "Sick Leave",
    },
  ];

  return (
    <Card className="p-5 h-[500px] sm:h-[520px] lg:h-[545px] flex flex-col rounded-2xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Attendance History
          </h3>
          <p className="text-sm text-slate-500">
            Last 30 days of attendance records
          </p>
        </div>

        <Download size={18} className="text-slate-500 cursor-pointer" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {["All", "Present", "Absent", "Late", "Half Day", "Leave", "Holiday"].map((item, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded-full text-sm ${
              i === 0
                ? "bg-green-500 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* List (SCROLL AREA) */}
      <div className="flex-1 overflow-y-auto hide-scrollbar space-y-3">

        {data.map((item, index) => (
          <div key={index} className="p-4 rounded-xl bg-slate-50">

            {/* Top */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {item.status === "Present" ? (
                  <CheckCircle className="text-green-500" size={18} />
                ) : (
                  <XCircle className="text-red-500" size={18} />
                )}

                <div>
                  <p className="font-medium text-slate-900">{item.day}</p>
                  <p className="text-xs text-slate-500">{item.week}</p>
                </div>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.status === "Present"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {item.status}
              </span>
            </div>

            {/* Bottom */}
            {item.status === "Present" ? (
              <div className="flex justify-between text-xs text-slate-600 mt-3">
                <div>
                  <p>In: {item.in}</p>
                  <p>Duration: {item.duration}</p>
                </div>
                <div className="text-right">
                  <p>Out: {item.out}</p>
                  <p className="text-orange-500">{item.late}</p>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-500 mt-3">
                No attendance recorded <br />
                Status: {item.note}
              </div>
            )}

          </div>
        ))}

      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t flex justify-between text-sm">
        <span className="text-slate-500">Showing 3 of 22 records</span>
        <button className="text-green-600 font-medium">
          View All Records →
        </button>
      </div>

    </Card>
  );
}