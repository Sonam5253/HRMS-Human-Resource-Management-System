
import { useEffect, useState } from "react";

import Button from "../../components/commons/Button";
import TaskModal from "../../components/tasks/TaskModal";
import DeleteConfirm from "../../components/commons/DeleteConfirm";
import TaskList from "../../components/tasks/TaskList";

import { getProjectsApi } from "../../services/projectService";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  const [activityTab, setActivityTab] = useState("Comments");
  const [newComment, setNewComment] = useState("");

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const [rightOpen, setRightOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentProjectId, setCurrentProjectId] = useState(null);

  useEffect(() => {
    fetchProjects();
    fetchTasks();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await getProjectsApi();
      const projectList = Array.isArray(res?.data) ? res.data : [];

      if (projectList.length > 0) {
        setCurrentProjectId(projectList[0]._id);
      }
    } catch (err) {
      console.error("PROJECT LOAD ERROR", err);
    }
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("access");

      const response = await fetch("http://192.168.18.200:3005/tasks/get", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Failed to load tasks");
      }

      const taskList = Array.isArray(result?.data) ? result.data : [];

      const mapped = taskList
        .map((t) => {
          const assignedEmployees = Array.isArray(t.assignedTo)
            ? t.assignedTo
            : Array.isArray(t.assigned_to)
            ? t.assigned_to
            : [];

          const employeeList = JSON.parse(
            localStorage.getItem("employees") || "[]"
          );

          const normalizedAssigned = assignedEmployees.map((employee) => {
            if (typeof employee === "object") {
              return employee;
            }

            const matchedEmployee = employeeList.find(
              (emp) => emp._id === employee || emp.id === employee
            );

            return {
              _id: employee,
              name:
                matchedEmployee?.name ||
                matchedEmployee?.fullName ||
                matchedEmployee?.email ||
                "?",
            };
          });

          return {
            id: t._id || t.id,
            title: t.title || "Untitled Task",
            desc: t.notes || "No description",
            status: t.status || "pending",
            priority: t.priority || "medium",
            label: t.label || "General",

            // IMPORTANT: full employee objects store karo
            assigned_to: normalizedAssigned,

            startDate: t.startDate
              ? t.startDate.split("T")[0]
              : t.createdAt
              ? new Date(t.createdAt).toISOString().split("T")[0]
              : "",

            due: t.dueDate
              ? t.dueDate.split("T")[0]
              : t.updatedAt
              ? new Date(t.updatedAt).toISOString().split("T")[0]
              : "",

            category: t.category || "General",
            archived: false,

            project:
              typeof t.project === "object"
                ? t.project?._id
                : t.project,

            subtasks: t.subTasks || t.subtasks || [],
          };
        })
        .reverse();

      setTasks(mapped);
    } catch (err) {
      console.error("TASK LOAD ERROR", err);
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { deleteTaskApi } = await import("../../services/taskApi");

      await deleteTaskApi(id);

      setTasks((prev) => prev.filter((task) => task.id !== id));
      setShowDeleteConfirm(null);

      // backend se latest list dubara lao
      await fetchTasks();
    } catch (err) {
      console.error("DELETE TASK ERROR", err);
      alert(err?.response?.data?.message || "Unable to delete task");
    }
  };

  return (
    <>
      <div className="space-y-4 p-1 sm:p-3">
        <div className="flex items-start justify-between gap-3 sm:items-center">
          <div>
            <h1 className="text-lg font-semibold text-slate-900 sm:text-2xl">
              Tasks
            </h1>
            <p className="text-sm text-slate-500">
              Track and manage tasks for this project
            </p>
          </div>

          <Button
            text="+ New Task"
            disabled={!currentProjectId}
            size="md"
            width="auto"
            className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded-xl bg-brand px-3 py-2 text-xs font-medium !text-white shadow-sm"
            onClick={() => {
              setActiveTask({
                id: null,
                title: "",
                desc: "",
                status: "pending",
                priority: "medium",
                label: "",
                assigned_to: [],
                startDate: "",
                due: "",
                subtasks: [],
                project: currentProjectId,
              });

              setIsCreateMode(true);
            }}
          />
        </div>

        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white py-12 text-center text-sm text-slate-500 shadow-sm">
            Loading tasks...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 py-12 text-center text-sm text-red-500 shadow-sm">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="hidden lg:block rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto overflow-y-visible">
                <table className="w-full min-w-[980px] overflow-visible">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr className="text-left text-[11px] uppercase tracking-wide text-slate-500">
                      <th className="px-4 py-4">Task</th>
                      <th className="px-4 py-4">Status</th>
                      <th className="px-4 py-4">Priority</th>
                      <th className="px-4 py-4">Assignee</th>
                      <th className="px-4 py-4">Label</th>
                      <th className="px-4 py-4">Start</th>
                      <th className="px-4 py-4">Due</th>
                      <th className="px-4 py-4 text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {tasks.map((task, index) => (
                      <tr
                        key={task.id}
                        onClick={() => {
                          setActiveTask(task);
                          setIsCreateMode(false);
                        }}
                        className="cursor-pointer border-b border-slate-100 transition hover:bg-slate-50"
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-sm font-bold text-violet-700">
                              {task.title?.charAt(0)?.toUpperCase()}
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-slate-800">
                                {task.title}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                {task.desc}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                            {task.status}
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              task.priority === "high"
                                ? "bg-red-100 text-red-600"
                                : task.priority === "medium"
                                ? "bg-orange-100 text-orange-600"
                                : "bg-emerald-100 text-emerald-600"
                            }`}
                          >
                            {task.priority}
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            {task.assigned_to?.length ? (
                              <>
                                <div className="flex -space-x-2">
                                  {task.assigned_to
                                    .slice(0, 3)
                                    .map((employee, idx) => {
                                      const employeeName =
                                        employee?.name ||
                                        employee?.fullName ||
                                        employee?.email ||
                                        "User";

                                      return (
                                        <div
                                          key={employee?._id || idx}
                                          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-violet-600 text-[11px] font-semibold text-white"
                                          title={employeeName}
                                        >
                                          {employeeName.charAt(0).toUpperCase()}
                                        </div>
                                      );
                                    })}

                                  {task.assigned_to.length > 3 && (
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-[11px] font-semibold text-slate-700">
                                      +{task.assigned_to.length - 3}
                                    </div>
                                  )}
                                </div>

                                <span className="ml-2 max-w-[140px] truncate text-sm text-slate-700">
                                  {task.assigned_to[0]?.name ||
                                    task.assigned_to[0]?.fullName ||
                                    task.assigned_to[0]?.email}
                                </span>
                              </>
                            ) : (
                              <>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-500">
                                  ?
                                </div>
                                <span className="text-sm text-slate-500">
                                  Unassigned
                                </span>
                              </>
                            )}
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <span className="rounded-lg bg-blue-100 px-3 py-1 text-xs text-blue-600">
                            {task.label}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-sm text-slate-600">
                          {task.startDate}
                        </td>

                        <td className="px-4 py-4 text-sm text-slate-600">
                          {task.due}
                        </td>

                        <td className="relative overflow-visible px-4 py-4 text-center">
                          <button
                            type="button"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId((prev) =>
                                prev === task.id ? null : task.id
                              );
                            }}
                          >
                            ⋮
                          </button>

                          {openMenuId === task.id && (
                            <>
                              <div
                                className="fixed inset-0 z-40"
                                onClick={() => setOpenMenuId(null)}
                              />

                              <div
                                className={`absolute right-2 z-50 w-36 rounded-2xl border border-slate-200 bg-white py-1 shadow-2xl ${
                                  index >= tasks.length - 2
                                    ? "bottom-11"
                                    : "top-11"
                                }`}
                              >
                                <button
                                  className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveTask(task);
                                    setIsCreateMode(false);
                                    setOpenMenuId(null);
                                  }}
                                >
                                  Edit
                                </button>

                                <button
                                  className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowDeleteConfirm(task.id);
                                    setOpenMenuId(null);
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:hidden">
              <TaskList
                tasks={tasks}
                setTasks={setTasks}
                setActiveTask={setActiveTask}
                setShowDeleteConfirm={setShowDeleteConfirm}
                setIsCreateMode={setIsCreateMode}
              />
            </div>
          </>
        )}
      </div>

      <DeleteConfirm
        open={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        onConfirm={() => handleDelete(showDeleteConfirm)}
        title="Delete Task?"
        message="Are you sure you want to delete this task? This action cannot be undone."
      />

      <TaskModal
        activeTask={activeTask}
        setActiveTask={setActiveTask}
        isCreateMode={isCreateMode}
        tasks={tasks}
        setTasks={setTasks}
        fetchTasks={fetchTasks}
        collapsed={collapsed}
        activityTab={activityTab}
        setActivityTab={setActivityTab}
        newComment={newComment}
        setNewComment={setNewComment}
        rightOpen={rightOpen}
        setRightOpen={setRightOpen}
        projectId={currentProjectId}
      />
    </>
  );
}
