import { useState } from "react";
import Employees from "./Employees";
import SalaryStructureSection from "../../components/salary/SalaryStructureSection";

export default function StaffManagement() {
  const [activeTab, setActiveTab] = useState("staff");

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="space-y-4">
        

        <div className="overflow-x-auto border-b border-slate-200">
          <div className="flex min-w-max items-center gap-5">
            <button
              onClick={() => setActiveTab("staff")}
              className={`border-b-2 pb-3 text-sm font-medium transition ${
                activeTab === "staff"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500"
              }`}
            >
              Staff
            </button>

            <button
              onClick={() => setActiveTab("salary")}
              className={`border-b-2 pb-3 text-sm font-medium transition ${
                activeTab === "salary"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500"
              }`}
            >
              Salary Structure
            </button>
          </div>
        </div>

        {activeTab === "staff" && <Employees />}

        {activeTab === "salary" && <SalaryStructureSection />}
      </div>
    </div>
  );
}