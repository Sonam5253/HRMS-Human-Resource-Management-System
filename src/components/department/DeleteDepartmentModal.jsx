import Modal from "../commons/Modal";
import Button from "../commons/Button";
import { Trash2 } from "lucide-react";

export default function DeleteDepartmentModal({
  department,
  loading,
  onClose,
  onConfirm,
}) {
  return (
    <Modal
      title="Delete Department"
      onClose={onClose}
      actions={
        <>
          <Button
            text="Cancel"
            size="sm"
            width="auto"
            variant="outline"
            onClick={onClose}
          />

          <Button
            text={loading ? "Deleting..." : "Delete"}
            size="sm"
            width="auto"
            variant="danger"
            onClick={onConfirm}
          />
        </>
      }
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center shrink-0">
          <Trash2 size={16} className="text-red-500" />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-800">
            Are you sure?
          </p>

          <p className="text-xs text-slate-500 leading-5">
            You are going to delete{" "}
            <span className="font-semibold text-slate-700">
              {department?.name}
            </span>
            . This action cannot be undone.
          </p>
        </div>
      </div>
    </Modal>
  );
}