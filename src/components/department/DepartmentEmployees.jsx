// src/components/department/DepartmentEmployees.jsx

import Card from "../commons/Card";
import Avatar from "../commons/Avatar";

export default function DepartmentEmployees({
  employees = [],
}) {

  // ✅ Show Only Active Employees
  const activeEmployees = employees.filter(
    (employee) =>
      employee?.isActive !== false
  );

  return (
    <Card className="overflow-hidden p-0">

      {/* Header */}
      <div className="border-b border-slate-200 px-4 py-3">

        <h3 className="text-sm font-semibold text-slate-800">
          Employees ({activeEmployees.length})
        </h3>

      </div>

      {/* Employee List */}
      <div className="hide-scrollbar max-h-[260px] divide-y divide-slate-100 overflow-y-auto">

        {activeEmployees.length > 0 ? (
          activeEmployees.map(
            (employee, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-3 transition hover:bg-slate-50"
              >

                {/* Avatar */}
                <Avatar
                  letter={(
                    employee?.fullName ||
                    employee?.name ||
                    "E"
                  )
                    .charAt(0)
                    .toUpperCase()}
                  size="sm"
                />

                {/* Employee Info */}
                <div className="min-w-0 flex-1">

                  {/* Name */}
                  <p className="truncate text-sm font-medium text-slate-800">
                    {employee?.fullName ||
                      employee?.name ||
                      "Unnamed Employee"}
                  </p>

                  {/* Email / Phone */}
                  <p className="truncate text-xs text-slate-500">
                    {employee?.email ||
                      employee?.phone ||
                      "No contact info"}
                  </p>

                </div>

                

              </div>
            )
          )
        ) : (
          <div className="px-4 py-10 text-center">

            <p className="text-xs text-slate-400">
              No active employees found
            </p>

          </div>
        )}

      </div>

    </Card>
  );
}