import axios from "../api/axios";

export const getProjectsApi = async () => {
  const res = await axios.get("/projects/get");
  return res.data;
};

export const createProjectApi = async (payload) => {
  const res = await axios.post("/projects/create", payload);
  return res.data;
};

export const getProjectByIdApi = async (id) => {
  const res = await axios.get(`/projects/${id}`);
  return res.data;
};

export const updateProjectApi = async (id, payload) => {
  const res = await axios.put(`/projects/${id}`, payload);
  return res.data;
};

export const deleteProjectApi = async (id) => {
  const res = await axios.delete(`/projects/${id}`);
  return res.data;
};