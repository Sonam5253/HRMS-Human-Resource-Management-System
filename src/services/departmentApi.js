import axios from "../api/axios";

export const createDepartment = async (payload) => {
  const response = await axios.post("/departments/create", payload);
  return response.data;
};

export const getDepartments = async () => {
  const response = await axios.get("/departments/get");
  return response.data; // ✅ बस यही
};

export const getDepartmentById = async (id) => {
  const response = await axios.get(`/departments/${id}`);
  return response.data;
};


export const updateDepartment = async (id, payload) => {
  const response = await axios.put(
    `/departments/${id}`,
    payload
  );
  return response.data;
};


export const deleteDepartment = async (id) => {
  const response = await axios.delete(`/departments/${id}`);
  return response.data;
};

export const getDepartmentHrs = async (departmentId) => {
  const response = await axios.get(`/departments/${departmentId}/hrs`);
  return response.data;
};

export const getDepartmentHierarchy = async (
  departmentId,
  hrIds = [],
  tlIds = []
) => {
  const params = new URLSearchParams();

  if (hrIds.length > 0) {
    params.append("hrId", hrIds.join(","));
  }

  if (tlIds.length > 0) {
    params.append("tlId", tlIds.join(","));
  }

  const query = params.toString();

  const response = await axios.get(
    `/departments/${departmentId}/employees${
      query ? `?${query}` : ""
    }`
  );

  return response.data;
};