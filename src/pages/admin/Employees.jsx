// src/pages/admin/Employees.jsx

import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react";
import RegisterEmployeeModal from "../../components/RegisterEmployeeModal";
import EmployeeDetailsModal from "../../components/EmployeeDetailsModal";
import EditEmployeeModal from "../../components/EditEmployeeModal";
import { getDepartments } from "../../services/departmentApi";
import EmployeeFilters from "../../components/EmployeeFilters";
import {
  getEmployeeByIdApi,
  getEmployeesApi,
  deleteEmployeeApi,
} from "../../services/employeeApi";
import DeleteConfirm from "../../components/commons/DeleteConfirm";

export default function Employees() {
  const [openModal, setOpenModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  
  
  // add these states near search state in Employees.jsx

  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  
  const fetchEmployees = async () => {
  try {
    const res = await getEmployeesApi();

    const employeeList =
      res.data?.data ||
      res.data?.employees ||
      [];

    setEmployees(employeeList);

    localStorage.setItem(
      "employees",
      JSON.stringify(employeeList)
    );
  } catch (error) {
    console.error(error);

    const savedEmployees = JSON.parse(
      localStorage.getItem("employees") || "[]"
    );

    setEmployees(savedEmployees);
  }
};
useEffect(() => {
  fetchEmployees();

  const fetchDepartments = async () => {
  try {
    const res = await getDepartments();

    const departmentList =
      res.data ||
      [];

    setDepartments(departmentList);
  } catch (err) {
    console.error("Unable to fetch departments", err);
  }
};

  fetchDepartments();
}, []);

  const activeEmployees = employees.filter(
    (emp) => emp.isActive === true
  ).length;

  const inactiveEmployees = employees.filter(
    (emp) => emp.isActive !== true
  ).length;

  const filteredEmployees = useMemo(() => {
  return employees.filter((emp) => {
    const matchesSearch =
      search.trim() === ""
        ? true
        : emp.fullName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          emp.email
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          emp.role
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          emp.designation
            ?.toLowerCase()
            .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "active"
        ? emp.isActive === true
        : emp.isActive !== true;

    const matchesRole =
      roleFilter === "all"
        ? true
        : emp.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });
}, [employees, search, statusFilter, roleFilter]);

  const handleOpenDetails = async (employeeId) => {
    try {
      const res = await getEmployeeByIdApi(employeeId);

      if (res.data?.success) {
        setSelectedEmployee(res.data.data);
        setOpenDetails(true);
      }
    } catch (error) {
      alert("Unable to fetch employee details");
    }
  };

  const handleDeleteEmployee = async () => {
  try {
    const res = await deleteEmployeeApi(deleteEmployeeId);

    if (res.data?.success) {
      const updatedEmployees = employees.filter(
        (emp) => emp._id !== deleteEmployeeId
      );

      setEmployees(updatedEmployees);

      localStorage.setItem(
        "employees",
        JSON.stringify(updatedEmployees)
      );

      setDeleteEmployeeId(null);
    }
  } catch (error) {
    alert("Failed to delete employee");
  }
};

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              Staff Management
            </h1>
            <p className="text-xs text-slate-500">
              Manage employee details and status
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            
            className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded-xl bg-brand px-2 py-2 text-xs font-medium text-white shadow-sm"
          >
            <Plus size={15} />
            Add Staff
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <p className="text-[11px] font-medium text-slate-500">
              Total Employees
            </p>
            <p className="mt-1 text-xl font-bold text-slate-800">
              {employees.length}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-3 shadow-sm">
            <div className="flex items-center gap-2">
              <UserCheck size={15} className="text-emerald-600" />
              <p className="text-[11px] font-medium text-emerald-600">
                Active
              </p>
            </div>

            <p className="mt-1 text-xl font-bold text-emerald-700">
              {activeEmployees}
            </p>
          </div>

          <div className="rounded-2xl border border-rose-100 bg-rose-50 p-3 shadow-sm">
            <div className="flex items-center gap-2">
              <UserX size={15} className="text-rose-600" />
              <p className="text-[11px] font-medium text-rose-600">
                Inactive
              </p>
            </div>

            <p className="mt-1 text-xl font-bold text-rose-700">
              {inactiveEmployees}
            </p>
          </div>

          
        </div>

        <EmployeeFilters
  search={search}
  setSearch={setSearch}
  statusFilter={statusFilter}
  setStatusFilter={setStatusFilter}
  roleFilter={roleFilter}
  setRoleFilter={setRoleFilter}
/>
        <div className="space-y-3">
          {filteredEmployees.map((emp) => (
            <div
              key={emp._id}
              onClick={() => handleOpenDetails(emp._id)}
              className="group cursor-pointer rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50/30 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 text-sm font-bold uppercase text-indigo-700">
                    {emp.fullName?.charAt(0)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-sm font-semibold text-slate-800">
                        {emp.fullName}
                      </h3>

                      <span
                        className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                          emp.isActive === true
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-600"
                        }`}
                      >
                        {emp.isActive === true ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      {emp.email}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-medium text-slate-600">
                        {emp.role === "Team_Leader"
                          ? "Team Leader"
                          : emp.role}
                      </span>

                      <span className="rounded-xl border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-[10px] font-medium text-indigo-700">
                        {emp.designation || "No Designation"}
                      </span>

                      <span
                        className={`rounded-xl px-2.5 py-1 text-[10px] font-medium ${
                          emp.isActive === true
                            ? "border border-emerald-100 bg-emerald-50 text-emerald-700"
                            : "border border-rose-100 bg-rose-50 text-rose-600"
                        }`}
                      >
                        {emp.isActive === true
                          ? "Employee Active"
                          : "Employee Inactive"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditEmployee(emp);
                      setEditOpen(true);
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <Pencil size={15} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteEmployeeId(emp._id);
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <RegisterEmployeeModal
          open={openModal}
          setOpen={setOpenModal}
          onSuccess={fetchEmployees}
        />

        <EmployeeDetailsModal
  open={openDetails}
  setOpen={setOpenDetails}
  employee={selectedEmployee}
  departments={departments}
  employees={employees}
/>

        <EditEmployeeModal
          open={editOpen}
          setOpen={setEditOpen}
          employee={editEmployee}
          onSuccess={fetchEmployees}
        />
        <DeleteConfirm
  open={!!deleteEmployeeId}
  onClose={() => setDeleteEmployeeId(null)}
  onConfirm={handleDeleteEmployee}
  title="Delete Employee?"
  message="Are you sure you want to delete this employee? This action cannot be undone."
/>
      </div>
    </div>
  );
}