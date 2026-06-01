

// ICONS
import {
  Users,
  UserPlus,
  Calendar,
  Briefcase,
  TrendingUp,
  FileText
} from "lucide-react";

// CHARTS
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

export default function AdminDashboard() {

  const employeeGrowth = [
    { month: "Jan", employees: 80 },
    { month: "Feb", employees: 90 },
    { month: "Mar", employees: 95 },
    { month: "Apr", employees: 105 },
    { month: "May", employees: 110 },
  ];

  const departmentData = [
    { name: "Engineering", value: 40 },
    { name: "HR", value: 15 },
    { name: "Marketing", value: 20 },
    { name: "Sales", value: 25 },
  ];

  const colors = ["#7C4DFF","#4F46E5","#06B6D4","#10B981"];

  const employees = [
    { name: "Rahul Sharma", role: "Developer" },
    { name: "Priya Singh", role: "HR Manager" },
    { name: "Aman Verma", role: "Designer" },
  ];

  const leaves = [
    { name: "Ankit", type: "Sick Leave" },
    { name: "Neha", type: "Casual Leave" },
  ];

  return (
    
      <div className="space-y-6">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white rounded-2xl p-6">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <p className="opacity-80">
            Company insights and management overview
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-xl shadow border">
            <p className="text-sm text-gray-500">Total Employees</p>
            <h3 className="text-2xl font-semibold">110</h3>
            <Users className="text-indigo-500 mt-2"/>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border">
            <p className="text-sm text-gray-500">Revenue</p>
            <h3 className="text-2xl font-semibold">₹12L</h3>
            <TrendingUp className="text-green-500 mt-2"/>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border">
            <p className="text-sm text-gray-500">Pending Leaves</p>
            <h3 className="text-2xl font-semibold">8</h3>
            <Calendar className="text-orange-500 mt-2"/>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border">
            <p className="text-sm text-gray-500">Departments</p>
            <h3 className="text-2xl font-semibold">7</h3>
            <Briefcase className="text-blue-500 mt-2"/>
          </div>

        </div>

        {/* CHARTS */}
        <div className="grid lg:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="mb-4 font-semibold">Employee Growth</h3>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={employeeGrowth}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="employees" fill="#7C4DFF" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="mb-4 font-semibold">Department Distribution</h3>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={departmentData} dataKey="value" outerRadius={90}>
                  {departmentData.map((entry, index) => (
                    <Cell key={index} fill={colors[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* TABLES */}
        <div className="grid lg:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="mb-4 font-semibold">Recent Employees</h3>

            {employees.map((emp, i) => (
              <div key={i} className="flex justify-between border-b py-2">
                <span>{emp.name}</span>
                <span className="text-sm text-gray-500">{emp.role}</span>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="mb-4 font-semibold">Pending Leaves</h3>

            {leaves.map((leave, i) => (
              <div key={i} className="flex justify-between border-b py-2">
                <span>{leave.name}</span>
                <span className="text-orange-500 text-sm">{leave.type}</span>
              </div>
            ))}
          </div>

        </div>

      </div>

    
  );
}