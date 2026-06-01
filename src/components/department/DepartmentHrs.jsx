import Card from "../commons/Card";
import Avatar from "../commons/Avatar";

export default function DepartmentHrs({
  hrs = [],
  loading,
}) {
  if (loading) {
    return (
      <Card className="p-4">
        <p className="text-sm text-slate-500">
          Loading HR list...
        </p>
      </Card>
    );
  }

  if (!hrs.length) {
    return (
      <Card className="p-6 text-center">
        <p className="text-sm font-medium text-slate-700">
          No HR assigned
        </p>
      </Card>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

      {/* Header */}
      <div className="grid grid-cols-[50px_1fr] border-b border-slate-200 bg-slate-50 px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">

        <span>#</span>

        <span>HR Details</span>

      </div>

      {/* List */}
      <div className="divide-y divide-slate-100">

        {hrs.map((hr, index) => (
          <div
            key={hr._id}
            className="grid grid-cols-[50px_1fr] items-center px-4 py-3 transition hover:bg-slate-50"
          >

            {/* Index */}
            <div className="text-sm font-medium text-slate-500">
              {index + 1}
            </div>

            {/* HR Info */}
            <div className="flex min-w-0 items-center gap-3">

              <Avatar
                letter={(
                  hr.fullName ||
                  hr.name ||
                  "H"
                ).charAt(0)}
                size="md"
              />

              <div className="min-w-0">

                <p className="truncate text-sm font-semibold text-slate-800">
                  {hr.fullName ||
                    hr.name ||
                    "Unnamed HR"}
                </p>

                <p className="truncate text-xs text-slate-500">
                  {hr.email || "No email"}
                </p>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}