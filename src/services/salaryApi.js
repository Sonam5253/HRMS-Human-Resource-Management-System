import axios from "../api/axios";

export const createSalaryStructureApi = async (payload) => {
  return axios.post("/salary/manage", payload);
};

export const getSalaryStructureApi = async () => {
  return axios.get("/salary/get");
};

export const deleteSalaryFieldApi = async (
  salaryId,
  fieldId,
  type
) => {
  return axios.delete(
    `/salary/${salaryId}/delete/${fieldId}?type=${type}`
  );
};