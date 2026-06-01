
import { useEffect, useState } from "react";
import { X, Calendar } from "lucide-react";

import {
  getDepartments,
  getDepartmentHrs,
} from "../../services/departmentApi";

import { getClients } from "../../services/clientApi";
import { getShiftsApi } from "../../services/shiftService";
import axios from "../../api/axios";

export default function NewProjectModal({
  open,
  onClose,
  onSubmit,
  editingProject,
}) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    department: "",
    hr: "",
    teamLeader: "",
    client: "",
    shift: "",
    projectType: "internal",
    status: "pending",
    budget: "",
    startDate: "",
    deadline: "",
  });

  const [departments, setDepartments] = useState([]);
  const [hrs, setHrs] = useState([]);
  const [teamLeaders, setTeamLeaders] = useState([]);
  const [clients, setClients] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) return;

    const loadInitialData = async () => {
      try {
        const [departmentRes, clientRes, shiftRes] = await Promise.all([
          getDepartments(),
          getClients(),
          getShiftsApi(),
        ]);

        setDepartments(departmentRes?.data || []);
        setClients(clientRes?.data || []);
        setShifts(shiftRes?.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    loadInitialData();
  }, [open]);

  useEffect(() => {
    if (editingProject) {
      setForm({
        name: editingProject.name || "",
        description: editingProject.description || "",
        department:
          editingProject.department?._id ||
          editingProject.department ||
          "",
        hr: editingProject.hr?._id || editingProject.hr || "",
        teamLeader:
          editingProject.teamLeader?._id ||
          editingProject.teamLeader ||
          "",
        client:
          editingProject.client?._id ||
          editingProject.client ||
          "",
        shift:
          editingProject.shift?._id ||
          editingProject.shift ||
          "",
        projectType: editingProject.projectType || "internal",
        status: editingProject.status || "pending",
        budget: editingProject.budget || "",
        startDate: editingProject.startDate?.slice(0, 10) || "",
        deadline: editingProject.deadline?.slice(0, 10) || "",
      });
    } else {
      setForm({
        name: "",
        description: "",
        department: "",
        hr: "",
        teamLeader: "",
        client: "",
        shift: "",
        projectType: "internal",
        status: "pending",
        budget: "",
        startDate: "",
        deadline: "",
      });
    }

    setErrors({});
  }, [editingProject, open]);

  useEffect(() => {
    if (!form.department) {
      setHrs([]);
      setTeamLeaders([]);
      return;
    }

    const fetchHrs = async () => {
      try {
        const res = await getDepartmentHrs(form.department);
        setHrs(res?.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchHrs();
  }, [form.department]);

  useEffect(() => {
    if (!form.hr) {
      setTeamLeaders([]);
      return;
    }

    const fetchTeamLeaders = async () => {
      try {
        const res = await axios.get(
          `/departments/hr/${form.hr}/team-leaders`
        );

        setTeamLeaders(res?.data?.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTeamLeaders();
  }, [form.hr]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      if (name === "department") {
        updated.hr = "";
        updated.teamLeader = "";
      }

      if (name === "hr") {
        updated.teamLeader = "";
      }

      return updated;
    });

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Project name is required";
    }

    if (!form.department) {
      newErrors.department = "Department is required";
    }

    if (!form.hr) {
      newErrors.hr = "HR is required";
    }

    if (!form.shift) {
      newErrors.shift = "Shift is required";
    }

    if (!form.projectType) {
      newErrors.projectType = "Project type is required";
    }

    if (form.projectType === "external" && !form.client) {
      newErrors.client = "Client is required for external project";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      ...form,
      teamLeader: form.teamLeader || null,
      client: form.client || null,
      budget: Number(form.budget || 0),
    });
  };

  const inputClass = (field) =>
    `h-10 w-full rounded-xl border px-3 text-xs outline-none ${
      errors[field]
        ? "border-red-500"
        : "border-slate-200 focus:border-violet-500"
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-slate-800">
              {editingProject ? "Update Project" : "Create Project"}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Fill project details and assign HR / Team Leader
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Project Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter project name"
                className={inputClass("name")}
              />
              {errors.name && (
                <p className="mt-1 text-[11px] text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className={inputClass("department")}
              >
                <option value="">Select Department</option>
                {departments.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="mt-1 text-[11px] text-red-500">
                  {errors.department}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                HR <span className="text-red-500">*</span>
              </label>
              <select
                name="hr"
                value={form.hr}
                onChange={handleChange}
                disabled={!form.department}
                className={`${inputClass("hr")} ${
                  !form.department ? "bg-slate-100 text-slate-400" : ""
                }`}
              >
                <option value="">Select HR</option>
                {hrs.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.fullName}
                  </option>
                ))}
              </select>
              {errors.hr && (
                <p className="mt-1 text-[11px] text-red-500">{errors.hr}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Team Leader
              </label>
              <select
                name="teamLeader"
                value={form.teamLeader}
                onChange={handleChange}
                disabled={!form.hr}
                className={`${inputClass("teamLeader")} ${
                  !form.hr ? "bg-slate-100 text-slate-400" : ""
                }`}
              >
                <option value="">Select Team Leader</option>
                {teamLeaders.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                name="projectType"
                value={form.projectType}
                onChange={handleChange}
                className={inputClass("projectType")}
              >
                <option value="internal">Internal</option>
                <option value="external">External</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Client
                {form.projectType === "external" && (
                  <span className="text-red-500"> *</span>
                )}
              </label>
              <select
                name="client"
                value={form.client}
                onChange={handleChange}
                className={inputClass("client")}
              >
                <option value="">Select Client</option>
                {clients.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name || item.companyName}
                  </option>
                ))}
              </select>
              {errors.client && (
                <p className="mt-1 text-[11px] text-red-500">
                  {errors.client}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Shift <span className="text-red-500">*</span>
              </label>
              <select
                name="shift"
                value={form.shift}
                onChange={handleChange}
                className={inputClass("shift")}
              >
                <option value="">Select Shift</option>
                {shifts.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.shift && (
                <p className="mt-1 text-[11px] text-red-500">{errors.shift}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className={inputClass("status")}
              >
                <option value="pending">Pending</option>
                <option value="active">In-Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Budget
              </label>
              <input
                type="number"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                placeholder="Enter budget"
                className={inputClass("budget")}
              />
            </div>

            <div className="relative">
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Start Date
              </label>
              <Calendar
                size={14}
                className="pointer-events-none absolute left-3 top-[38px] text-slate-400"
              />
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="h-10 w-full rounded-xl border border-slate-200 pl-9 pr-3 text-xs outline-none focus:border-violet-500"
              />
            </div>

            <div className="relative">
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Deadline
              </label>
              <Calendar
                size={14}
                className="pointer-events-none absolute left-3 top-[38px] text-slate-400"
              />
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                className="h-10 w-full rounded-xl border border-slate-200 pl-9 pr-3 text-xs outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Write project description..."
              className="w-full rounded-2xl border border-slate-200 px-3 py-3 text-xs outline-none focus:border-violet-500"
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-violet-600 px-5 py-2 text-xs font-semibold text-white hover:bg-violet-700"
            >
              {editingProject ? "Update Project" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
