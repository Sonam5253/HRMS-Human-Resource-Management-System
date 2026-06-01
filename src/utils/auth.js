export const saveAuth = (data) => {
  const access = data.access || data.token;
  const refresh = data.refresh || null;

  if (access) {
    localStorage.setItem("access", access);
  }

  if (refresh) {
    localStorage.setItem("refresh", refresh);
  }

  const user = {
    id: data.data?._id || data.user_id,
    email: data.data?.email || data.email,
    role: (data.data?.role || data.role || "").toLowerCase(),
    tenant: data.tenant || null,
    fullName: data.data?.fullName || data.data?.cName || "",
  };

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("role", user.role);
};

export const clearAuth = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
  localStorage.removeItem("role");
};