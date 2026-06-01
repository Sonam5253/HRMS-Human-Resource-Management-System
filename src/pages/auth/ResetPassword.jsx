import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Lock, Eye, EyeOff } from "lucide-react";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/animations/login.json";

// 👇 ye import add karo
import { resetPasswordApi } from "../../services/authApi";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // 👇 direct api.post ki jagah service call
      const res = await resetPasswordApi(token, password);

      setMessage(res.message || "Password reset successfully");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Reset link expired or invalid"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen md:grid md:grid-cols-2 bg-gray-50">
      
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-[#7C4DFF] to-[#9F7AEA]">
  <div className="w-[420px]">
    <Lottie animationData={loginAnimation} loop />
  </div>
</div>

      <div className="flex items-center justify-center px-5 py-10 bg-[#F8F7FF]">
        <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-7 shadow-sm hover:shadow-md transition-all duration-200">
          <h2 className="text-center text-2xl font-bold text-gray-800">
            Reset Password
          </h2>

          <p className="mt-2 text-center text-sm text-gray-500">
            Enter your new password below
          </p>

          {message && (
            <div className="mt-5 rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">
              {message}
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                New Password
              </label>

              <div className="mt-2 flex items-center rounded-2xl border border-gray-200 px-4 py-3 focus-within:border-[#7C4DFF] focus-within:ring-2 focus-within:ring-[#7C4DFF]/10">
                <Lock size={18} className="mr-3 text-[#7C4DFF]" />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="flex-1 bg-transparent text-sm outline-none"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-gray-400" />
                  ) : (
                    <Eye size={18} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Confirm Password
              </label>

              <div className="mt-2 flex items-center rounded-2xl border border-gray-200 px-4 py-3 focus-within:border-[#7C4DFF] focus-within:ring-2 focus-within:ring-[#7C4DFF]/10">
                <Lock size={18} className="mr-3 text-[#7C4DFF]" />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="flex-1 bg-transparent text-sm outline-none"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} className="text-gray-400" />
                  ) : (
                    <Eye size={18} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-[#7C4DFF] to-[#9F7AEA] py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:scale-[1.01] disabled:opacity-60"
            >
              {loading ? "Please wait..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
