import {
  X,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Shield,
  CalendarDays,
  Hash,
  UserCircle2,
} from "lucide-react";

export default function EmployeeDetailsModal({
  open,
  setOpen,
  employee,
  departments = [],
  employees = [],
}) {
  if (!open || !employee) return null;

  const departmentName =
    departments.find(
      (dept) =>
        String(dept._id) ===
        String(
          employee.departmentId?._id ||
            employee.departmentId ||
            employee.department?._id ||
            employee.department
        )
    )?.name ||
    employee.department?.name ||
    "No Department";

  const reportingNames =
    employee.reportingTo?.length
      ? employee.reportingTo
          .map((reportingItem) => {
            const reportId =
              typeof reportingItem === "object"
                ? reportingItem._id
                : reportingItem;

            const foundEmployee = employees.find(
              (emp) => String(emp._id) === String(reportId)
            );

            return (
              foundEmployee?.fullName ||
              reportingItem?.fullName ||
              reportingItem?.name ||
              ""
            );
          })
          .filter(Boolean)
          .join(", ")
      : "No Reporting Manager";

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 overflow-y-auto">
      <div className="w-full max-w-lg max-h-[80vh] overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col">
        <div className="relative flex-shrink-0 bg-gradient-to-r from-brand via-brand to-brand p-2 md:p-4 text-white">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition"
          >
            <X size={18} />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/20 text-3xl font-bold uppercase">
              {employee.fullName?.charAt(0)}
            </div>

            <div className="min-w-0">
              <h2 className="text-2xl md:text-3xl font-bold break-words">
                {employee.fullName}
              </h2>

              <p className="mt-1 text-sm md:text-base text-white/90 break-all">
                {employee.email}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs md:text-sm font-medium">
                  {employee.role}
                </span>

                <span className="rounded-full bg-white/20 px-2 py-1 text-xs md:text-sm font-medium">
                  {departmentName}
                </span>

                <span
                  className={`rounded-full px-2 py-1 text-xs md:text-sm font-medium ${
                    employee.isVerified
                      ? "bg-green-500/20 text-green-100"
                      : "bg-yellow-500/20 text-yellow-100"
                  }`}
                >
                  {employee.isVerified ? "Verified" : "Not Verified"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto  md:p-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <div className="mb-1 flex items-center gap-2 text-gray-500">
                <Hash size={16} />
                <span className="text-sm font-medium">Employee</span>
              </div>

              <p className="break-all text-sm font-semibold text-gray-800">
                {employee.fullName}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <div className="mb-1 flex items-center gap-1 text-gray-500">
                <Building2 size={16} />
                <span className="text-sm font-medium">Department</span>
              </div>

              <p className="break-all text-sm font-semibold text-gray-800">
                {departmentName}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-gray-500">
                <Mail size={16} />
                <span className="text-sm font-medium">Email</span>
              </div>

              <p className="break-all text-sm font-semibold text-gray-800">
                {employee.email}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-gray-500">
                <Phone size={16} />
                <span className="text-sm font-medium">Phone</span>
              </div>

              <p className="text-sm font-semibold text-gray-800">
                {employee.phone}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-gray-500">
                <Shield size={16} />
                <span className="text-sm font-medium">Role</span>
              </div>

              <p className="text-sm font-semibold text-gray-800">
                {employee.role}
              </p>
              
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-gray-500">
                <Briefcase size={16} />
                <span className="text-sm font-medium">Designation</span>
              </div>

              <p className="text-sm font-semibold text-gray-800 break-words">
                {employee.designation || "Not Assigned"}
              </p>
            </div>

            <div className="md:col-span-2 rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-gray-500">
                <UserCircle2 size={16} />
                <span className="text-sm font-medium">Reporting To</span>
              </div>

              <p className="break-all text-sm font-semibold text-gray-800">
                {reportingNames}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-gray-500">
                <CalendarDays size={16} />
                <span className="text-sm font-medium">Created At</span>
              </div>

              <p className="text-sm font-semibold text-gray-800">
                {employee.createdAt
                  ? new Date(employee.createdAt).toLocaleString()
                  : "-"}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-gray-500">
                <CalendarDays size={16} />
                <span className="text-sm font-medium">Updated At</span>
              </div>

              <p className="text-sm font-semibold text-gray-800">
                {employee.updatedAt
                  ? new Date(employee.updatedAt).toLocaleString()
                  : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}