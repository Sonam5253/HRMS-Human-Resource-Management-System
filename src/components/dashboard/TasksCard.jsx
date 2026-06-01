import { CheckCircle2 } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

export default function TasksCard() {
  const tasks = [
    {
      title: "API Integration",
      due: "Today, 5:00 PM",
      progress: 75,
      priority: "High",
      color: "blue",
    },
    {
      title: "Documentation",
      due: "Tomorrow, 10:00 AM",
      progress: 40,
      priority: "Medium",
      color: "green",
    },
    {
      title: "Team Meeting",
      due: "Friday, 11:00 AM",
      progress: 20,
      priority: "Low",
      color: "yellow",
    },
  ];

  const getPriorityStyle = (priority) => {
    if (priority === "High") return "bg-blue-100 text-blue-600";
    if (priority === "Medium") return "bg-green-100 text-green-600";
    return "bg-yellow-100 text-yellow-600";
  };

  const getProgressColor = (color) => {
    if (color === "blue") return "bg-blue-500";
    if (color === "green") return "bg-green-500";
    return "bg-yellow-500";
  };

  const getIconBg = (color) => {
    if (color === "blue") return "bg-blue-100 text-blue-500";
    if (color === "green") return "bg-green-100 text-green-500";
    return "bg-yellow-100 text-yellow-500";
  };

  return (
    <SectionWrapper
      title={
        <div>
          <p className="text-sm font-semibold text-slate-700">
            My Assigned Tasks
          </p>
          <p className="text-xs text-slate-400">
            3 tasks in progress
          </p>
        </div>
      }
    >
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="border border-slate-200 rounded-xl p-3"
          >
            {/* TOP */}
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                {/* ICON */}
                <div
                  className={`w-9 h-9 flex items-center justify-center rounded-lg ${getIconBg(
                    task.color
                  )}`}
                >
                  <CheckCircle2 size={18} />
                </div>

                {/* TEXT */}
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {task.title}
                  </p>
                  <p className="text-xs text-slate-400">
                    Due: {task.due}
                  </p>
                </div>
              </div>

              {/* PRIORITY */}
              <span
                className={`text-xs px-2 py-1 rounded-full ${getPriorityStyle(
                  task.priority
                )}`}
              >
                {task.priority}
              </span>
            </div>

            {/* PROGRESS */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Progress</span>
                <span>{task.progress}%</span>
              </div>

              <div className="w-full h-2 bg-slate-200 rounded-full">
                <div
                  className={`${getProgressColor(
                    task.color
                  )} h-2 rounded-full`}
                  style={{ width: `${task.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}

        {/* BUTTON */}
        <button className="w-full mt-2 py-2 text-sm rounded-lg bg-slate-100 hover:bg-slate-200">
          View All Tasks
        </button>
      </div>
    </SectionWrapper>
  );
}