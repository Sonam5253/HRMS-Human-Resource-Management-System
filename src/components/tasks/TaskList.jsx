import { useMemo, useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

export default function TaskList({
  tasks,
  setTasks,
  setActiveTask,
  setShowDeleteConfirm,
  setIsCreateMode,
}) {
  const [openMenuId, setOpenMenuId] = useState(null);

  const sortedTasks = useMemo(() => {
    return [...tasks].reverse();
  }, [tasks]);

  return (
    <div className="grid gap-3 sm:gap-4 lg:gap-5">
      {sortedTasks.map((task) => {
        const assignedEmployees = Array.isArray(task.assigned_to)
          ? task.assigned_to
          : [];

        return (
          <div
            key={task.id}
            onClick={() => {
              setActiveTask(task);
              setIsCreateMode(false);
            }}
            className="group relative cursor-pointer overflow-visible rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg sm:p-5"
          >
            <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

            {/* Desktop */}
            <div className="hidden items-center gap-4 sm:flex">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-base font-semibold text-violet-700">
                {task.title?.charAt(0)?.toUpperCase() || "?"}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-base font-semibold text-slate-800">
                        {task.title}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          task.priority === "high"
                            ? "bg-red-100 text-red-600"
                            : task.priority === "medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    <p className="mt-1 truncate text-sm text-slate-500">
                      {task.desc || "No description"}
                    </p>
                  </div>

                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(
                          openMenuId === task.id ? null : task.id
                        );
                      }}
                      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {openMenuId === task.id && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(null);
                          }}
                        />

                        <div className="absolute right-0 top-full z-50 mt-2 w-40 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(null);
                              setActiveTask(task);
                              setIsCreateMode(false);
                            }}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
                          >
                            <Pencil size={16} />
                            Edit
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(null);
                              setShowDeleteConfirm(task.id);
                            }}
                            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-5 gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Status
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {task.status}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Start
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {task.startDate || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Due
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {task.due || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Label
                    </p>
                    <p className="mt-1 text-sm font-medium text-violet-700">
                      {task.label || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Assigned
                    </p>

                    <div className="mt-2 flex items-center">
                      {assignedEmployees.length > 0 ? (
                        <>
                          <div className="flex -space-x-2">
                            {assignedEmployees.slice(0, 3).map((emp, index) => {
                              const employee =
                                typeof emp === "object"
                                  ? emp
                                  : { name: task.assignee || "?" };

                              return (
                                <div
                                  key={employee._id || index}
                                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-violet-600 text-xs font-semibold text-white"
                                >
                                  {(employee.name || "?")
                                    .charAt(0)
                                    .toUpperCase()}
                                </div>
                              );
                            })}

                            {assignedEmployees.length > 3 && (
                              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-xs font-semibold text-slate-700">
                                +{assignedEmployees.length - 3}
                              </div>
                            )}
                          </div>

                          <span className="ml-3 truncate text-sm text-slate-700">
                            {assignedEmployees[0]?.name ||
                              `${assignedEmployees.length} assigned`}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm text-slate-500">
                          Unassigned
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile */}
            <div className="sm:hidden">
              <div className="flex items-start gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-lg font-semibold text-violet-700">
                  {task.title?.charAt(0)?.toUpperCase() || "?"}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-base font-semibold text-slate-900">
                        {task.title}
                      </h3>

                      <p className="mt-1 line-clamp-1 text-sm text-slate-500">
                        {task.desc || "No description"}
                      </p>
                    </div>

                    <div className="relative shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(
                            openMenuId === task.id ? null : task.id
                          );
                        }}
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openMenuId === task.id && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setOpenMenuId(null)}
                          />

                          <div className="absolute right-0 top-full z-50 mt-2 w-40 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(null);
                                setActiveTask(task);
                                setIsCreateMode(false);
                              }}
                              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
                            >
                              <Pencil size={16} />
                              Edit
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(null);
                                setShowDeleteConfirm(task.id);
                              }}
                              className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50"
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        task.priority === "high"
                          ? "bg-red-100 text-red-600"
                          : task.priority === "medium"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {task.priority}
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {task.status}
                    </span>

                    {task.label && (
                      <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
                        {task.label}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Start
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {task.startDate || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Due
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {task.due || "-"}
                  </p>
                </div>

                <div className="col-span-2 flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Assigned
                    </p>

                    <div className="mt-2 flex -space-x-2">
                      {assignedEmployees.length > 0 ? (
                        <>
                          {assignedEmployees.slice(0, 3).map((emp, index) => {
                            const employee =
                              typeof emp === "object"
                                ? emp
                                : { name: task.assignee || "?" };

                            return (
                              <div
                                key={employee._id || index}
                                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-violet-600 text-sm font-semibold text-white"
                              >
                                {(employee.name || "?")
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>
                            );
                          })}

                          {assignedEmployees.length > 3 && (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-sm font-semibold text-slate-700">
                              +{assignedEmployees.length - 3}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-500">
                          ?
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="text-sm font-medium text-slate-600">
                    {assignedEmployees.length > 0
                      ? `${assignedEmployees.length} assigned`
                      : "Unassigned"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}