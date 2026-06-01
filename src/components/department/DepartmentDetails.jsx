import { useEffect, useState } from "react";

import Card from "../../components/commons/Card";
import Avatar from "../../components/commons/Avatar";

import DepartmentOverview from "../../components/department/DepartmentOverview";
import DepartmentEmployees from "../../components/department/DepartmentEmployees";
import DepartmentLeaders from "../../components/department/DepartmentLeaders";
import DepartmentHrs from "../../components/department/DepartmentHrs";

import { getDepartmentHierarchy } from "../../services/departmentApi";

export default function DepartmentDetails({
  department,
  onEdit,
}) {
  const [activeTab, setActiveTab] =
    useState("overview");

  const [hrs, setHrs] = useState([]);
  const [teamLeaders, setTeamLeaders] =
    useState([]);
  const [employees, setEmployees] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [selectedHr, setSelectedHr] =
    useState(null);

  useEffect(() => {
    const fetchDepartmentHierarchyData =
      async () => {
        if (!department?.id) return;

        try {
          setLoading(true);

          const hrResponse =
            await getDepartmentHierarchy(
              department.id
            );

          const hrList =
            hrResponse?.HR || [];

          setHrs(hrList);

          let allLeaders = [];
          let allEmployees = [
            ...(hrResponse?.Direct_Employees ||
              []),
          ];

          for (const hr of hrList) {
            const leaderResponse =
              await getDepartmentHierarchy(
                department.id,
                [hr._id]
              );

            const leaders =
              leaderResponse?.Team_Leaders ||
              [];

            allLeaders.push(...leaders);

            for (const leader of leaders) {
              const employeeResponse =
                await getDepartmentHierarchy(
                  department.id,
                  [hr._id],
                  [leader._id]
                );

              const employeeList =
                employeeResponse?.employees ||
                [];

              allEmployees.push(
                ...employeeList
              );
            }
          }

          const uniqueLeaders =
            allLeaders.filter(
              (
                leader,
                index,
                self
              ) =>
                index ===
                self.findIndex(
                  (item) =>
                    item._id ===
                    leader._id
                )
            );

          const uniqueEmployees =
            allEmployees.filter(
              (
                employee,
                index,
                self
              ) =>
                index ===
                self.findIndex(
                  (item) =>
                    item._id ===
                    employee._id
                )
            );

          setTeamLeaders(
            uniqueLeaders
          );

          setEmployees(
            uniqueEmployees
          );
        } catch (error) {
          console.error(
            "Failed to fetch department hierarchy",
            error
          );

          setHrs([]);
          setTeamLeaders([]);
          setEmployees([]);
        } finally {
          setLoading(false);
        }
      };

    fetchDepartmentHierarchyData();
  }, [department?.id]);

  if (!department) return null;

  return (
    <>
      <Card className="overflow-hidden p-3">

        {/* Tabs */}
        <div className="mb-4 overflow-x-auto border-b border-slate-200 hide-scrollbar">

          <div className="flex min-w-max items-center gap-5 text-xs">

            {[
              {
                key: "overview",
                label: "Overview",
              },
              {
                key: "hrs",
                label: `HRs (${hrs.length})`,
              },
              {
                key: "leaders",
                label: `Team Leaders (${teamLeaders.length})`,
              },
              {
                key: "employees",
                label: `Employees (${employees.length})`,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() =>
                  setActiveTab(tab.key)
                }
                className={`border-b-2 pb-2 transition ${
                  activeTab === tab.key
                    ? "border-indigo-600 font-semibold text-indigo-600"
                    : "border-transparent text-slate-500"
                }`}
              >
                {tab.label}
              </button>
            ))}

          </div>

        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <DepartmentOverview
            department={{
              ...department,

              head:
                hrs.length > 0
                  ? hrs
                      .map(
                        (hr) =>
                          hr.fullName ||
                          hr.name
                      )
                      .join(", ")
                  : "No HR Assigned",

              hrs: hrs.length,
              leaders:
                teamLeaders.length,
              employees:
                employees.length,
            }}
            onEdit={onEdit}
          />
        )}

        {/* HRs */}
        {activeTab === "hrs" && (
          <DepartmentHrs
            hrs={hrs}
            loading={loading}
            onSelect={(hr) =>
              setSelectedHr(hr)
            }
          />
        )}

        {/* Leaders */}
        {activeTab === "leaders" && (
          <DepartmentLeaders
            leaders={teamLeaders}
          />
        )}

        {/* Employees */}
{activeTab === "employees" && (
  <DepartmentEmployees
    employees={employees.map(
      (employee, index) => ({
        ...employee,

        fullName:
          employee?.fullName &&
          employee.fullName !== employee._id &&
          !employee.fullName.includes(
            employee._id
          )
            ? employee.fullName

            : employee?.name &&
              employee.name !== employee._id &&
              !employee.name.includes(
                employee._id
              )
            ? employee.name

            : `Employee ${index + 1}`,
      })
    )}
  />
)}

      </Card>

      {/* HR Detail Modal */}
      {selectedHr && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() =>
            setSelectedHr(null)
          }
        >

          <Card
            onClick={(e) =>
              e.stopPropagation()
            }
            className="max-h-[90vh] w-full max-w-5xl overflow-hidden p-0"
          >

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">

              <div>
                <h3 className="text-base font-semibold text-slate-800">
                  HR Details
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  View assigned team leaders
                  and employees
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedHr(null)
                }
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-100"
              >
                <X size={16} />
              </button>

            </div>

            {/* Body */}
            <div className="space-y-5 overflow-y-auto p-5">

              <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">

                <Avatar
                  letter={(
                    selectedHr.fullName ||
                    selectedHr.name ||
                    "H"
                  )
                    .charAt(0)
                    .toUpperCase()}
                  size="lg"
                />

                <div className="min-w-0 flex-1">

                  <h4 className="truncate text-lg font-semibold text-slate-800">
                    {selectedHr.fullName ||
                      selectedHr.name}
                  </h4>

                  <p className="mt-1 text-sm text-slate-500">
                    {selectedHr.email ||
                      "No email"}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {selectedHr.designation ||
                      "HR"}
                  </p>

                </div>

                {selectedHr.email && (
                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        `mailto:${selectedHr.email}`,
                        "_self"
                      )
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <Mail size={16} />
                  </button>
                )}

              </div>

            </div>

          </Card>

        </div>
      )}
    </>
  );
}