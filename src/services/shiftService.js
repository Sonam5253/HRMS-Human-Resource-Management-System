import axios from "../api/axios";

export const getShiftsApi = async () => {
  const res = await axios.get("/shifts");
  return res.data;
};

export const createShiftApi = async (payload) => {
  const res = await axios.post("/shifts", payload);
  return res.data;
};

export const getShiftByIdApi = async (id) => {
  const res = await axios.get(`/shifts/${id}`);
  return res.data;
};

export const updateShiftApi = async (id, payload) => {
  const res = await axios.put(`/shifts/${id}`, payload);
  return res.data;
};

export const deleteShiftApi = async (id) => {
  const res = await axios.delete(`/shifts/${id}`);
  return res.data;
};

export const getShiftAttendanceApi = async (id) => {
  const res = await axios.get(`/shifts/reports/attendance?shiftId=${id}`);
  return res.data;
};