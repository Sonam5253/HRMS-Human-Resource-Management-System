
import { useEffect, useMemo, useState } from "react";
import Button from "../commons/Button";
import { getProjectsApi } from "../../services/projectService";
import { getEmployeesApi } from "../../services/employeeApi";

export default function TaskRightPanel({
  activeTask,
  setActiveTask,
  rightOpen,
  setRightOpen,
  isCreateMode,
  handleSave,
  tasks = [],
}) {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [newLabel, setNewLabel] = useState("");
  const [assigneeSearch, setAssigneeSearch] = useState("");
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);

  const currentUser = {
    name: "Sonam",
    initial: "S",
  };

  const parentTask = activeTask?.parentTaskId
    ? tasks.find((t) => t.id === activeTask.parentTaskId)
    : null;

  useEffect(() => {
    setNewLabel(activeTask?.label || "");
  }, [activeTask]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [projectRes, employeeRes] = await Promise.all([
          getProjectsApi(),
          getEmployeesApi(),
        ]);

        const projectList = Array.isArray(projectRes?.data?.data)
          ? projectRes.data.data
          : Array.isArray(projectRes?.data)
          ? projectRes.data
          : [];

        const employeeList = Array.isArray(employeeRes?.data?.data)
          ? employeeRes.data.data
          : Array.isArray(employeeRes?.data)
          ? employeeRes.data
          : [];

        setProjects(projectList);
        setEmployees(employeeList);
      } catch (err) {
        console.error("LOAD DATA ERROR", err);
      }
    };

    loadData();
  }, []);

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const name = (emp.name || emp.fullName || "").toLowerCase();
      return name.includes(assigneeSearch.toLowerCase());
    });
  }, [employees, assigneeSearch]);

  return (
    <div className="w-full lg:w-[360px] border-l border-slate-200 bg-white relative">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <button
          onClick={() => setRightOpen(!rightOpen)}
          className="flex items-center gap-2 text-sm font-semibold text-slate-700"
        >
          Details
          <span className="text-xs">{rightOpen ? "▾" : "▸"}</span>
        </button>
      </div>

      {rightOpen && (
        <div className="space-y-5 px-4 py-4 overflow-y-auto max-h-[calc(100vh-180px)]">
          {parentTask && (
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-slate-500">Parent</span>

              <button
                onClick={() => setActiveTask(parentTask)}
                className="text-sm font-medium text-violet-600 hover:underline"
              >
                {parentTask.title}
              </button>
            </div>
          )}

          <div className="flex items-start justify-between gap-3">
            <span className="pt-2 text-sm text-slate-500">Assignee</span>

            <div className="relative w-[210px]">
              <input
                type="text"
                value={assigneeSearch}
                placeholder="Search employee"
                onFocus={() => setShowAssigneeDropdown(true)}
                onChange={(e) => {
                  setAssigneeSearch(e.target.value);
                  setShowAssigneeDropdown(true);
                }}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500"
              />

              {showAssigneeDropdown && (
                <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
                  <div className="max-h-56 overflow-y-auto py-1">
                    {filteredEmployees.length === 0 ? (
                      <div className="px-3 py-2 text-sm text-slate-500">
                        No employee found
                      </div>
                    ) : (
                      filteredEmployees.map((emp) => {
                        const isSelected = activeTask.assigned_to?.includes(
                          emp._id
                        );

                        return (
                          <button
                            key={emp._id}
                            type="button"
                            className={`flex w-full items-center justify-between px-3 py-2 text-left hover:bg-slate-50 ${
                              isSelected
                                ? "bg-violet-50 text-violet-700"
                                : "text-slate-700"
                            }`}
                            onClick={() => {
                              const currentAssigned =
                                activeTask.assigned_to || [];

                              const updatedAssigned = isSelected
                                ? currentAssigned.filter(
                                    (id) => id !== emp._id
                                  )
                                : [...currentAssigned, emp._id];

                              setActiveTask({
                                ...activeTask,
                                assigned_to: updatedAssigned,
                              });

                              setAssigneeSearch("");
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-700">
                                {(emp.name || emp.fullName)
                                  ?.charAt(0)
                                  ?.toUpperCase()}
                              </div>

                              <div>
                                <p className="text-sm font-medium">
                                  {emp.name || emp.fullName}
                                </p>
                                <p className="text-[11px] text-slate-400">
                                  {emp.email}
                                </p>
                              </div>
                            </div>

                            {isSelected && (
                              <span className="text-sm font-bold">✓</span>
                            )}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {!!activeTask.assigned_to?.length && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeTask.assigned_to.map((id) => {
                    const emp = employees.find((e) => e._id === id);

                    if (!emp) return null;

                    return (
                      <div
                        key={id}
                        className="flex items-center gap-2 rounded-full bg-violet-100 px-2 py-1 text-xs font-medium text-violet-700"
                      >
                        <span>{emp.name || emp.fullName}</span>

                        <button
                          type="button"
                          className="text-sm leading-none"
                          onClick={() => {
                            setActiveTask({
                              ...activeTask,
                              assigned_to: activeTask.assigned_to.filter(
                                (item) => item !== id
                              ),
                            });
                          }}
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {showAssigneeDropdown && (
                <button
                  type="button"
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setShowAssigneeDropdown(false)}
                />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-slate-500">Project</span>

            <select
              className="w-[210px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500"
              value={activeTask.project || ""}
              onChange={(e) =>
                setActiveTask({
                  ...activeTask,
                  project: e.target.value,
                })
              }
            >
              <option value="">Select Project</option>

              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.title || project.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-slate-500">Status</span>

            <select
              className="w-[210px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500"
              value={activeTask.status || "pending"}
              onChange={(e) =>
                setActiveTask({
                  ...activeTask,
                  status: e.target.value,
                })
              }
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-slate-500">Priority</span>

            <select
              className="w-[210px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500"
              value={activeTask.priority || "medium"}
              onChange={(e) =>
                setActiveTask({
                  ...activeTask,
                  priority: e.target.value,
                })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex items-start justify-between gap-3">
            <span className="pt-2 text-sm text-slate-500">Label</span>

            <input
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onBlur={() =>
                setActiveTask({
                  ...activeTask,
                  label: newLabel,
                })
              }
              className="w-[210px] rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-violet-500"
              placeholder="Task label"
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-slate-500">Start Date</span>

            <input
              type="date"
              value={activeTask.startDate || ""}
              onChange={(e) =>
                setActiveTask({
                  ...activeTask,
                  startDate: e.target.value,
                })
              }
              className="w-[210px] rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-violet-500"
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-slate-500">Due Date</span>

            <input
              type="date"
              value={activeTask.due || ""}
              onChange={(e) =>
                setActiveTask({
                  ...activeTask,
                  due: e.target.value,
                })
              }
              className="w-[210px] rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-violet-500"
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-slate-500">Reporter</span>

            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-xs font-semibold text-white">
                {currentUser.initial}
              </div>

              <span className="text-sm text-slate-700">
                {currentUser.name}
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
            <Button
              text="Cancel"
              variant="outline"
              size="sm"
              width="auto"
              onClick={() => setActiveTask(null)}
            />

            <Button
              text={isCreateMode ? "Add Task" : "Save"}
              size="sm"
              width="auto"
              onClick={handleSave}
            />
          </div>
        </div>
      )}
    </div>
  );
}
