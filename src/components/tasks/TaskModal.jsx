import { useEffect, useState } from "react";
import Card from "../commons/Card";
import TaskLeftPanel from "./TaskLeftPanel";
import TaskRightPanel from "./TaskRightPanel";
import { createTaskApi, updateTaskApi } from "../../services/taskApi";

export default function TaskModal({
  activeTask,
  setActiveTask,
  isCreateMode,
  tasks,
  setTasks,
  fetchTasks,
  collapsed,
  activityTab,
  setActivityTab,
  newComment,
  setNewComment,
  rightOpen,
  setRightOpen,
  projectId,
}) {
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (activeTask && isCreateMode) {
      setRightOpen(true);
    }
  }, [activeTask, isCreateMode, setRightOpen]);

  if (!activeTask) return null;

  const handleSave = async () => {
    try {
      setSaving(true);

      const selectedProject =
        typeof activeTask.project === "object"
          ? activeTask.project?._id
          : activeTask.project || projectId;

      if (!selectedProject) {
        alert("Please select a project");
        return;
      }

      if (!activeTask.title?.trim()) {
        alert("Please enter task title");
        return;
      }

      if (!activeTask.label?.trim()) {
        alert("Please enter task label");
        return;
      }

      if (
        !Array.isArray(activeTask.assigned_to) ||
        activeTask.assigned_to.length === 0
      ) {
        alert("Please assign at least one employee");
        return;
      }

      const payload = {
        title: activeTask.title?.trim() || "",
        project: String(selectedProject),

        label: activeTask.label?.trim() || "",

        assignedTo: Array.isArray(activeTask.assigned_to)
          ? activeTask.assigned_to
          : [],

        status: activeTask.status || "pending",
        priority: activeTask.priority || "medium",

        startDate: activeTask.startDate || null,
        dueDate: activeTask.due || null,
      };

      console.log("TASK PAYLOAD 👉", payload);

      if (!activeTask.id) {
        const res = await createTaskApi(payload);

        const rawTask = res?.data?.data || res?.data || res;

        const createdTask = mapApiTaskToUi(rawTask);

        setTasks((prev) => [createdTask, ...prev]);

        if (fetchTasks) {
          await fetchTasks();
        }

        setActiveTask(null);
        return;
      }

      const res = await updateTaskApi(activeTask.id, payload);

      const updatedTask =
        res?.data?.data || res?.data || res;

      setTasks((prev) =>
        prev.map((task) =>
          (task.id || task._id) === activeTask.id
            ? mapApiTaskToUi(updatedTask)
            : task
        )
      );

      if (fetchTasks) {
        await fetchTasks();
      }

      setActiveTask(null);
    } catch (err) {
      console.error("TASK SAVE ERROR", err);

      alert(
        err?.response?.data?.message ||
          "Unable to save task"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4">
      <Card className="relative h-[95vh] w-full max-w-7xl overflow-hidden rounded-2xl">
        <button
          className="absolute right-4 top-3 z-20 text-2xl text-slate-500 hover:text-slate-800"
          onClick={() => setActiveTask(null)}
        >
          ✕
        </button>

        <div className="flex h-full flex-col overflow-hidden lg:flex-row">
          <TaskLeftPanel
            activeTask={activeTask}
            setActiveTask={setActiveTask}
            tasks={tasks}
            collapsed={collapsed}
            activityTab={activityTab}
            setActivityTab={setActivityTab}
            newComment={newComment}
            setNewComment={setNewComment}
          />

          <TaskRightPanel
            activeTask={activeTask}
            setActiveTask={setActiveTask}
            rightOpen={rightOpen}
            setRightOpen={setRightOpen}
            isCreateMode={isCreateMode}
            handleSave={handleSave}
            saving={saving}
            tasks={tasks}
          />
        </div>
      </Card>
    </div>
  );
}

function mapApiTaskToUi(task) {
  const assignedEmployees = Array.isArray(task.assignedTo)
    ? task.assignedTo
    : Array.isArray(task.assigned_to)
    ? task.assigned_to
    : [];

  return {
    id: task._id || task.id,
    title: task.title || "",
    desc: task.notes || task.description || "No description",

    status: task.status || "pending",
    priority: task.priority || "medium",

    category: task.category || "general",
    label: task.label || "",

    assigned_to: assignedEmployees.map((emp) =>
      typeof emp === "object" ? emp._id : emp
    ),

    assignee:
      assignedEmployees.length > 0
        ? assignedEmployees
            .map((emp) =>
              typeof emp === "object"
                ? emp.name || emp.fullName
                : ""
            )
            .filter(Boolean)
            .join(", ")
        : "Unassigned",

    assigneeInitial:
      assignedEmployees.length > 0
        ? (
            (typeof assignedEmployees[0] === "object"
              ? assignedEmployees[0].name ||
                assignedEmployees[0].fullName
              : "U") || "U"
          )
            .charAt(0)
            .toUpperCase()
        : "?",

    startDate:
      task.startDate ||
      (task.createdAt
        ? new Date(task.createdAt).toISOString().split("T")[0]
        : ""),

    due:
      task.dueDate ||
      (task.updatedAt
        ? new Date(task.updatedAt).toISOString().split("T")[0]
        : ""),

    project:
      typeof task.project === "object"
        ? task.project._id
        : task.project || "",

    subtasks: task.subTasks || task.subtasks || [],
  };
}