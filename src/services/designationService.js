import api from "../api/axios";

// CREATE
export const createDesignation = (data) =>
  api.post("/designation", data);

// UPDATE
export const updateDesignation = (id, data) =>
  api.put(`/designation/${id}`, data);

// GET (current backend hack support)
export const getDesignationByDepartment = (departmentId) =>
  api.get(`/designation/${departmentId}`);

// 👉 future me change:
// api.get(`/designation/department/${departmentId}`);