import { useEffect, useState } from "react";
import {
  MoreHorizontal,
  FileText,
  Pencil,
  Trash2,
} from "lucide-react";
import Card from "../commons/Card";

export default function ShiftCard({
  item,
  onEdit,
  onDelete,
  onView,
  onReport,
}) {
  const [openMenu, setOpenMenu] = useState(false);

  const shift = Object.values(item?.shifts || {})[0];

  useEffect(() => {
    const handleOutsideClick = () => {
      setOpenMenu(false);
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <Card
      className="cursor-pointer space-y-3 transition hover:bg-slate-50"
      onClick={() => onView(item)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-slate-900">
              {item?.name}
            </h3>

            <span
              className={`rounded-lg px-2 py-1 text-[10px] ${
                item?.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {item?.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          <p className="mt-1 text-[11px] text-slate-500">
            {item?.description}
          </p>
        </div>

        <div
          className="relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenu((prev) => !prev);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100"
          >
            <MoreHorizontal size={16} />
          </button>

          {openMenu && (
            <div className="absolute right-0 top-10 z-20 w-36 rounded-2xl border border-slate-200 bg-white p-1 shadow-xl">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenu(false);
                  onReport(item?._id);
                }}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-violet-600 hover:bg-violet-50"
              >
                <FileText size={14} />
                Report
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenu(false);
                  onEdit(item);
                }}
                className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
              >
                <Pencil size={14} />
                Edit
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenu(false);
                  onDelete(item?._id);
                }}
                className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-red-600 hover:bg-red-50"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
        <div>
          <p className="text-slate-400">Time</p>
          <p>
            {shift?.startTime || "--:--"} -{" "}
            {shift?.endTime || "--:--"}
          </p>
        </div>

        <div>
          <p className="text-slate-400">Lunch</p>
          <p>
            {item?.lunchStartTime || "--:--"} -{" "}
            {item?.lunchEndTime || "--:--"}
          </p>
        </div>
      </div>
    </Card>
  );
}