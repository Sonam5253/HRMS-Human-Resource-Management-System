import { useAuth } from "../context/AuthContext";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import HRDashboard from "../pages/dashboard/HRDashboard";
import EmployeeDashboard from "../pages/dashboard/EmployeeDashboard";

export default function RoleBasedRoute() {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case "admin":
      return <AdminDashboard />;

    case "hr":
      return <HRDashboard />;

    case "employee":
    default:
      return <EmployeeDashboard />;
  }
}
