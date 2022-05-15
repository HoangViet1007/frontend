import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";
export const getCoursesPlan = createAsyncThunk(
  "CoursePlanCustomer/getCoursesPlan",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Api.get(`get-course_plan-by-course-student/${id}`);
      if (response?.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (error?.response?.data.message) {
        return rejectWithValue(error?.response?.data.message);
      }
    }
  }
);
const CoursePlanCustomerSlice = createSlice({
  name: "CoursePlanCustomer",
  initialState: {
    lessons: [],
    loading: false,
  },
  extraReducers: {
    [getCoursesPlan.pending]: (state) => {
      state.loading = true;
    },
    [getCoursesPlan.fulfilled]: (state, action) => {
      state.lessons = action.payload;
      state.loading = false;
    },
    [getCoursesPlan.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export default CoursePlanCustomerSlice.reducer;
