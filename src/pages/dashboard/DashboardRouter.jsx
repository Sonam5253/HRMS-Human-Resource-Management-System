import { useSelector } from "react-redux";
import EmployeeDashboard from "./EmployeeDashboard";
import HRDashboard from "./HRDashboard";
import AdminDashboard from "./AdminDashboard";

export default function DashboardRouter() {
  const reduxUser = useSelector((state) => state.auth.user);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = reduxUser || storedUser;

  const role = user?.role?.toLowerCase();

  if (role === "admin") return <AdminDashboard />;
  if (role === "hr") return <HRDashboard />;
  if (role === "team_leader") return <EmployeeDashboard />;

  return <EmployeeDashboard />;
}