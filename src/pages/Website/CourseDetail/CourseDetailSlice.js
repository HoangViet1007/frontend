import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";
export const getCourseDetail = createAsyncThunk(
  "courseDetail/getCourseDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Api.get(`/course-detail/client/${id}`);
      if (response?.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const addComment = createAsyncThunk(
  "courseDetail/addComment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Api.post("add-comment", data);
      if (response?.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (error?.response?.data.messages) {
        return rejectWithValue(error?.response?.data.messages);
      }
      if (error?.response?.data.message) {
        return rejectWithValue(error?.response?.data.message);
      }
    }
  }
);
const CourseDetailSlice = createSlice({
  name: "CourseDetail",
  initialState: {
    loading: false,
    loadingAddComment: false,
    courseDetail: {},
    comments_client: [],
  },
  extraReducers: {
    [getCourseDetail.pending]: (state, action) => {
      state.loading = true;
    },
    [getCourseDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.courseDetail = action.payload;
      state.comments_client = action.payload?.detail_course?.comments_client;
    },
    [getCourseDetail.rejected]: (state, action) => {
      state.loading = false;
    },
    [addComment.pending]: (state) => {
      state.loadingAddComment = true;
    },
    [addComment.fulfilled]: (state, action) => {
      state.loadingAddComment = false;
      console.log(action.payload);
      state.comments_client.push(action.payload);
    },
    [addComment.rejected]: (state) => {
      state.loadingAddComment = false;
    },
  },
});
export default CourseDetailSlice.reducer;
