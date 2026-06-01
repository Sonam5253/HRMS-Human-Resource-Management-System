import { Search, Filter } from "lucide-react";

export default function ShiftFilters({
  search,
  setSearch,
  filter,
  setFilter,
}) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-slate-200 p-3">
      <div className="relative flex-1 md:max-w-xs">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search shift"
          className="h-10 w-full rounded-xl border border-slate-200 pl-9 pr-3 text-xs outline-none focus:border-violet-500"
        />
      </div>

      <div className="relative md:hidden">
        <Filter
          size={16}
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-violet-600"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-10 w-10 appearance-none rounded-xl border border-slate-200 bg-white text-transparent outline-none"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="hidden md:block">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-10 rounded-xl border border-slate-200 px-3 text-xs outline-none"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
}