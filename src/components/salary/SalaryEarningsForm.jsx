import { Plus } from "lucide-react";

export default function SalaryEarningsForm({
  earnings,
  setEarnings,
}) {
  const updateField = (index, key, value) => {
    const updated = [...earnings];
    updated[index][key] = value;
    setEarnings(updated);
  };

  const addField = () => {
    setEarnings([
      ...earnings,
      {
        name: "",
        amount: "",
      },
    ]);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">
            Earnings
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Add earning fields like Basic Salary, HRA, Bonus
          </p>
        </div>

        <button
          onClick={addField}
          className="flex items-center gap-1 rounded-xl bg-emerald-100 px-3 py-2 text-xs font-medium text-emerald-700"
        >
          <Plus size={14} />
          Add
        </button>
      </div>

      <div className="space-y-3">
        {earnings.map((item, index) => (
          <div key={index} className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Field Name"
              value={item.name}
              onChange={(e) =>
                updateField(index, "name", e.target.value)
              }
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
            />

            <input
              type="number"
              placeholder="Amount"
              value={item.amount}
              onChange={(e) =>
                updateField(index, "amount", e.target.value)
              }
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}