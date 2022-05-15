import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";

export const getHome = createAsyncThunk(
  "CourseRequest/GetCourseRequest",
  async (params) => {
    try {
      const response = await Api.get(`dashboard-admin`, {
        params: params,
      });
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return error;
    }
  }
);
const HomeAdminSlice = createSlice({
  name: "Home",
  initialState: {
    items: [],
    loading: false,
  },

  extraReducers: {
    [getHome.pending]: (state, action) => {
      state.loading = true;
    },
    [getHome.fulfilled]: (state, action) => {
      state.items = action?.payload;
      state.loading = false;
    },
    [getHome.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});
export default HomeAdminSlice.reducer;
