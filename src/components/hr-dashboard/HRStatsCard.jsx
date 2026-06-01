import Card from "../commons/Card";
import { Users, Calendar, Briefcase, CreditCard } from "lucide-react";

export default function HRStatsCard() {
  const stats = [
    {
      title: "Total Employees",
      value: "142",
      icon: <Users size={20} />,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "Pending Leaves",
      value: "8",
      icon: <Calendar size={20} />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      title: "Open Positions",
      value: "5",
      icon: <Briefcase size={20} />,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    {
      title: "Payroll Due",
      value: "12",
      icon: <CreditCard size={20} />,
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
  ];

  return (
    <Card className="p-4 sm:p-5 rounded-2xl">

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">

        {stats.map((item, index) => (
          <div
            key={index}
            className={`rounded-xl p-4 flex items-center justify-between ${item.bg}`}
          >
            {/* TEXT */}
            <div>
              <p className="text-xs sm:text-sm text-slate-600">
                {item.title}
              </p>
              <p className="text-xl sm:text-2xl font-bold text-slate-900">
                {item.value}
              </p>
            </div>

            {/* ICON */}
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full bg-white ${item.text}`}
            >
              {item.icon}
            </div>
          </div>
        ))}

      </div>

    </Card>
  );
}