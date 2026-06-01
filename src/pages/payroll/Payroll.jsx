import { useState } from "react";
import {
  IndianRupee,
  Users,
  TrendingUp,
  Calendar,
  Download,
  MoreVertical,
  Plus,
  Wallet,
  Activity,
} from "lucide-react";

import Card from "../../components/commons/Card";
import Button from "../../components/commons/Button";
import Avatar from "../../components/commons/Avatar";

export default function AdminPayroll() {
  const [employees] = useState([
    {
      id: 1,
      name: "Sonam Maurya",
      code: "EMP-001",
      dept: "HR",
      net: "₹72,250",
      status: "Paid",
    },
    {
      id: 2,
      name: "John Doe",
      code: "EMP-002",
      dept: "Engineering",
      net: "₹63,750",
      status: "Pending",
    },
  ]);

  return (
    <div className="space-y-5 px-3 sm:px-5 max-w-[1400px] mx-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            Payroll Dashboard
          </h1>
          <p className="text-xs text-slate-500">
            Manage salary, payments & reports
          </p>
        </div>

        <div className="flex gap-2">
          <Button text="Export" size="sm" variant="outline" />
          <Button
            text="Run Payroll"
            size="sm"
            variant="brand"
            icon={<Plus size={14} />}
          />
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            icon: Wallet,
            value: "₹28.5L",
            label: "Total Payroll",
            color: "from-violet-500 to-purple-500",
          },
          {
            icon: Users,
            value: "48",
            label: "Employees",
            color: "from-blue-500 to-cyan-500",
          },
          {
            icon: TrendingUp,
            value: "+12%",
            label: "Growth",
            color: "from-emerald-500 to-green-500",
          },
          {
            icon: Activity,
            value: "Active",
            label: "System Status",
            color: "from-orange-500 to-pink-500",
          },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <Card
              key={i}
              className={`p-4 text-white bg-gradient-to-br ${item.color} shadow-lg`}
            >
              <div className="flex justify-between items-center">
                <Icon size={18} />
                <span className="text-[10px] opacity-80">Updated</span>
              </div>

              <h2 className="mt-3 text-lg font-bold">{item.value}</h2>
              <p className="text-[11px] opacity-80">{item.label}</p>
            </Card>
          );
        })}
      </div>

      {/* MAIN */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* TABLE */}
        <Card className="lg:col-span-2 overflow-hidden">
          {/* FILTER */}
          <div className="p-4 flex items-center gap-3 w-4">
            <input
              placeholder="Search employee..."
              className="flex-1 h-10 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-sm">
              <thead className="bg-slate-50 text-xs text-slate-400 uppercase">
                <tr>
                  <th className="px-5 py-3 text-left">Employee</th>
                  <th className="px-5 py-3 text-center">Dept</th>
                  <th className="px-5 py-3 text-center">Net Pay</th>
                  <th className="px-5 py-3 text-center">Status</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>

              <tbody>
                {employees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="border-b hover:bg-slate-50 transition-all"
                  >
                    {/* EMPLOYEE */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar size="sm" letter={emp.name[0]} />
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {emp.name}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {emp.code}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* DEPT */}
                    <td className="px-5 py-4 text-center">
                      <span className="px-3 py-[4px] rounded-md text-[11px] bg-slate-100 text-slate-600 font-medium">
                        {emp.dept}
                      </span>
                    </td>

                    {/* NET */}
                    <td className="px-5 py-4 text-center">
                      <p className="font-semibold text-slate-800">{emp.net}</p>
                      <p className="text-[10px] text-slate-400">Net Salary</p>
                    </td>

                    {/* STATUS */}
                    <td className="px-5 py-4 text-center">
                      <span
                        className={`px-3 py-[4px] rounded-full text-[11px] font-medium ${
                          emp.status === "Paid"
                            ? "bg-green-100 text-green-600"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {emp.status}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="h-8 w-8 flex items-center justify-center rounded-md border border-slate-200 hover:bg-slate-100 transition">
                          <Download size={14} />
                        </button>

                        <button className="h-8 w-8 flex items-center justify-center rounded-md border border-slate-200 hover:bg-slate-100 transition">
                          <MoreVertical size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* SIDEBAR */}
        <div className="space-y-5">
          {/* QUICK ACTIONS */}
          <Card className="p-5 space-y-3">
            <h3 className="text-sm font-semibold text-slate-800">
              Quick Actions
            </h3>

            <Button
              text="Generate Payslips"
              width="full"
              size="lg"
              variant="brand"
            />
            <Button
              text="Salary Reports"
              width="full"
              size="lg"
              variant="outline"
            />
            <Button
              text="Payroll History"
              width="full"
              size="lg"
              variant="outline"
            />
          </Card>

          <Card className="p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">
              Monthly Payroll Flow
            </h3>

            <div className="flex items-end justify-between h-40 gap-4">
              {[
                { value: 40, label: "Jan" },
                { value: 65, label: "Feb" },
                { value: 55, label: "Mar" },
                { value: 85, label: "Apr" },
                { value: 70, label: "May" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center flex-1 h-full"
                >
                  {/* FULL HEIGHT WRAPPER */}
                  <div className="flex items-end w-full h-full">
                    {/* BAR */}
                    <div
                      className="w-full rounded-xl bg-gradient-to-t from-violet-600 to-purple-400 shadow-md transition-all duration-300 hover:scale-105"
                      style={{
                        height: `${item.value}%`,
                      }}
                    />
                  </div>

                  {/* LABEL */}
                  <span className="text-[11px] text-slate-400 mt-2">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
