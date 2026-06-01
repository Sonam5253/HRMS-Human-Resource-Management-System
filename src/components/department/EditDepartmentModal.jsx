import { useState } from "react";
import Modal from "../commons/Modal";
import Button from "../commons/Button";
import { updateDepartment } from "../../services/departmentApi";

export default function EditDepartmentModal({
  department,
  onClose,
  onUpdated,
}) {
  const [form, setForm] = useState({
    name: department?.name || "",
    
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    try {
      if (!form.name.trim()) {
        setError("Department name is required");
        return;
      }

      setLoading(true);
      setError("");

      const response = await updateDepartment(
        department.id,
        {
          name: form.name,
          
        }
      );

      onUpdated(response.data);
      onClose();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to update department"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Department"
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
            text={loading ? "Updating..." : "Update"}
            size="sm"
            width="auto"
            variant="primary"
            onClick={handleUpdate}
          />
        </>
      }
    >
      <div className="space-y-3">
        <div>
          <label className="block text-[11px] font-medium text-slate-600 mb-1">
            Department Name
          </label>

          <input
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none"
          />
        </div>

        <div>
         

         
        </div>

        {error && (
          <p className="text-[11px] text-red-500">{error}</p>
        )}
      </div>
    </Modal>
  );
}