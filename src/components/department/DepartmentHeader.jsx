import { Building2 } from "lucide-react";
import Button from "../commons/Button";
import Card from "../commons/Card";
export default function DepartmentHeader({
  onCreate,
  view,
  setView,
}) {
  return (
    <div className="space-y-3">

      {/* 🔥 TABS */}
      <div className="flex gap-6 border-b text-sm font-medium">
        <button
          onClick={() => setView("departments")}
          className={`pb-2 ${
            view === "departments"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-400"
          }`}
        >
          Departments
        </button>

        <button
          onClick={() => setView("designations")}
          className={`pb-2 ${
            view === "designations"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-400"
          }`}
        >
          Designations
        </button>
      </div>

      {/* ❌ HIDE THIS IN DESIGNATION VIEW */}
      {view === "departments" && (
        <Card className="p-3">

  <div className="flex items-start justify-between gap-3">

    {/* Left */}
    <div className="flex min-w-0 flex-1 items-start gap-3">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
        <Building2 size={18} />
      </div>

      <div className="min-w-0">

        <h1 className="truncate text-sm font-semibold text-slate-800 sm:text-base">
          Department Management
        </h1>

        <p className="mt-0.5 text-[11px] leading-4 text-slate-500">
          Manage departments and designations
        </p>

      </div>

    </div>

    {/* Right */}
    <div className="shrink-0">

      <Button
        onClick={onCreate}
        text="Add Department "
        width="auto"
        size="sm"
        className="whitespace-nowrap px-3"
      />

    </div>

  </div>

</Card>
      )}

    </div>
  );
}