import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";

export const getCourseRequest = createAsyncThunk(
  "CourseRequest/GetCourseRequest",
  async (params) => {
    try {
      const response = await Api.get(`get-course-request`, {
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
export const updateSTTCourseRequest = createAsyncThunk(
  "CourseRequest/updateSTTCourseRequest",
  async (data, { rejectWithValue }) => {
    const id = data?.id;
    const reqData = data?.value;
    try {
      const response = await Api.put(`course/pt/${id}`, reqData);
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const CourseRequestSilce = createSlice({
  name: "CourseRequest",
  initialState: {
    items: [],
    filters: {},
    meta: {
      current_page: 0,
      per_page: 10,
      total: 0,
    },
    loading: false,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    removeFilters: (state) => {
      state.filters = {};
    },
  },
  extraReducers: {
    [getCourseRequest.pending]: (state, action) => {
      state.loading = true;
    },
    [getCourseRequest.fulfilled]: (state, action) => {
      state.items = action?.payload;
      state.loading = false;
    },
    [getCourseRequest.rejected]: (state, action) => {
      state.loading = false;
    },
    [updateSTTCourseRequest.pending]: (state, action) => {
      state.loading = true;
    },
    [updateSTTCourseRequest.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateSTTCourseRequest.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});
export const { setFilters, removeFilters } = CourseRequestSilce.actions;
export default CourseRequestSilce.reducer;
