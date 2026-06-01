
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Users,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/animations/login.json";
import { registerTenantApi } from "../../services/authApi";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cName: "",
    totalEmployee: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    setError("");

    // basic validation
    if (
      !form.cName ||
      !form.totalEmployee ||
      !form.fullName ||
      !form.email ||
      !form.phone ||
      !form.password
    ) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        cName: form.cName.trim(),
        totalEmployee: Number(form.totalEmployee),
        fullName: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        password: form.password,
      };

      console.log("REGISTER PAYLOAD:", payload);

      const res = await registerTenantApi(payload);

      console.log("REGISTER RESPONSE:", res);

      if (res?.success) {
        navigate("/verify-otp", {
          state: {
            email: payload.email,
          },
        });
      } else {
        setError(res?.message || "Registration failed");
      }
    } catch (err) {
      console.log("REGISTER ERROR:", err);

      setError(
        err?.response?.data?.message ||
          "Company registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "flex items-center border border-gray-200 rounded-2xl px-4 py-3 bg-gray-50 hover:border-[#7C4DFF] focus-within:border-[#7C4DFF] focus-within:bg-white transition-all duration-300";

  return (
    <div className="min-h-screen md:grid md:grid-cols-2 bg-[#f6f4ff] overflow-hidden">
      {/* LEFT SIDE */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-[#7C4DFF] via-[#8C63FF] to-[#B084FF] p-10">
        <div className="max-w-md text-white text-center">
          <Lottie
            animationData={loginAnimation}
            loop
            className="w-[360px] mx-auto"
          />

          <h1 className="text-4xl font-bold mt-2">Create Your Workspace</h1>
          <p className="mt-4 text-white/80 leading-7">
            Manage employees, attendance, payroll and tasks from one place.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center px-4 py-8 md:px-8">
        <div className="w-full max-w-2xl bg-white rounded-[32px] shadow-[0_20px_60px_rgba(124,77,255,0.12)] p-6 md:p-8">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Register Company
            </h2>
            <p className="text-gray-500 mt-2">
              Create your company account in a few simple steps.
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Company Name
              </label>
              <div className={inputClass}>
                <Building2 size={18} className="text-[#7C4DFF] mr-3" />
                <input
                  type="text"
                  name="cName"
                  value={form.cName}
                  onChange={handleChange}
                  placeholder="Company Name"
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Total Employees
              </label>
              <div className={inputClass}>
                <Users size={18} className="text-[#7C4DFF] mr-3" />
                <select
                  name="totalEmployee"
                  value={form.totalEmployee}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-sm"
                >
                  <option value="">Select Range</option>
                  <option value={10}>1 - 10</option>
                  <option value={25}>10 - 25</option>
                  <option value={50}>25 - 50</option>
                  <option value={100}>50 - 100</option>
                  <option value={200}>100+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Full Name
              </label>
              <div className={inputClass}>
                <User size={18} className="text-[#7C4DFF] mr-3" />
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Business Email
              </label>
              <div className={inputClass}>
                <Mail size={18} className="text-[#7C4DFF] mr-3" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="company@email.com"
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Phone Number
              </label>
              <div className={inputClass}>
                <Phone size={18} className="text-[#7C4DFF] mr-3" />
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Password
              </label>
              <div className={inputClass}>
                <Lock size={18} className="text-[#7C4DFF] mr-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create Password"
                  className="w-full bg-transparent outline-none text-sm"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-[#7C4DFF]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRegister}
            disabled={loading}
            className="w-full mt-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#7C4DFF] to-[#9F7AEA] text-white font-semibold text-base shadow-lg hover:scale-[1.01] hover:shadow-xl transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-5">
            Already registered?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-[#7C4DFF] font-semibold cursor-pointer hover:underline"
            >
              Back to Login Page
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
