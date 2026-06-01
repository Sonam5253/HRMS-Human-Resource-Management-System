import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginTenantApi, verifyOtpApi } from "../../services/authApi";
import { saveAuth, clearAuth } from "../../utils/auth";



// ================= LOGIN =================
export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {

    try {

      const res = await loginTenantApi(email, password);

if (!res.success) {
  return rejectWithValue("Login failed");
}

saveAuth(res);

return {
  id: res.data._id,
  email: res.data.email,
  role: res.data.role,
  name: res.data.fullName, 
};

    } catch (error) {

      return rejectWithValue(
        error?.response?.data?.errors?.detail ||
        error?.message ||
        "Login failed"
      );

    }
  }

);

// ================= VERIFY OTP =================

export const verifyOtpThunk = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await verifyOtpApi(email, otp);

if (!response?.success) {
  return rejectWithValue("OTP verification failed");
}

const { data } = response;

saveAuth(response);

return {
  id: data.user_id,
  email: data.email,
  role: data.role,
  tenant: data.tenant,
  name: data.name,
};

    } catch (error) {
      return rejectWithValue("OTP verification failed");
    }
  }
);

// ================= INITIAL STATE =================

const storedUser = localStorage.getItem("user");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  loading: false,
  error: null,
};

// ================= SLICE =================

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    // Logout
    logout: (state) => {
      state.user = null;
      clearAuth();
    },

    // 🔥 IMPORTANT (Fix for your error)
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

  },

  extraReducers: (builder) => {

    builder

      // LOGIN
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // OTP VERIFY
      .addCase(verifyOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(verifyOtpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("role", action.payload.role.toLowerCase());
      })

      .addCase(verifyOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});
export const registerEmployeeThunk = createAsyncThunk(
  "employee/register",
  async (payload, { rejectWithValue }) => {

    try {

      const res = await registerEmployeeApi(payload);

      if (!res.success) {
        return rejectWithValue("Employee register failed");
      }

      return res.data;

    } catch (error) {

      return rejectWithValue(
        error?.response?.data?.message || "Employee register failed"
      );

    }

  }
);

// ================= EXPORT =================

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;