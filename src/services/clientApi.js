import api from "../api/axios";

export const getClients = async () => {
  const response = await api.get("/clients/get");
  return response.data;
};

export const createClient = async (payload) => {
  const response = await api.post("/clients/create", payload);
  return response.data;
};

export const updateClient = async (id, payload) => {
  const response = await api.put(`/clients/${id}`, payload);
  return response.data;
};

export const deleteClient = async (id) => {
  const response = await api.delete(`/clients/${id}`);
  return response.data;
};