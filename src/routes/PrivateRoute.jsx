import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute() {
  const reduxUser = useSelector((state) => state.auth.user);

  const storedUser = localStorage.getItem("user");
  const user = reduxUser || (storedUser ? JSON.parse(storedUser) : null);

  const token = localStorage.getItem("access");

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}