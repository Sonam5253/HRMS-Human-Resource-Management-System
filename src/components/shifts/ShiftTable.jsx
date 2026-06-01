import { Eye, Pencil, Trash2 } from "lucide-react";

export default function ShiftTable({
  shifts,
  onEdit,
  onDelete,
  onView,
  onReport,
}) {
  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full min-w-[900px] text-xs">
        <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
          <tr>
            <th className="px-3 py-2 text-left">Shift</th>
            <th className="px-3 py-2 text-left">Time</th>
            <th className="px-3 py-2 text-left">Lunch</th>
            <th className="px-3 py-2 text-left">Hours</th>
            <th className="px-3 py-2 text-left">Overtime</th>
            <th className="px-3 py-2 text-left">Status</th>
            <th className="px-3 py-2 text-left">Action</th>
          </tr>
        </thead>
                <tbody>
          {shifts.map((item) => {
            const shift = Object.values(item.shifts || {})[0];

            return (
              <tr
                key={item._id}
                onClick={() => onView(item)}
                className="cursor-pointer border-b border-slate-100 text-[11px] hover:bg-slate-50"
              >
                <td className="px-3 py-3">
                  <div className="font-medium text-slate-800">{item.name}</div>
                  <div className="mt-1 text-[10px] text-slate-500">{item.description}</div>
                </td>

                <td className="px-3 py-3 text-slate-600">
                  {shift?.startTime} - {shift?.endTime}
                </td>

                <td className="px-3 py-3 text-slate-600">
                  {item.lunchStartTime} - {item.lunchEndTime}
                </td>
                 <td className="px-3 py-3 text-slate-600">
                  {shift?.workingHours || 0} min
                </td>

                <td className="px-3 py-3 text-slate-600">
                  {item.overtimeEnabled ? `${item.overtimeRate}x` : "No"}
                </td>

                <td className="px-3 py-3">
                  <span className={`rounded-lg px-2 py-1 text-[10px] font-medium ${item.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                    {item.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-3 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onReport(item._id);
                      }}
                      className="h-7 rounded-lg border border-violet-200 px-2 text-[10px] text-violet-600 hover:bg-violet-50"
                    >
                      Report
                      </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(item);
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100"
                    >
                      <Pencil size={12} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(item._id);
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-red-200 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </td>
              </tr>
                );
          })}
        </tbody>
      </table>
    </div>
  );
}
