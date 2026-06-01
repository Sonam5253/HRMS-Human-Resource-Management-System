import AttendanceCard from "../../components/dashboard/AttendanceCard";
import ProductivityCard from "../../components/dashboard/ProductivityCard";
import TasksCard from "../../components/dashboard/TasksCard";
import ActivityTimeline from "../../components/dashboard/ActivityTimeline";
import LeaveBalanceCard from "../../components/dashboard/LeaveBalanceCard";
import QuickActions from "../../components/dashboard/QuickActions";
export default function EmployeeDashboard() {
  return (
    <div className="space-y-4">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <AttendanceCard />
        <ProductivityCard />
        <TasksCard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ActivityTimeline />
        <LeaveBalanceCard />
        <QuickActions />
      </div>

    </div>
  );
}