import { useState } from "react";
import Modal from "../commons/Modal";
import Button from "../commons/Button";
import { createDepartment } from "../../services/departmentApi";

export default function CreateDepartmentModal({
  onClose,
  onCreated,
}) {
  const [form, setForm] = useState({
    name: "",
    
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateDepartment = async () => {
    try {
      if (!form.name.trim()) {
        setError("Department name is required");
        return;
      }

      setLoading(true);
      setError("");

      const payload = {
        name: form.name,
        
      };

      const response = await createDepartment(payload);

      if (onCreated) {
        onCreated(response);
      }

      onClose();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to create department"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Department"
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
            text={loading ? "Creating..." : "Create"}
            size="sm"
            width="auto"
            variant="primary"
            onClick={handleCreateDepartment}
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
              setForm({ ...form, name: e.target.value })
            }
            placeholder="Finance Department"
            className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        
        {error && (
          <p className="text-[11px] text-red-500">{error}</p>
        )}
      </div>
    </Modal>
  );
}

