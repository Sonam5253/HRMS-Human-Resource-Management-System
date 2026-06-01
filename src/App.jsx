import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import MainLayout from "./layouts/MainLayout";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ClientsPage from "./pages/clients/ClientsPage";
import LandingPage from "./pages/landing/LandingPage";
import Profile from "./pages/profile/Profile";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ProjectsPage from "./pages/projects/ProjectsPage";
import Attendance from "./pages/attendance/Attendance";
import Tasks from "./pages/tasks/Tasks";
import Payroll from "./pages/payroll/Payroll";
import Settings from "./pages/settings/Settings";
import Leave from "./pages/leave/Leave";
import ResetPassword from "./pages/auth/ResetPassword";
import PrivateRoute from "./routes/PrivateRoute";
import EmployeeRegister from "./pages/EmployeeRegister";
import StaffManagement from "./pages/admin/StaffManagement";
import DashboardRouter from "./pages/dashboard/DashboardRouter";
import DepartmentManagementPage from "./pages/department/DepartmentManagementPage";
import ShiftPage from "./pages/shifts/ShiftPage";
import DesignationPage from "./pages/admin/DesignationPage";

export default function App() {
  const theme = useSelector((state) => state.theme.mode);
  const reduxUser = useSelector((state) => state.auth.user);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = reduxUser || storedUser;

  const role = user?.role
    ?.toLowerCase()
    ?.replace(/\s+/g, "_");

  const dashboardRoute =
    role === "admin"
      ? "/admin/dashboard"
      : role === "hr"
      ? "/hr/dashboard"
      : role === "team_leader"
      ? "/team-leader/dashboard"
      : "/employee/dashboard";

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* Old /dashboard route ko role wise redirect karo */}
      <Route
        path="/dashboard"
        element={<Navigate to={dashboardRoute} replace />}
      />

      

<Route element={<PrivateRoute />}>
  <Route element={<MainLayout />}>

    {/* ✅ ROLE BASED DASHBOARD */}
    <Route path="/admin/dashboard" element={<DashboardRouter />} />
    <Route path="/hr/dashboard" element={<DashboardRouter />} />
    <Route path="/team-leader/dashboard" element={<DashboardRouter />} />
    <Route path="/employee/dashboard" element={<DashboardRouter />} />

    <Route path="/attendance" element={<Attendance />} />
    <Route path="/attendance/leave" element={<Leave />} />

    <Route path="/departments" element={<DepartmentManagementPage />} />
    <Route path="/admin/designations" element={<DesignationPage />} />

    <Route path="/clients" element={<ClientsPage />} />
    <Route path="/projects" element={<ProjectsPage />} />
    <Route path="/tasks" element={<Tasks />} />
    <Route path="/shifts" element={<ShiftPage />} />
    <Route path="/staff" element={<StaffManagement />} />
    <Route path="/payroll" element={<Payroll />} />
    <Route path="/employeeregister" element={<EmployeeRegister />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/profile" element={<Profile />} />

  </Route>
</Route>
    </Routes>
  );
}