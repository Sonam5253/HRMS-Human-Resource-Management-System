import { Pencil, Trash2 } from "lucide-react";

export default function DepartmentRow({
  department,
  isActive,
  onClick,
  onEdit,
  onDelete,
}) {
  const formattedDate = department.createdAt
    ? new Date(department.createdAt).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : "-";

  return (
    <tr
      onClick={onClick}
      className={`cursor-pointer border-b border-slate-100 transition hover:bg-slate-50 ${
        isActive ? "bg-indigo-50" : ""
      }`}
    >
      {/* Department */}
      <td className="px-3 py-4">
        <div>
          <p className="text-sm font-semibold text-slate-800">
            {department.name}
          </p>
        </div>
      </td>

      {/* HRs */}
      <td className="px-3 py-4">
        <span className="text-sm font-medium text-slate-700">
          {department.hrs || 0}
        </span>
      </td>

      {/* Employees */}
      <td className="px-3 py-4">
        <span className="text-sm font-medium text-slate-700">
          {department.employees || 0}
        </span>
      </td>

      {/* Team Leaders */}
      <td className="px-3 py-4">
        <span className="text-sm font-medium text-slate-700">
          {department.leaders || 0}
        </span>
      </td>

      {/* Created Date */}
      <td className="px-3 py-4">
        <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
          {formattedDate}
        </span>
      </td>

      {/* Actions */}
      <td className="px-3 py-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(department);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <Pencil size={14} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(department);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}