import Card from "../commons/Card";

export default function ShiftStats({ shifts }) {
  const morning = shifts.filter((s) =>
    s.name?.toLowerCase().includes("morning")
  ).length;

  const active = shifts.filter((s) => s.isActive).length;

  const cards = [
    { label: "Total", value: shifts.length },
    { label: "Morning", value: morning },
    { label: "Active", value: active },
    { label: "Employees", value: shifts.length },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {cards.map((item) => (
        <Card key={item.label} className="p-3">
          <p className="text-[11px] text-slate-500">{item.label}</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{item.value}</p>
        </Card>
      ))}
      </div>
  );
}