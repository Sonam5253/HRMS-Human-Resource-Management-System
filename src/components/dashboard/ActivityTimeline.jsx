import {
  CheckCircle,
  AlertCircle,
  PlayCircle,
  Coffee,
  CalendarDays,
  Download,
} from "lucide-react";
import SectionWrapper from "./SectionWrapper";

export default function ActivityTimeline() {
  const data = [
    {
      title: "Punched In",
      time: "9:25 AM",
      desc: "Office check-in via mobile app. Location: Corporate HQ (Gate 2)",
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Late Arrival Marked",
      time: "9:26 AM",
      desc: "System automatically marked as late (25 minutes delay)",
      icon: AlertCircle,
      color: "orange",
    },
    {
      title: "Task Started",
      time: "9:40 AM",
      desc: "Began work on API Integration task",
      icon: PlayCircle,
      color: "blue",
    },
    {
      title: "Break Started",
      time: "10:15 AM",
      desc: "15-minute coffee break",
      icon: Coffee,
      color: "orange",
    },
    {
      title: "Break Ended",
      time: "10:28 AM",
      desc: "Returned early, ready to resume work",
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Meeting Scheduled",
      time: "10:45 AM",
      desc: "Team sync meeting scheduled",
      icon: CalendarDays,
      color: "blue",
    },
  ];

  const getColor = (color) => {
    switch (color) {
      case "green":
        return "border-green-500 text-green-500";
      case "orange":
        return "border-orange-400 text-orange-400";
      case "blue":
        return "border-blue-500 text-blue-500";
      default:
        return "border-slate-400 text-slate-400";
    }
  };

  return (
    <SectionWrapper
      title={
        <div>
          <p className="text-sm font-semibold text-slate-700">
            Activity Timeline
          </p>
          <p className="text-xs text-slate-400">
            Today's detailed activity log
          </p>
        </div>
      }
    >
      <div className="relative">
        {/* VERTICAL LINE */}
        <div className="absolute left-2 top-0 bottom-14 w-[2px] bg-slate-200" />

        {/* TIMELINE ITEMS */}
        {data.map((item, index) => {
          const Icon = item.icon;

          return (
            <div key={index} className="relative mb-4">
              {/* DOT */}
              <div className="absolute left-2 top-4 -translate-x-1/2">
                <div
                  className={`w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${getColor(
                    item.color
                  )}`}
                >
                  <div className="w-2 h-2 rounded-full bg-current" />
                </div>
              </div>

              {/* CARD */}
              <div className="ml-6 bg-slate-50 border border-slate-200 rounded-xl p-3">
                {/* HEADER */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Icon
                      size={16}
                      className={getColor(item.color)}
                    />
                    <p className="text-sm font-semibold text-slate-700">
                      {item.title}
                    </p>
                  </div>

                  <span className="text-xs text-slate-400">
                    {item.time}
                  </span>
                </div>

                {/* DESCRIPTION */}
                <p className="text-xs text-slate-500 mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}

        {/* EXPORT BUTTON */}
        <button className="mt-3 w-full flex items-center justify-center gap-2 py-2 text-sm border rounded-lg hover:bg-slate-50">
          <Download size={16} />
          Export Activity Log
        </button>
      </div>
    </SectionWrapper>
  );
}