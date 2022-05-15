import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";
export const getManageComments = createAsyncThunk(
  "ManageCommentSlice/getManageComments",
  async (param) => {
    try {
      const response = await Api.get(`/list-comment${param ? param : ""}`);
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return error;
    }
  }
);
export const changeStatus = createAsyncThunk(
  "ManageCommentSlice/changeStatus",
  async (status, { rejectWithValue }) => {
    try {
      const response = await Api.post("/change-status-comment", status);
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      if (error.response.data.messages) {
        return rejectWithValue(error.response.data.messages);
      }
      if (error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
    }
  }
);
const ManageCommentSlice = createSlice({
  name: "ManageComment",
  initialState: {
    loading: false,
    loadingStatus: false,
    comments: [],
    filters: {},
    pagination: {
      total: "",
      current_page: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: {
    [getManageComments.pending]: (state) => {
      state.loading = true;
    },
    [getManageComments.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = action.payload?.data;
      state.pagination.total = action.payload?.total;
      state.pagination.current_page = action.payload?.current_page;
    },
    [getManageComments.rejected]: (state) => {
      state.loading = false;
    },
    [changeStatus.pending]: (state) => {
      state.loadingStatus = true;
    },
    [changeStatus.fulfilled]: (state, action) => {
      state.loadingStatus = false;
    },
    [changeStatus.rejected]: (state) => {
      state.loadingStatus = false;
    },
  },
});
export const { setFilters } = ManageCommentSlice.actions;
export default ManageCommentSlice.reducer;
