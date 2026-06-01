import { Pencil, Trash2 } from "lucide-react";

export default function ProjectTable({
  projects = [],
  onEdit,
  onDelete,
  onView,
}) {
  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full min-w-[1100px] text-xs">
        <thead className="border-b bg-slate-50 text-slate-500">
          <tr>
            <th className="px-3 py-2 text-left">Project</th>
            <th className="px-3 py-2 text-left">Department</th>
            <th className="px-3 py-2 text-left">HR</th>
            <th className="px-3 py-2 text-left">Leader</th>
            <th className="px-3 py-2 text-left">Budget</th>
            <th className="px-3 py-2 text-left">Status</th>
            <th className="px-3 py-2 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((item) => (
            <tr
              key={item._id}
              onClick={() => onView(item)}
              className="cursor-pointer border-b text-[11px] hover:bg-slate-50"
            >
              <td className="px-3 py-3">
                <div className="font-medium text-slate-800">{item.name}</div>
                <div className="mt-1 text-[10px] text-slate-500">
                  {item.description}
                </div>
              </td>

              <td className="px-3 py-3">
                {item.department?.name || item.department}
              </td>

              <td className="px-3 py-3">
                {item.hr?.fullName || item.hr}
              </td>

              <td className="px-3 py-3">
                {item.teamLeader?.fullName || item.teamLeader}
              </td>

              <td className="px-3 py-3">₹{item.budget}</td>

              <td className="px-3 py-3">
                <span className="rounded-lg bg-amber-100 px-2 py-1 text-[10px] font-medium capitalize text-amber-700">
                  {item.status}
                </span>
              </td>

              <td className="px-3 py-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(item);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100"
                  >
                    <Pencil size={14} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item._id);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}