// src/components/department/DepartmentLeaders.jsx

import Card from "../commons/Card";
import Avatar from "../commons/Avatar";
import Badge from "../commons/Badge";

export default function DepartmentLeaders({ leaders = [] }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b px-3 py-2">
        <h3 className="text-sm font-semibold text-slate-800">
          Team Leaders ({leaders.length})
        </h3>
      </div>

      <div className="max-h-[260px] overflow-y-auto divide-y">
        {leaders.length > 0 ? (
          leaders.map((leader, index) => (
            <div
              key={leader._id || index}
              className="flex items-center justify-between gap-2 px-3 py-2 transition hover:bg-slate-50"
            >
              <div className="flex min-w-0 items-center gap-2">
                <Avatar
                  letter={
                    (
                      leader.fullName ||
                      leader.name ||
                      "T"
                    ).charAt(0)
                  }
                  size="sm"
                />

                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-slate-800">
                    {leader.fullName || leader.name || "-"}
                  </p>

                  <p className="truncate text-[11px] text-slate-500">
                    {leader.email || leader.phone || "-"}
                  </p>
                </div>
              </div>

             
            </div>
          ))
        ) : (
          <div className="px-3 py-8 text-center text-xs text-slate-400">
            No team leaders found
          </div>
        )}
      </div>
    </Card>
  );
}