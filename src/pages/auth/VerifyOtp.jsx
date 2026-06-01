import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import otpAnimation from "../../assets/animations/otp.json";
// import { verifyOtpApi } from "../../services/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";
import { verifyOtpThunk } from "../../features/auth/authSlice";
import { verifyOtpApi, resendOtpApi } from "../../services/authApi";
export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const email = location.state?.email;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // refs for all inputs
  const inputRefs = useRef([]);

  // ==============================
  // HANDLE OTP CHANGE
  // ==============================
  const handleChange = (value, index) => {
    // only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    // agar user paste kare poora otp
    if (value.length > 1) {
      const pastedOtp = value.slice(0, 6).split("");

      pastedOtp.forEach((digit, i) => {
        if (i < 6) {
          newOtp[i] = digit;
        }
      });

      setOtp(newOtp);

      // focus last filled input ya last box
      const nextIndex = Math.min(pastedOtp.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    // single digit fill
    newOtp[index] = value;
    setOtp(newOtp);

    // auto move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // ==============================
  // HANDLE BACKSPACE
  // ==============================
  const handleKeyDown = (e, index) => {
    // backspace pe previous input me chala jaye
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();

        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }

    // left/right arrow support
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // ==============================
  // HANDLE PASTE
  // ==============================
  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    const newOtp = [...otp];

    pastedData.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const focusIndex = pastedData.length === 6 ? 5 : pastedData.length;
    inputRefs.current[focusIndex]?.focus();
  };

  // ==============================
  // VERIFY OTP API CALL
  // ==============================
  const handleVerify = async () => {
    const otpValue = otp.join("");

  

  try {
    const user = await dispatch(
      verifyOtpThunk({
        email,
        otp: otpValue,
      })
    ).unwrap();

    if (user.role?.toLowerCase() === "admin") {
      navigate("/admin/dashboard");
    } else if (user.role?.toLowerCase() === "hr") {
      navigate("/hr/dashboard");
    } else {
      navigate("/dashboard");
    }
  } catch (err) {
    console.log(err);
    alert("Invalid or expired OTP");
  }
};
  

  // ==============================
// RESEND OTP API CALL
// ==============================
const handleResendOtp = async () => {
  try {
    const res = await resendOtpApi(email);

    console.log(res);

    alert(res.msg || "OTP resent successfully");
  } catch (err) {
    console.log(err.response?.data);

    alert(
      err.response?.data?.message || "Failed to resend OTP"
    );
  }
};

  return (
    <div className="min-h-screen md:grid md:grid-cols-2">
      {/* LEFT PANEL (DESKTOP ONLY) */}
      <div
        className="hidden md:flex items-center justify-center
        bg-gradient-to-br from-[#7C4DFF] to-[#9F7AEA]"
      >
        <div className="w-[420px]">
          <Lottie animationData={otpAnimation} loop />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col md:items-center md:justify-center bg-white md:bg-gray-100">
        {/* MOBILE TOP GRADIENT */}
        <div
          className="md:hidden bg-gradient-to-b from-[#7C4DFF] via-[#8B6CFF] to-white
          h-[300px] flex items-center justify-center"
        >
          <div className="w-44">
            <Lottie animationData={otpAnimation} loop />
          </div>
        </div>

        {/* OTP CARD */}
        <div
          className="bg-white rounded-t-[40px] md:rounded-3xl
          shadow-[0_-5px_25px_rgba(0,0,0,0.05)]
          px-8 pt-10 pb-8 w-full md:max-w-md
          -translate-y-20 md:translate-y-0
          md:hover:shadow-2xl md:hover:-translate-y-1 transition duration-300"
        >
          <h1 className="text-3xl font-bold text-center text-gray-600">
            OTP Verification
          </h1>

          <p className="text-center text-gray-400 mt-2">
            We've sent an otp to your email for verification
          </p>

          {/* OTP INPUT */}
          <div className="flex justify-between mt-8 gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                maxLength={6}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-12 h-12 md:w-14 md:h-14 text-center text-xl border
                border-gray-400 rounded-xl focus:border-[#7C4DFF]
                focus:ring-2 focus:ring-[#7C4DFF]/20 outline-none transition"
              />
            ))}
          </div>

          {/* RESEND */}
          <p className="text-center text-gray-400 mt-6">
            Didn't receive the otp?
          </p>

          <p
  onClick={handleResendOtp}
  className="text-center text-[#7C4DFF] font-semibold cursor-pointer hover:underline"
>
  Resend OTP
</p>

          {/* VERIFY BUTTON */}
          <button
            onClick={handleVerify}
            className="w-full mt-8 py-3 rounded-full text-white font-semibold shadow-lg
            bg-gradient-to-r from-[#7C4DFF] to-[#9F7AEA]
            hover:scale-105 hover:shadow-2xl transition duration-300"
          >
            Verify
          </button>

          {/* BACK */}
          <p
            onClick={() => navigate("/register")}
            className="text-center mt-6 text-gray-500 cursor-pointer"
          >
            Back to Registration
          </p>
        </div>
      </div>
    </div>
  );
}