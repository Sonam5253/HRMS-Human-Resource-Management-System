import { useState } from "react";
import Card from "../commons/Card";

export default function CalendarCard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Month & Year
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // First day & total days
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Adjust for Monday start
  const startDay = firstDay === 0 ? 6 : firstDay - 1;

  // Month Name
  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  // Generate calendar array
  const daysArray = [
    ...Array(startDay).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  // Handlers
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleSelectDate = (day) => {
    setSelectedDate(new Date(year, month, day));
  };

  return (
    <Card className="p-5 rounded-2xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {monthName} Calendar
          </h3>
          <p className="text-sm text-slate-500">
            Tap a day to view details
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            ‹
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            ›
          </button>
        </div>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 text-xs text-slate-500 mb-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="text-center">
            {day}
          </div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-2 text-center text-sm">

        {daysArray.map((day, index) => {
          const isSelected =
            day &&
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === month &&
            selectedDate.getFullYear() === year;

          return (
            <div
              key={index}
              onClick={() => day && handleSelectDate(day)}
              className={`h-10 flex flex-col items-center justify-center rounded-lg cursor-pointer
                ${day ? "hover:bg-slate-100" : ""}
                ${isSelected ? "border-2 border-green-500 bg-green-100" : ""}
              `}
            >
              <span>{day || ""}</span>

              {/* Dot example */}
              {day && (
                <div className="w-1.5 h-1.5 rounded-full mt-1 bg-green-500"></div>
              )}
            </div>
          );
        })}

      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 text-xs text-slate-500 mt-4">
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div> Present
        </span>
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div> Late
        </span>
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div> Absent
        </span>
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div> Holiday
        </span>
      </div>

    </Card>
  );
}