import Card from "../commons/Card";
import { Code, Users, DollarSign } from "lucide-react";

export default function RecruitmentPipelineCard() {
  const data = [
    {
      title: "Senior Frontend Dev",
      dept: "Engineering • 3 applicants",
      status: "Interview",
      progress: 75,
      color: "bg-blue-500",
      icon: <Code size={18} />,
      badge: "bg-green-100 text-green-600",
    },
    {
      title: "HR Manager",
      dept: "HR • 8 applicants",
      status: "Screening",
      progress: 40,
      color: "bg-green-500",
      icon: <Users size={18} />,
      badge: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Finance Analyst",
      dept: "Finance • 5 applicants",
      status: "Offer Stage",
      progress: 90,
      color: "bg-orange-500",
      icon: <DollarSign size={18} />,
      badge: "bg-blue-100 text-blue-600",
    },
  ];

  return (
    <Card className="p-4 sm:p-5 rounded-2xl">

  {/* HEADER */}
  <div className="flex items-center justify-between mb-4">
    <div>
      <h3 className="font-semibold text-slate-900">
        Recruitment Pipeline
      </h3>
      <p className="text-sm text-slate-500">
        5 open positions, 3 in final stage
      </p>
    </div>

    <button className="text-sm text-green-600 font-medium">
      View All →
    </button>
  </div>

  {/* LIST */}
  <div className="space-y-3">
    {data.map((item, i) => (
      <div key={i} className="bg-slate-50 rounded-xl p-4">

        {/* TOP */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-700">
              {item.icon}
            </div>

            <div>
              <p className="font-medium text-slate-900">
                {item.title}
              </p>
              <p className="text-xs text-slate-500">
                {item.dept}
              </p>
            </div>
          </div>

          <span className={`text-xs px-3 py-1 rounded-full ${item.badge}`}>
            {item.status}
          </span>
        </div>

        {/* PROGRESS */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Progress</span>
            <span>{item.progress}%</span>
          </div>

          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-2 ${item.color}`}
              style={{ width: `${item.progress}%` }}
            />
          </div>
        </div>

      </div>
    ))}
  </div>

  {/* FOOTER */}
  <div className="flex items-center justify-between mt-4 pt-3 border-t">
    <p className="text-sm text-slate-600">
      Total pipeline value: <span className="font-semibold">$240k</span>
    </p>

    <button className="text-green-600 font-medium text-sm">
      Add Position +
    </button>
  </div>

</Card>
  );
}