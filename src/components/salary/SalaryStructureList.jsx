import { Trash2 } from "lucide-react";
import { useState } from "react";
import Card from "../commons/Card";
import DeleteConfirm from "../commons/DeleteConfirm";
import { deleteSalaryFieldApi } from "../../services/salaryApi";

export default function SalaryStructureList({
  salary,
  setSalary,
}) {
  const [deletingId, setDeletingId] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  const handleDelete = async () => {
    try {
      setDeletingId(deleteData.fieldId);

      const res = await deleteSalaryFieldApi(
        salary._id,
        deleteData.fieldId,
        deleteData.type
      );

      if (res.data?.success) {
        setSalary(res.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
      setDeleteData(null);
    }
  };

  if (!salary) {
    return null;
  }

  return (
    <>
      <DeleteConfirm
        open={!!deleteData}
        onClose={() => setDeleteData(null)}
        onConfirm={handleDelete}
        title="Delete Salary Field?"
        message="Are you sure you want to delete this salary field?"
      />

      <Card className="rounded-2xl p-3">
  <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2">
    <div>
      <h2 className="text-sm font-semibold text-slate-900">
        Salary Structure
      </h2>

      <p className="mt-0.5 text-[11px] text-slate-500">
        Updated{" "}
        {new Date(salary.updatedAt).toLocaleDateString()}
      </p>
    </div>
  </div>

  <div className="grid gap-3 lg:grid-cols-2">
    <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-2.5">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-xs font-semibold text-emerald-700">
          Earnings
        </h3>

        <span className="rounded-md bg-white px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 shadow-sm">
          {salary.earnings?.length || 0}
        </span>
      </div>

      <div className="space-y-1.5">
        {salary.earnings?.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between rounded-lg border border-white bg-white px-2.5 py-2 shadow-sm"
          >
            <div>
              <p className="text-xs font-medium text-slate-800">
                {item.name}
              </p>

              <p className="mt-0.5 text-xs font-semibold text-emerald-700">
                ₹{item.amount}
              </p>
            </div>

            <button
              onClick={() =>
                setDeleteData({
                  fieldId: item._id,
                  type: "earnings",
                })
              }
              disabled={deletingId === item._id}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 disabled:opacity-50"
            >
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>

    <div className="rounded-xl border border-rose-100 bg-rose-50/50 p-2.5">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-xs font-semibold text-rose-700">
          Deductions
        </h3>

        <span className="rounded-md bg-white px-1.5 py-0.5 text-[10px] font-semibold text-rose-700 shadow-sm">
          {salary.deductions?.length || 0}
        </span>
      </div>

      <div className="space-y-1.5">
        {salary.deductions?.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between rounded-lg border border-white bg-white px-2.5 py-2 shadow-sm"
          >
            <div>
              <p className="text-xs font-medium text-slate-800">
                {item.name}
              </p>

              <p className="mt-0.5 text-xs font-semibold text-rose-700">
                ₹{item.amount}
              </p>
            </div>

            <button
              onClick={() =>
                setDeleteData({
                  fieldId: item._id,
                  type: "deductions",
                })
              }
              disabled={deletingId === item._id}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 disabled:opacity-50"
            >
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
</Card>
    </>
  );
}