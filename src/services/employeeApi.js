import api from "../api/axios";

export const registerEmployeeApi = (data) => {
  return api.post("/employees/create", data);
};

export const getEmployeesApi = () => {
  return api.get("/employees/get");
};

export const getEmployeeByIdApi = (id) => {
  return api.get(`/employees/${id}`);
};

export const updateEmployeeApi = (id, data) => {
  return api.put(`/employees/${id}`, data);
};

export const deleteEmployeeApi = (id) => {
  return api.delete(`/employees/${id}`);
};