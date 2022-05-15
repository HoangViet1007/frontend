 
 

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";

export const getCourses = createAsyncThunk("course_student/getCourses", async () => {
  try {
    const response = await Api.get(`get-course_student/customer`);
    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    return error;
  }
});

const courseStuden = createSlice({
  name: "course_student",
  initialState: {
    items: [],
    item: null,
    meta: {
      current_page: 0,
      per_page: 10,
      total: 0,
    },
    loading: false,
  },
  extraReducers: {
    [getCourses.pending]: (state, action) => {
      state.loading = true;
    },
    [getCourses.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      // state.meta = {
      //   current_page: current_page,
      //   per_page: per_page,
      //   total: total,
      // };
    },
    [getCourses.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default courseStuden.reducer;
