import { createSlice } from "@reduxjs/toolkit";

const departmentSlice = createSlice({
  name: "department",
  initialState: {
    departments: [],
    selectedDepartment: null,
    loading: false,
  },
  reducers: {
    setDepartments: (state, action) => {
      state.departments = action.payload;
    },

    setSelectedDepartment: (state, action) => {
      state.selectedDepartment = action.payload;
    },

    setDepartmentLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setDepartments,
  setSelectedDepartment,
  setDepartmentLoading,
} = departmentSlice.actions;

export default departmentSlice.reducer;