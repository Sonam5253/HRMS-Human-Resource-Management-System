import { useEffect, useState } from "react";
import Card from "../commons/Card";
import SalaryStructureList from "./SalaryStructureList";
import {
  createSalaryStructureApi,
  getSalaryStructureApi,
} from "../../services/salaryApi";

export default function SalaryStructureSection() {
  const [salary, setSalary] = useState(null);

  const [earningName, setEarningName] = useState("");
  const [earningAmount, setEarningAmount] = useState("");
  const [earningLoading, setEarningLoading] = useState(false);

  const [deductionName, setDeductionName] = useState("");
  const [deductionAmount, setDeductionAmount] = useState("");
  const [deductionLoading, setDeductionLoading] = useState(false);

  const fetchSalary = async () => {
    try {
      const res = await getSalaryStructureApi();
      setSalary(res.data?.data || null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSalary();
  }, []);

  const handleAddField = async (type) => {
    try {
      if (type === "earnings") {
        setEarningLoading(true);
      } else {
        setDeductionLoading(true);
      }

      const payload = {
        earnings: salary?.earnings || [],
        deductions: salary?.deductions || [],
        type,
        fieldId: null,
        name: type === "earnings" ? earningName : deductionName,
        amount: Number(
          type === "earnings" ? earningAmount : deductionAmount
        ),
      };

      const res = await createSalaryStructureApi(payload);

      if (res.data?.success) {
        setSalary(res.data.data);

        if (type === "earnings") {
          setEarningName("");
          setEarningAmount("");
        } else {
          setDeductionName("");
          setDeductionAmount("");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (type === "earnings") {
        setEarningLoading(false);
      } else {
        setDeductionLoading(false);
      }
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="rounded-2xl border-emerald-100 p-3">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Earnings
              </h2>

              <p className="mt-0.5 text-[11px] text-slate-500">
                Basic Salary, HRA, Bonus
              </p>
            </div>

            <div className="rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">
              {salary?.earnings?.length || 0}
            </div>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              placeholder="Field Name"
              value={earningName}
              onChange={(e) => setEarningName(e.target.value)}
              className="h-9 w-full rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-emerald-500"
            />

            <input
              type="number"
              placeholder="Amount"
              value={earningAmount}
              onChange={(e) => setEarningAmount(e.target.value)}
              className="h-9 w-full rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-emerald-500"
            />

            <button
              onClick={() => handleAddField("earnings")}
              disabled={
                !earningName || !earningAmount || earningLoading
              }
              className="h-8  rounded-lg bg-emerald-600 px-3 text-xs font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {earningLoading ? "Adding..." : "Add Earning"}
            </button>
          </div>
        </Card>

        <Card className="rounded-2xl border-rose-100 p-3">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Deductions
              </h2>

              <p className="mt-0.5 text-[11px] text-slate-500">
                PF, Tax, ESI
              </p>
            </div>

            <div className="rounded-lg bg-rose-50 px-2 py-1 text-[10px] font-semibold text-rose-700">
              {salary?.deductions?.length || 0}
            </div>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              placeholder="Field Name"
              value={deductionName}
              onChange={(e) => setDeductionName(e.target.value)}
              className="h-9 w-full rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-rose-500"
            />

            <input
              type="number"
              placeholder="Amount"
              value={deductionAmount}
              onChange={(e) => setDeductionAmount(e.target.value)}
              className="h-9 w-full rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-rose-500"
            />

            <button
              onClick={() => handleAddField("deductions")}
              disabled={
                !deductionName ||
                !deductionAmount ||
                deductionLoading
              }
              className="h-8  rounded-lg bg-rose-600 px-3 text-xs font-medium text-white hover:bg-rose-700 disabled:opacity-50"
            >
              {deductionLoading ? "Adding..." : "Add Deduction"}
            </button>
          </div>
        </Card>
      </div>

      <SalaryStructureList salary={salary} setSalary={setSalary} />
    </div>
  );
}