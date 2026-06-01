import axios from "../api/axios";

export const checkIn = async () => {
  const { data } = await axios.post("/attendance/check-in");
  return data;
};

export const checkOut = async () => {
  const { data } = await axios.post("/attendance/check-out");
  return data;
};

export const startBreak = async () => {
  const { data } = await axios.post("/attendance/break/start");
  return data;
};

export const endBreak = async () => {
  const { data } = await axios.post("/attendance/break/end");
  return data;
};

export const getAttendanceSummary = async (params = {}) => {
  const { data } = await axios.get("/attendance/me", {
    params,
  });

  return data;
};