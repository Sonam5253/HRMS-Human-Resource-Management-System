import { BarChart3 } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

export default function ProductivityCard() {
  const data = [
    { day: "Mon", hours: 8 },
    { day: "Tue", hours: 7 },
    { day: "Wed", hours: 9 },
    { day: "Thu", hours: 6 },
    { day: "Fri", hours: 7.5 },
    { day: "Sat", hours: 0 },
    { day: "Sun", hours: 0 },
  ];

  const max = 10;

  return (
    <SectionWrapper
      title={
        <div>
          <p className="text-sm font-semibold text-slate-700">
            Weekly Productivity
          </p>
          <p className="text-xs text-slate-400">
            Working hours (Mon - Sun)
          </p>
        </div>
      }
      right={<BarChart3 size={18} className="text-slate-400" />}
    >
      {/* CHART */}
      <div className="flex mt-3 h-[190px]">

        {/* Y AXIS */}
        <div className="flex flex-col justify-between text-[11px] text-slate-400 mr-2 pr-2 border-r border-slate-200">
          <span>10h</span>
          <span>8h</span>
          <span>6h</span>
          <span>4h</span>
          <span>2h</span>
          <span>0h</span>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col relative">

          {/* GRID + BARS */}
          <div className="relative flex-1 flex items-end justify-between pb-5">

            {/* GRID LINES */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border-t border-slate-200 w-full" />
              ))}
            </div>

            {/* BARS */}
            {data.map((item, index) => {
              const height = (item.hours / max) * 100;

              return (
                <div
                  key={index}
                  className="flex items-end justify-center h-full relative -bottom-5 z-10"
                  style={{ width: "14%" }}
                >
                  <div
                    className="w-5 rounded-sm bg-gradient-to-t from-green-600 to-green-400 transition-all duration-300"
                    style={{ height: `${height}%` }}
                  />
                </div>
              );
            })}
          </div>

          {/* DAYS (X AXIS) */}
          <div className="absolute -bottom-4 left-0 w-full flex justify-between text-[11px] text-slate-500 px-[6px]">
            {data.map((item, index) => (
              <span key={index} className="w-[14%] text-center">
                {item.day}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* STATS */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <div className="text-slate-500">
          <p>Total this week:</p>
          <p>Daily average:</p>
        </div>

        <div className="text-right font-semibold text-slate-700">
          <p>38.5 hours</p>
          <p>7.7 hours</p>
        </div>
      </div>
    </SectionWrapper>
  );
}