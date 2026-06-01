// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://192.168.18.202:3005",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   timeout: 30000,
// });

// // ================= REQUEST INTERCEPTOR =================
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access");

//     // DEBUG
//     // console.log("API REQUEST =>", config.url);
//     // console.log("ACCESS TOKEN =>", token);

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ================= RESPONSE INTERCEPTOR =================
// api.interceptors.response.use(
//   (response) => response,

//   (error) => {
//     const requestUrl = error.config?.url || "";
//     const status = error.response?.status;

//     // DEBUG
//     console.log("API ERROR URL =>", requestUrl);
//     console.log("API ERROR STATUS =>", status);
//     console.log("API ERROR DATA =>", error.response?.data);

//     // इन routes पर auto logout / redirect नहीं करना
//     const ignoreRedirectRoutes = [
//       "/company/login",
//       "/company/register",
//       "/company/verify-otp",
//       "/employees/create",
//       "/employees/company",
//     ];

//     const shouldIgnoreRedirect = ignoreRedirectRoutes.some((route) =>
//       requestUrl.includes(route)
//     );

//     if (shouldIgnoreRedirect) {
//       return Promise.reject(error);
//     }

//     // बाकी सभी 401 पर logout + redirect
//     if (status === 401) {
//       localStorage.removeItem("access");
//       localStorage.removeItem("refresh");
//       localStorage.removeItem("user");
//       localStorage.removeItem("role");

//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.18.202:3005",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// ================= REQUEST INTERCEPTOR =================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ================= RESPONSE INTERCEPTOR =================
api.interceptors.response.use(
  (response) => response,

  (error) => {
    const requestUrl = error.config?.url || "";
    const status = error.response?.status;

    const ignoreRedirectRoutes = [
      "/company/login",
      "/company/register",
      "/company/verify-otp",
      "/employees/create",
      "/employees/company",
    ];

    const shouldIgnoreRedirect = ignoreRedirectRoutes.some((route) =>
      requestUrl.includes(route)
    );

    if (shouldIgnoreRedirect) {
      return Promise.reject(error);
    }

    if (status === 401) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");

      const role = localStorage.getItem("role");

      localStorage.removeItem("role");

      switch (role) {
        case "admin":
          window.location.href = "/admin/login";
          break;

        case "company":
          window.location.href = "/company/login";
          break;

        case "employee":
          window.location.href = "/employee/login";
          break;

        default:
          window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;