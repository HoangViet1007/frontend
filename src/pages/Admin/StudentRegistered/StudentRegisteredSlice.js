import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";

export const getStudentRegistered = createAsyncThunk(
  "studentRegistered/get",
  async (params) => {
    try {
      const response = await Api.get("/get-all-course-student", {
        params: params,
      });
      return response?.data;
    } catch (error) {
      return error;
    }
  }
);

const StudentRegisteredSlice = createSlice({
  name: "studentRegistered",
  initialState: {
    loading: false,
    data: [],
  },
  extraReducers: {
    [getStudentRegistered.pending]: (state) => {
      state.loading = true;
    },
    [getStudentRegistered.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getStudentRegistered.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export default StudentRegisteredSlice.reducer;
