import Card from "../commons/Card";
import { Check, X } from "lucide-react";

export default function LeaveApprovalsCard() {
  return (
    <Card className="p-4 rounded-2xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Leave Approvals
          </h3>
          <p className="text-xs text-slate-500">
            8 pending requests, 3 urgent
          </p>
        </div>

        <button className="text-sm text-green-600 font-medium">
          View All →
        </button>
      </div>

      <div className="space-y-3">

        {/* 1️⃣ Pending */}
        <div className="border rounded-xl p-3 bg-slate-50">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                M
              </div>
              <div>
                <p className="text-sm font-medium">Maria Garcia</p>
                <p className="text-xs text-slate-500">
                  HR Manager • 3 days
                </p>
              </div>
            </div>

            <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
              Pending
            </span>
          </div>

          <div className="flex justify-between text-xs text-slate-500 mt-2">
            <span>May 5 - May 7</span>
            <span>Submitted 1d ago</span>
          </div>

          <div className="flex gap-2 mt-3">
            <button className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-1">
              <Check size={14} /> Approve
            </button>
            <button className="flex-1 bg-red-100 text-red-600 py-2 rounded-lg text-sm flex items-center justify-center gap-1">
              <X size={14} /> Reject
            </button>
          </div>
        </div>

        {/* 2️⃣ Approved */}
        <div className="border rounded-xl p-3 bg-slate-50">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                D
              </div>
              <div>
                <p className="text-sm font-medium">David Chen</p>
                <p className="text-xs text-slate-500">
                  Product Manager • 1 day
                </p>
              </div>
            </div>

            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
              Approved
            </span>
          </div>

          <div className="flex justify-between text-xs text-slate-500 mt-2">
            <span>May 10 - May 10</span>
            <span>Approved 3h ago</span>
          </div>

          <p className="text-xs text-green-600 mt-2">
            ✔ Approved by Sarah Lee
          </p>
        </div>

        {/* 3️⃣ Rejected / Another Pending */}
        <div className="border rounded-xl p-3 bg-slate-50">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                A
              </div>
              <div>
                <p className="text-sm font-medium">Amit Sharma</p>
                <p className="text-xs text-slate-500">
                  Backend Dev • 2 days
                </p>
              </div>
            </div>

            <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full">
              Rejected
            </span>
          </div>

          <div className="flex justify-between text-xs text-slate-500 mt-2">
            <span>May 12 - May 13</span>
            <span>Rejected 5h ago</span>
          </div>

          <p className="text-xs text-red-600 mt-2">
            ✖ Rejected by Admin
          </p>
        </div>

      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <p className="text-slate-600">
          This month: <span className="font-semibold">24 approved</span>, 3 rejected
        </p>

        <button className="text-green-600 font-medium">
          Quick Approve ⚡
        </button>
      </div>

    </Card>
  );
}