import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepartmentsApi } from "../services/departmentApi";
import {
  setDepartments,
  setDepartmentLoading,
} from "../store/departmentSlice";

export default function useDepartments() {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.department.departments);

  const fetchDepartments = async () => {
    try {
      dispatch(setDepartmentLoading(true));

      const res = await getDepartmentsApi();

      dispatch(setDepartments(res.data.data));
    } catch (err) {
      console.error("Department fetch failed", err);
    } finally {
      dispatch(setDepartmentLoading(false));
    }


  useEffect(() => {
    fetchDepartments();
  }, []);

  return {
    departments,
    fetchDepartments,
  };
}
}