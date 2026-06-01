import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Lock, Eye } from 'lucide-react';
import Lottie from 'lottie-react';
import loginAnimation from '../../assets/animations/login.json';
import { loginThunk } from '../../features/auth/authSlice';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  let fakeRole = "employee";

  if (email === "admin@gmail.com") {
    fakeRole = "admin";
  } else if (email === "hr@gmail.com") {
    fakeRole = "hr";
  } else if (email === "tl@gmail.com") {
    fakeRole = "team_leader";
  }

  const fakeUser = {
    id: 1,
    name: "Test User",
    email,
    role: fakeRole,
  };

  localStorage.setItem("access", "fake-token");
  localStorage.setItem("role", fakeRole);
  localStorage.setItem("user", JSON.stringify(fakeUser));

  switch (fakeRole) {
    case "admin":
      navigate("/admin/dashboard");
      break;

    case "hr":
      navigate("/hr/dashboard");
      break;

    case "team_leader":
      navigate("/team-leader/dashboard");
      break;

    default:
      navigate("/employee/dashboard");
  }
};
  return (
    <div className="min-h-screen md:grid md:grid-cols-2">
      {/* Left side - Animation (hidden on mobile) */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-[#7C4DFF] to-[#9F7AEA]">
        <div className="w-[420px]">
          <Lottie animationData={loginAnimation} loop />
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex flex-col md:items-center md:justify-center bg-white md:bg-gray-100">
        {/* Mobile animation */}
        <div className="md:hidden bg-gradient-to-b from-[#7C4DFF] via-[#8B6CFF] to-white h-[320px] flex items-center justify-center">
          <div className="w-48">
            <Lottie animationData={loginAnimation} loop />
          </div>
        </div>

        <div className="bg-white rounded-t-[40px] md:rounded-3xl shadow-[0_-5px_25px_rgba(0,0,0,0.05)] px-8 pt-10 pb-8 w-full md:max-w-md -translate-y-20 md:translate-y-0">
          <h1 className="text-3xl font-bold text-center text-gray-600">
            Welcome Back
          </h1>
          <p className="text-center text-gray-400 mt-2">
            Sign in to your account
          </p>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mt-8">
              <label className="text-gray-500 text-sm">Email Address</label>
              <div className="flex items-center border-2 border-gray-300 rounded-full px-4 py-3 mt-2">
                <Mail size={18} className="text-[#7C4DFF] mr-3" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mt-6">
              <label className="text-gray-500 text-sm">Password</label>
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 mt-2">
                <Lock size={18} className="text-[#7C4DFF] mr-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 outline-none bg-transparent"
                  required
                />
                <Eye
                  size={18}
                  className="text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>
            

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-[#7C4DFF] to-[#9F7AEA] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <div className="flex justify-end mt-2">
  <button
    type="button"
    onClick={() => navigate("/forgot-password")}
    className="text-sm text-[#7C4DFF] hover:underline font-medium"
  >
    Forgot Password?
  </button>
</div>

          <p className="text-center mt-6 text-gray-500">
            Don't have an account?
            <span
              onClick={() => navigate('/register')}
              className="text-[#7C4DFF] font-semibold cursor-pointer ml-1"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}