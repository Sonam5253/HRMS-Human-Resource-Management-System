import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";


export default function Settings() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Settings</h1>
      <button onClick={() => dispatch(logout())}
       className="bg-red-600 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
}
