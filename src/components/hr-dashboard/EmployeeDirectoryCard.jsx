import Card from "../commons/Card";
import { Search } from "lucide-react";

export default function EmployeeDirectoryCard() {
  return (
    <Card className="p-4 rounded-2xl">

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Employee Directory
          </h3>
          <p className="text-xs text-slate-500">
            142 employees, 8 departments
          </p>
        </div>

        <button className="text-green-600 text-sm font-medium">
          Add +
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 border rounded-xl px-3 py-2 mb-3 bg-slate-50">
        <Search size={16} className="text-slate-400" />
        <input
          type="text"
          placeholder="Search employees..."
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto mb-3 hide-scrollbar ">
        {["All", "Engineering", "HR", "Sales", "Marketing"].map((tab, i) => (
          <button
            key={i}
            className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
              i === 0
                ? "bg-green-600 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">

        {/* Employee 1 */}
        <div className="flex justify-between items-center border rounded-xl p-3 bg-slate-50">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              A
            </div>
            <div>
              <p className="text-sm font-medium">Alex Johnson</p>
              <p className="text-xs text-slate-500">
                Senior Frontend Developer
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs font-medium text-slate-700">
              Engineering
            </p>
            <p className="text-xs text-slate-400">Joined 2023</p>
          </div>
        </div>

        {/* Employee 2 */}
        <div className="flex justify-between items-center border rounded-xl p-3 bg-slate-50">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              M
            </div>
            <div>
              <p className="text-sm font-medium">Maria Garcia</p>
              <p className="text-xs text-slate-500">
                HR Manager
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs font-medium text-slate-700">
              Human Resources
            </p>
            <p className="text-xs text-slate-400">Joined 2022</p>
          </div>
        </div>

        {/* Employee 3 */}
        <div className="flex justify-between items-center border rounded-xl p-3 bg-slate-50">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
              D
            </div>
            <div>
              <p className="text-sm font-medium">David Chen</p>
              <p className="text-xs text-slate-500">
                Product Manager
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs font-medium text-slate-700">
              Product
            </p>
            <p className="text-xs text-slate-400">Joined 2024</p>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <p className="text-slate-600">
          Showing <span className="font-semibold">3</span> of 142 employees
        </p>

        <button className="text-green-600 font-medium">
          View All →
        </button>
      </div>

    </Card>
  );
}