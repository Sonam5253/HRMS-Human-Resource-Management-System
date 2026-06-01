// src/components/EditEmployeeModal.jsx

import { useEffect, useState } from "react";
import { X, UserCheck, UserX } from "lucide-react";
import { updateEmployeeApi } from "../services/employeeApi";

export default function EditEmployeeModal({
  open,
  setOpen,
  employee,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    designation: "",
    isActive: true,
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        fullName: employee.fullName || "",
        phone: employee.phone || "",
        email: employee.email || "",
        designation: employee.designation || "",
        isActive: employee.isActive === true,
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateEmployeeApi(employee._id, formData);

      const savedEmployees = JSON.parse(
        localStorage.getItem("employees") || "[]"
      );

      const updatedEmployees = savedEmployees.map((emp) =>
        emp._id === employee._id
          ? {
              ...emp,
              ...formData,
            }
          : emp
      );

      localStorage.setItem(
        "employees",
        JSON.stringify(updatedEmployees)
      );

      setOpen(false);
      onSuccess?.();
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Failed to update employee"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open || !employee) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-800">
              Update Employee
            </h2>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Change employee details and status
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 p-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-[11px] font-medium text-slate-500">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                className="h-10 w-full rounded-2xl border border-slate-200 px-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-medium text-slate-500">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="h-10 w-full rounded-2xl border border-slate-200 px-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-medium text-slate-500">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="h-10 w-full rounded-2xl border border-slate-200 px-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-medium text-slate-500">
                Designation
              </label>

              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="Enter designation"
                className="h-10 w-full rounded-2xl border border-slate-200 px-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl ${
                    formData.isActive
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-rose-100 text-rose-600"
                  }`}
                >
                  {formData.isActive ? (
                    <UserCheck size={18} />
                  ) : (
                    <UserX size={18} />
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Employee Status
                  </p>

                  <p className="mt-1 text-[11px] text-slate-500">
                    Inactive employee will remain inactive until admin enables again.
                  </p>

                  <span
                    className={`mt-2 inline-flex rounded-xl px-2.5 py-1 text-[10px] font-semibold ${
                      formData.isActive
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-600"
                    }`}
                  >
                    {formData.isActive
                      ? "Currently Active"
                      : "Currently Inactive"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    isActive: !prev.isActive,
                  }))
                }
                className={`relative flex h-7 w-12 items-center rounded-full p-1 transition ${
                  formData.isActive
                    ? "bg-emerald-500"
                    : "bg-slate-300"
                }`}
              >
                <span
                  className={`h-5 w-5 rounded-full bg-white shadow-md transition ${
                    formData.isActive
                      ? "translate-x-5"
                      : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-9 rounded-xl border border-slate-200 px-4 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="h-9 rounded-xl bg-indigo-600 px-4 text-xs font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}