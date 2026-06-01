import { useEffect, useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

export default function ProjectCard({
  item,
  onEdit,
  onDelete,
  onView,
}) {
  const [openMenu, setOpenMenu] = useState(false);

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
    <div
      onClick={() => onView(item)}
      className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-slate-800">
              {item?.name || "-"}
            </h3>

            <span className="rounded-lg bg-amber-100 px-2 py-1 text-[10px] font-medium capitalize text-amber-700">
              {item?.status || "pending"}
            </span>
          </div>

          <p className="mt-1 line-clamp-2 text-[11px] text-slate-500">
            {item?.description || "-"}
          </p>
        </div>

        <div
          className="relative shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenu((prev) => !prev);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg  text-slate-500"
          >
            <MoreHorizontal size={15} />
          </button>

          {openMenu && (
            <div className="absolute right-0 top-10 z-20 w-32 rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenu(false);
                  onEdit(item);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[11px] text-slate-700 hover:bg-slate-50"
              >
                <Pencil size={13} />
                Edit
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenu(false);
                  onDelete(item._id);
                }}
                className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[11px] text-red-600 hover:bg-red-50"
              >
                <Trash2 size={13} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-1 grid grid-cols-2  text-[11px] text-slate-600">
        <div>
          <p className="text-slate-400">Department</p>
          <p>
            {item?.department?.name ||
              item?.departmentId?.name ||
              item?.department ||
              "-"}
          </p>
        </div>

        <div>
          <p className="text-slate-400">Budget</p>
          <p>₹{item?.budget || 0}</p>
        </div>
      </div>
    </div>
  );
}