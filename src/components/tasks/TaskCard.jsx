import Card from "../commons/Card";
import Badge from "../commons/Badge";
import Button from "../commons/Button";

export default function TaskCard({
  task,
  setTasks,
  setActiveTask,
  setShowDeleteConfirm,
  setIsCreateMode,
}) {
  const priorityColor = (p) =>
    p === "High" ? "danger" : p === "Medium" ? "warning" : "success";

  return (
    <Card
      className="
        flex flex-col gap-4
        sm:flex-row sm:items-start sm:justify-between

        /* 🌙 GLOBAL THEME SUPPORT */
        bg-white dark:bg-[#1D2125]
        text-gray-800 dark:text-gray-200
        border border-gray-200 dark:border-white/10
        transition hover:shadow-lg
      "
    >
      {/* LEFT CONTENT */}
      <div className="flex-1">
        <h3 className="font-semibold text-base sm:text-lg">
          {task.title}
        </h3>

        <div className="flex flex-wrap gap-2 mt-2">
          <Badge text={task.status} />
          <Badge
            text={task.priority}
            variant={priorityColor(task.priority)}
          />
        </div>
      </div>

      {/* ACTION BUTTON */}
      <div className="w-full sm:w-auto">
        <Button
          text="View / Edit"
          size="sm"
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => {
            setActiveTask({ ...task });
            setIsCreateMode(false);
          }}
        />
      </div>
    </Card>
  );
}
