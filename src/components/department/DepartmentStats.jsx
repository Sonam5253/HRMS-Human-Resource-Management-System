import {
  Building2,
  ShieldCheck,
  UserCircle2,
  Users,
} from "lucide-react";
import Card from "../commons/Card";

export default function DepartmentStats({ departments }) {
  const totalDepartments = departments.length;

  const totalEmployees = departments.reduce(
    (sum, d) => sum + (d.employees || 0),
    0
  );

  const totalLeaders = departments.reduce(
    (sum, d) => sum + (d.leaders || 0),
    0
  );

  const totalHrs = departments.reduce(
    (sum, d) => sum + (d.hrs || 0),
    0
  );

  const stats = [
    {
      title: "Departments",
      value: totalDepartments,
      icon: Building2,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "HRs",
      value: totalHrs,
      icon: Users,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Employees",
      value: totalEmployees,
      icon: ShieldCheck,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Leaders",
      value: totalLeaders,
      icon: UserCircle2,
      color: "bg-violet-100 text-violet-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.title}
            className="flex items-center gap-3 p-3"
          >
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-md ${item.color}`}
            >
              <Icon size={16} />
            </div>

            <div>
              <p className="text-[11px] text-slate-500">
                {item.title}
              </p>

              <h3 className="text-sm font-semibold text-slate-800">
                {item.value}
              </h3>
            </div>
          </Card>
        );
      })}
    </div>
  );
}