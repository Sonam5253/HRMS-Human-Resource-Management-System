import { useState } from "react";
import { Mail, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/animations/login.json";

// 👇 direct api ki jagah service function use karo
import { forgotPasswordApi } from "../../services/authApi";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      // 👇 yaha service function call ho raha hai
      const res = await forgotPasswordApi(email);

      setMessage(
        res?.message || "Password reset link sent successfully"
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen md:grid md:grid-cols-2 bg-gray-50">
      {/* Left Side Animation */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-[#7C4DFF] to-[#9F7AEA]">
        <div className="w-[420px]">
          <Lottie animationData={loginAnimation} loop />
        </div>
      </div>

      {/* Right Side Form */}
      <div className="flex items-center justify-center bg-[#F8F7FF] px-5 py-10">
        <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-200 hover:shadow-md">
          <div className="mb-4 flex justify-center">
            <div className="rounded-2xl bg-[#F1ECFF] p-3">
              <UserCircle2 className="text-[#7C4DFF]" size={30} />
            </div>
          </div>

          <h1 className="text-center text-2xl font-bold text-gray-800">
            Forgot Password
          </h1>

          <p className="mt-2 text-center text-sm leading-6 text-gray-500">
            Enter your registered email to continue
          </p>

          {message && (
            <div className="mt-5 rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700 shadow-sm">
              {message}
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600 shadow-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Email Address
              </label>

              <div className="mt-2 flex items-center rounded-2xl border border-gray-200 bg-white px-4 py-3 transition-all duration-150 focus-within:border-[#7C4DFF] focus-within:ring-2 focus-within:ring-[#7C4DFF]/10">
                <Mail size={18} className="mr-3 text-[#7C4DFF]" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent text-sm outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-2xl bg-gradient-to-r from-[#7C4DFF] to-[#9F7AEA] py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Please wait..." : "Reset Password"}
            </button>

            <div className="pt-1 text-center text-sm text-gray-500">
              Remember your password?
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="ml-1 font-semibold text-[#7C4DFF] transition-all duration-150 hover:underline"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}