import Button from "../commons/Button";
import Card from "../commons/Card";

export default function DepartmentOverview({
  department,
  onEdit,
}) {

  const formattedCreatedDate =
    department.createdAt
      ? new Date(
          department.createdAt
        ).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "-";

  const formattedUpdatedDate =
    department.updatedAt
      ? new Date(
          department.updatedAt
        ).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : formattedCreatedDate;

  return (
    <Card className="p-3">
      
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-3">

        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            Department Details
          </h3>

          <p className="mt-1 text-[11px] text-slate-500">
            Basic information about this department
          </p>
        </div>

        <Button
          text="Edit"
          size="sm"
          width="auto"
          variant="outline"
          onClick={onEdit}
        />
      </div>

      {/* Content */}
      <div className="space-y-2 text-xs">

        {/* Name */}
        <div className="grid grid-cols-2 gap-2 border-b border-slate-100 pb-2">
          <span className="text-slate-400">
            Department Name
          </span>

          <span className="font-medium text-slate-800">
            {department.name || "-"}
          </span>
        </div>

        {/* Head */}
        <div className="grid grid-cols-2 gap-2 border-b border-slate-100 pb-2">
          <span className="text-slate-400">
            Department Head
          </span>

          <span className="font-medium text-slate-800">
            {department.head || "No HR Assigned"}
          </span>
        </div>

        {/* HRs */}
        <div className="grid grid-cols-2 gap-2 border-b border-slate-100 pb-2">
          <span className="text-slate-400">
            Assigned HRs
          </span>

          <span className="font-medium text-slate-800">
            {department.hrs || 0}
          </span>
        </div>

        {/* Leaders */}
        <div className="grid grid-cols-2 gap-2 border-b border-slate-100 pb-2">
          <span className="text-slate-400">
            Team Leaders
          </span>

          <span className="font-medium text-slate-800">
            {department.leaders || 0}
          </span>
        </div>

        {/* Employees */}
        <div className="grid grid-cols-2 gap-2 border-b border-slate-100 pb-2">
          <span className="text-slate-400">
            Employees
          </span>

          <span className="font-medium text-slate-800">
            {department.employees || 0}
          </span>
        </div>

        {/* Created */}
        <div className="grid grid-cols-2 gap-2 border-b border-slate-100 pb-2">
          <span className="text-slate-400">
            Created At
          </span>

          <span className="font-medium text-slate-800">
            {formattedCreatedDate}
          </span>
        </div>

        {/* Updated */}
        <div className="grid grid-cols-2 gap-2">
          <span className="text-slate-400">
            Updated At
          </span>

          <span className="font-medium text-slate-800">
            {formattedUpdatedDate}
          </span>
        </div>

      </div>
    </Card>
  );
}