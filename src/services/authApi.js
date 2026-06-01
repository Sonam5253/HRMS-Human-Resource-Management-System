import api from "../api/axios";
// REGISTER
export const registerTenantApi = async (payload) => {
  const res = await api.post("/company/register", payload);
  return res.data;
};

// VERIFY OTP
export const verifyOtpApi = async (email, otp) => {
  const res = await api.post("/company/verify-otp", {
    email,
    otp,
  });

  return res.data;
};

// LOGIN
export const loginTenantApi = async (email, password) => {
  const res = await api.post("/company/login", {
    email,
    password,
  });

  return res.data;
};

// RESEND OTP
export const resendOtpApi = async (email) => {
  const res = await api.post("/company/resend-otp", {
    email,
  });

  return res.data;
};


export const forgotPasswordApi = async (email) => {
  const res = await api.post("/company/forgot-password", {
    email,
  });

  return res.data;
};

export const resetPasswordApi = async (token, password) => {
  const res = await api.post(`/company/reset-password/${token}`, {
    password,
  });

  return res.data;
};


