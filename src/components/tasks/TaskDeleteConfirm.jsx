import Card from "../commons/Card";
import Button from "../commons/Button";
import { deleteTaskApi } from "../../services/taskApi";

export default function TaskDeleteConfirm({
  showDeleteConfirm,
  setShowDeleteConfirm,
  handleDelete, // 👉 parent se UI update ke liye
}) {
  if (!showDeleteConfirm) return null;

  const onConfirmDelete = async () => {
    try {
      // 🔥 DELETE API CALL
      await deleteTaskApi(showDeleteConfirm);

      // 🔥 Parent ko batao UI se hata de
      handleDelete(showDeleteConfirm);

      // 🔥 Modal close
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error(error);
      alert("Task delete nahi hua");
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/40 dark:bg-black/60
      "
    >
      <Card
        className="
          w-80
          bg-white dark:bg-[#1D2125]
          text-gray-800 dark:text-gray-200
          border border-gray-200 dark:border-white/10
        "
      >
        <p className="mb-4 text-sm">
          Are you sure you want to delete?
        </p>

        <div className="flex justify-end gap-2">
          <Button
            text="Cancel"
            size="sm"
            variant="outline"
            onClick={() => setShowDeleteConfirm(null)}
          />

          <Button
            text="Delete"
            size="sm"
            variant="danger"
            onClick={onConfirmDelete}   // 🔥 YAHI SE CALL
          />
        </div>
      </Card>
    </div>
  );
}
