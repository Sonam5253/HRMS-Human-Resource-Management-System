import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export default function ProjectFilters({
  search,
  setSearch,
  status,
  setStatus,
  type,
  setType,
  budget,
  setBudget,
}) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="border-b border-slate-200 p-3">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 md:w-full md:max-w-xs">
          <div className="relative flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search project name"
              className="h-10 w-full rounded-xl border border-slate-200 pl-9 pr-3 text-xs outline-none focus:border-violet-500"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-violet-600 md:hidden"
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
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-10 rounded-xl border border-slate-200 px-3 text-xs md:min-w-[130px]"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="h-10 rounded-xl border border-slate-200 px-3 text-xs md:min-w-[130px]"
          >
            <option value="all">All Type</option>
            <option value="internal">Internal</option>
            <option value="external">External</option>
          </select>

          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="h-10 rounded-xl border border-slate-200 px-3 text-xs md:min-w-[150px]"
          >
            <option value="all">All Budget</option>
            <option value="low">Below ₹50,000</option>
            <option value="medium">₹50,000 - ₹1,00,000</option>
            <option value="high">Above ₹1,00,000</option>
          </select>
        </div>
      </div>
    </div>
  );
}