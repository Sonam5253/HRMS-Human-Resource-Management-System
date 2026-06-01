
import { User, Building2 } from "lucide-react";

export default function ClientStats({ clients }) {
  const cards = [
    {
      title: "Total Clients",
      value: clients.length,
      icon: <User size={14} />,
      color: "bg-violet-100 text-violet-600",
    },
    {
      title: "Active Clients",
      value: clients.length,
      icon: <Building2 size={14} />,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Projects",
      value: 18,
      icon: <Building2 size={14} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Revenue",
      value: "₹48,750",
      icon: "₹",
      color: "bg-orange-100 text-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
      {cards.map((item) => (
        <div
          key={item.title}
          className="w-full  rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-[0_1px_6px_rgba(15,23,42,0.04)]"
        >
          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold ${item.color}`}
            >
              {item.icon}
            </div>

            <div>
              <p className="text-[10px] text-slate-500">{item.title}</p>
              <h3 className="mt-0.5 text-xl font-bold text-slate-900">
                {item.value}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
