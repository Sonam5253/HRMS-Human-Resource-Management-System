import { useMemo, useState } from "react";
import {
  Search,
  Building2,
  Pencil,
  Trash2,
} from "lucide-react";

import Card from "../commons/Card";
import DepartmentRow from "./DepartmentRow";

export default function DepartmentTable({
  departments,
  selectedDepartment,
  onSelect,
  onEdit,
  onDelete,
}) {
  const [search, setSearch] = useState("");

  const filteredDepartments = useMemo(() => {
    if (!search.trim()) return departments;

    const value = search.toLowerCase().trim();

    return departments.filter((department) => {
      return (
        department.name
          ?.toLowerCase()
          .includes(value)
      );
    });
  }, [departments, search]);

  return (
    <Card className="overflow-hidden border border-slate-200 p-0">

      {/* Header */}
      <div className="border-b border-slate-100 p-3">

        <div className="flex items-center justify-between gap-2">

          {/* Left */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Building2 size={18} />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-800">
                Departments
              </h2>

              <p className="text-[11px] text-slate-500">
                Manage department structure
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-[140px] sm:w-[180px]">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-700 outline-none transition focus:border-indigo-400"
            />
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full text-xs">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 text-left font-medium">
                Department
              </th>

              <th className="px-4 py-3 text-left font-medium">
                HRs
              </th>

              <th className="px-4 py-3 text-left font-medium">
                Employees
              </th>

              <th className="px-4 py-3 text-left font-medium">
                Leaders
              </th>

              <th className="px-4 py-3 text-left font-medium">
                Created
              </th>

              <th className="px-4 py-3 text-left font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredDepartments.length > 0 ? (
              filteredDepartments.map((department) => (
                <DepartmentRow
                  key={department._id}
                  department={department}
                  isActive={
                    selectedDepartment?._id ===
                    department._id
                  }
                  onClick={() => onSelect(department)}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-xs text-slate-400"
                >
                  No department found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 p-3 md:hidden">
        {filteredDepartments.length > 0 ? (
          filteredDepartments.map((department) => (
            <div
              key={department._id}
              onClick={() => onSelect(department)}
              className={`rounded-2xl border p-3 transition ${
                selectedDepartment?._id === department._id
                  ? "border-indigo-200 bg-indigo-50"
                  : "border-slate-200 bg-white"
              }`}
            >

              {/* Top */}
              <div className="flex items-start justify-between gap-3">

                <div>
                  <h3 className="text-sm font-semibold text-slate-800">
                    {department.name}
                  </h3>

                  <p className="mt-1 text-[11px] text-slate-500">
                    {department.createdAt
                      ? new Date(
                          department.createdAt
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "-"}
                  </p>
                </div>

                <div className="flex items-center gap-2">

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(department);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500"
                  >
                    <Pencil size={14} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(department);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 text-red-500"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-3 gap-2">

                <div className="rounded-xl bg-slate-50 p-2 text-center">
                  <p className="text-[10px] text-slate-500">
                    HRs
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {department.hrs || 0}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-2 text-center">
                  <p className="text-[10px] text-slate-500">
                    Employees
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {department.employees || 0}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-2 text-center">
                  <p className="text-[10px] text-slate-500">
                    Leaders
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {department.leaders || 0}
                  </p>
                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="py-10 text-center text-xs text-slate-400">
            No department found
          </div>
        )}
      </div>
    </Card>
  );
}