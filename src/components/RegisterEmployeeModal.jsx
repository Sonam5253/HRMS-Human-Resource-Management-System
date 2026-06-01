
import {
  X,
  User,
  Phone,
  Mail,
  Lock,
  Briefcase,
  Shield,
  Building2,
  Users,
  Clock3,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Modal from "./commons/Modal";
import { getDepartments } from "../services/departmentApi";
import {
  registerEmployeeApi,
  getEmployeesApi,
} from "../services/employeeApi";
import { getShiftsApi } from "../services/shiftService";

export default function RegisterEmployeeModal({
  open,
  setOpen,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [shifts, setShifts] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    role: "Employee",
    designation: "",
    departmentId: "",
    selectedHrId: "",
    selectedTlId: "",
    shiftId: "",
    isIndividual: false,
    basicSalary: "",
  });

  useEffect(() => {
  if (!open) return;

  const fetchDropdowns = async () => {
    try {
      const departmentRes = await getDepartments();
      setDepartments(departmentRes?.data || []);
    } catch (err) {
      console.log("Department error", err);
    }

    try {
      const shiftRes = await getShiftsApi();
      setShifts(shiftRes?.data || []);
    } catch (err) {
      console.log("Shift error", err);
    }

    try {
      const employeeRes = await getEmployeesApi();
      setEmployees(employeeRes?.data?.data || []);
    } catch (err) {
      console.log("Employee error", err);
      setEmployees([]);
    }
  };

  fetchDropdowns();
}, [open]);

  const filteredHrList = useMemo(() => {
    return employees.filter(
      (emp) =>
        emp.role === "HR" &&
        (emp.departmentId?._id || emp.departmentId) ===
          form.departmentId
    );
  }, [employees, form.departmentId]);

  const filteredTlList = useMemo(() => {
    return employees.filter((emp) => {
      const sameDepartment =
        emp.role === "Team_Leader" &&
        (emp.departmentId?._id || emp.departmentId) ===
          form.departmentId;

      const sameHr = form.selectedHrId
        ? emp.reportingTo?.includes(form.selectedHrId)
        : true;

      return sameDepartment && sameHr;
    });
  }, [employees, form.departmentId, form.selectedHrId]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      if (name === "departmentId") {
        updated.selectedHrId = "";
        updated.selectedTlId = "";
      }

      if (name === "selectedHrId") {
        updated.selectedTlId = "";
      }

      return updated;
    });

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      basicSalary: Number(form.basicSalary),
      selectedHrId: form.isIndividual ? "" : form.selectedHrId,
      selectedTlId: form.isIndividual ? "" : form.selectedTlId,
    };

    try {
      setLoading(true);

      const res = await registerEmployeeApi(payload);

      if (res.data?.success) {
        onSuccess?.(res.data.data);
        setOpen(false);
      }
    } catch (error) {
      setErrors({
        submit:
          error?.response?.data?.message ||
          "Unable to create employee",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

 return (
  <Modal
    title={
      <div>
        <h2 className="text-sm font-semibold text-slate-800">
          Create Employee
        </h2>
        <p className="text-[11px] text-slate-500">
          Add Employee / HR / Team Leader
        </p>
      </div>
    }
    onClose={() => setOpen(false)}
    cardClassName="max-w-lg rounded-lg  shadow-2xl"
    bodyClassName="hide-scrollbar max-h-[85vh] overflow-y-auto p-4 text-sm"
    actions={
      <>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-xl border border-slate-200 px-4 py-2 text-xs text-slate-600"
        >
          Cancel
        </button>

        <button
          type="submit"
          form="register-employee-form"
          disabled={loading}
          className="rounded-xl bg-violet-600 px-4 py-2 text-xs text-white"
        >
          {loading ? "Creating..." : "Create Employee"}
        </button>
      </>
    }
  >
    <form
      id="register-employee-form"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-2 gap-3">
        <Input
          icon={<User size={14} />}
          label="Full Name"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
        />

        <Input
          icon={<Phone size={14} />}
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <div className="col-span-2 grid grid-cols-2 gap-3">
          <Input
            icon={<Mail size={14} />}
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            icon={<Lock size={14} />}
            type="password"
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <SelectField
          icon={<Shield size={14} />}
          label="Role"
          name="role"
          value={form.role}
          onChange={handleChange}
          options={[
            { label: "Employee", value: "Employee" },
            { label: "HR", value: "HR" },
            {
              label: "Team Leader",
              value: "Team_Leader",
            },
          ]}
        />

        <Input
          icon={<Briefcase size={14} />}
          label="Designation"
          name="designation"
          value={form.designation}
          onChange={handleChange}
        />

        <SelectField
          icon={<Building2 size={14} />}
          label="Department"
          name="departmentId"
          value={form.departmentId}
          onChange={handleChange}
          placeholder="Select Department"
          options={departments.map((item) => ({
            label: item.name,
            value: item._id,
          }))}
        />

        <SelectField
          icon={<Clock3 size={14} />}
          label="Shift"
          name="shiftId"
          value={form.shiftId}
          onChange={handleChange}
          placeholder="Select Shift"
          options={shifts.map((item) => ({
            label: item.name,
            value: item._id,
          }))}
        />

        <Input
          icon={<Briefcase size={14} />}
          label="Basic Salary"
          type="number"
          name="basicSalary"
          value={form.basicSalary}
          onChange={handleChange}
        />

        {form.role === "Team_Leader" && !form.isIndividual && (
          <div className="col-span-2">
            <SelectField
              icon={<Users size={14} />}
              label="HR"
              name="selectedHrId"
              value={form.selectedHrId}
              onChange={handleChange}
              placeholder="Select HR"
              options={filteredHrList.map((hr) => ({
                label: hr.fullName,
                value: hr._id,
              }))}
            />
          </div>
        )}

        {form.role === "Employee" && !form.isIndividual && (
          <>
            <SelectField
              icon={<Users size={14} />}
              label="HR"
              name="selectedHrId"
              value={form.selectedHrId}
              onChange={handleChange}
              placeholder="Select HR"
              options={filteredHrList.map((hr) => ({
                label: hr.fullName,
                value: hr._id,
              }))}
            />

            <SelectField
              icon={<Users size={14} />}
              label="Team Leader"
              name="selectedTlId"
              value={form.selectedTlId}
              onChange={handleChange}
              placeholder="Select Team Leader"
              options={filteredTlList.map((tl) => ({
                label: tl.fullName,
                value: tl._id,
              }))}
            />
          </>
        )}

        <div className="col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <label className="flex items-start gap-2 text-xs text-slate-600">
            <input
              type="checkbox"
              name="isIndividual"
              checked={form.isIndividual}
              onChange={handleChange}
              className="mt-1 h-4 w-4"
            />
            Independent Employee
          </label>
        </div>

        {errors.submit && (
          <div className="col-span-2 rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
            {errors.submit}
          </div>
        )}
      </div>
    </form>
  </Modal>
);
}
function Input({ icon, label, ...props }) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-semibold uppercase text-slate-500">
        {label}
      </label>

      <div className="flex h-10 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3">
        <div className="text-slate-400">{icon}</div>

        <input
          {...props}
          className="h-full w-full bg-transparent text-sm outline-none"
        />
      </div>
    </div>
  );
}

function SelectField({
  icon,
  label,
  options,
  placeholder,
  ...props
}) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-semibold uppercase text-slate-500">
        {label}
      </label>

      <div className="flex h-10 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3">
        <div className="text-slate-400">{icon}</div>

        <select
          {...props}
          className="h-full w-full bg-transparent text-sm outline-none"
        >
          <option value="">{placeholder}</option>

          {options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
