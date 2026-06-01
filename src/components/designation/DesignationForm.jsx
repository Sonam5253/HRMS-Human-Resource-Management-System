import { useEffect, useState } from "react";
import api from "../../api/axios";
import Button from "../commons/Button";

export default function DesignationForm({ onSubmit, loading }) {
  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    title: "",
    name: "",
    department: "",
    salaryRange: { min: "", max: "" },
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await api.get("/departments/get");
        setDepartments(res.data.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "min" || name === "max") {
      setForm((prev) => ({
        ...prev,
        salaryRange: {
          ...prev.salaryRange,
          [name]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.department) {
      alert("Please select department");
      return;
    }

    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* 🔷 TITLE */}
      <div>
        <label className="text-xs font-semibold text-slate-500">
          Title
        </label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Junior / Senior"
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
        />
      </div>

      {/* 🔷 DESIGNATION NAME */}
      <div>
        <label className="text-xs font-semibold text-slate-500">
          Designation Name
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Software Engineer"
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
        />
      </div>

      {/* 🔷 DEPARTMENT */}
      <div>
        <label className="text-xs font-semibold text-slate-500">
          Department
        </label>
        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition bg-white"
        >
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* 🔷 SALARY CARD */}
      <div className="bg-slate-50 p-4 rounded-xl border">
        <p className="text-xs font-semibold text-slate-500 mb-2">
          Salary Range
        </p>

        <div className="flex gap-3">
          <input
            name="min"
            value={form.salaryRange.min}
            onChange={handleChange}
            type="number"
            placeholder="Min ₹"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <input
            name="max"
            value={form.salaryRange.max}
            onChange={handleChange}
            type="number"
            placeholder="Max ₹"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* 🔷 ACTION BUTTON */}
      <div className="pt-2">
        <Button
          type="submit"
          text={loading ? "Creating..." : "Create Designation"}
          variant="brand"
          className="w-full rounded-xl shadow-md hover:scale-[1.02] transition"
        />
      </div>

    </form>
  );
}