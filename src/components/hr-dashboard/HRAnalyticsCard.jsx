import Card from "../commons/Card";
import { FileText, Users, DollarSign, Activity } from "lucide-react";

export default function HRAnalyticsCard() {
  return (
    <Card className="p-4 sm:p-5 rounded-2xl">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            HR Analytics
          </h3>
          <p className="text-sm text-slate-500">
            Key metrics & reports
          </p>
        </div>

        <button className="text-green-600 text-sm font-medium flex items-center gap-1">
          Generate Report <FileText size={16} />
        </button>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">

        {/* Attendance */}
        <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Attendance Rate
            </p>
            <span className="text-sm font-semibold text-green-600">
              94%
            </span>
          </div>

          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-2 bg-green-500" style={{ width: "94%" }} />
          </div>

          <p className="text-xs text-green-600 mt-1">
            +2% from last month
          </p>
        </div>

        {/* Turnover */}
        <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Turnover Rate
            </p>
            <span className="text-sm font-semibold text-orange-500">
              8%
            </span>
          </div>

          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-2 bg-orange-500" style={{ width: "8%" }} />
          </div>

          <p className="text-xs text-slate-500 mt-1">
            -1% from last month
          </p>
        </div>

      </div>

      {/* DEPARTMENT */}
      <div className="mb-4">
        <p className="text-sm font-medium text-slate-700 mb-2">
          Department Headcount
        </p>

        <div className="space-y-2 text-sm">

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Engineering
            </div>
            <span>42</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Sales
            </div>
            <span>28</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              Marketing
            </div>
            <span>24</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              HR
            </div>
            <span>18</span>
          </div>

        </div>
      </div>

      {/* QUICK REPORTS */}
      <div>
        <p className="text-sm font-medium text-slate-700 mb-2">
          Quick Reports
        </p>

        <div className="grid grid-cols-2 gap-3">

          <div className="bg-green-100 text-green-700 rounded-xl p-3 flex items-center justify-center gap-2">
            <Users size={16} />
            Headcount
          </div>

          <div className="bg-blue-100 text-blue-700 rounded-xl p-3 flex items-center justify-center gap-2">
            <DollarSign size={16} />
            Payroll
          </div>

          <div className="bg-orange-100 text-orange-700 rounded-xl p-3 flex items-center justify-center gap-2">
            <Activity size={16} />
            Attendance
          </div>

          <div className="bg-purple-100 text-purple-700 rounded-xl p-3 flex items-center justify-center gap-2">
            📈 Performance
          </div>

        </div>
      </div>

    </Card>
  );
}