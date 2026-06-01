import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export default function EmployeeFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  roleFilter,
  setRoleFilter,
}) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 md:w-full md:max-w-xs">
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs outline-none transition focus:border-indigo-500 focus:bg-white"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-indigo-600 md:hidden"
          >
            <SlidersHorizontal size={16} />
          </button>
        </div>

        <div
          className={`${
            showFilters ? "flex" : "hidden"
          } flex-col gap-2 md:flex md:flex-row`}
        >
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-600 md:min-w-[140px]"
          >
            <option value="all">All Employees</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-600 md:min-w-[140px]"
          >
            <option value="all">All Roles</option>
            <option value="Employee">Employee</option>
            <option value="HR">HR</option>
            <option value="Team_Leader">Team Leader</option>
          </select>
        </div>
      </div>
    </div>
  );
}