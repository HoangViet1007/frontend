import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";
export const getBillPayCourseAdmin = createAsyncThunk(
  "BillPayCourseAdmin/getBillPayCourseAdmin",
  async (param) => {
    try {
      const response = await Api.get(
        `/bill-personal-trainer${param ? param : ""}`
      );
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return error;
    }
  }
);
const BillPayCourseAdminSlice = createSlice({
  name: "BillPayCourseAdmin",
  initialState: {
    loading: false,
    listBillCoursePt: [],
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
    removeFilters: (state) => {
      state.filters = {};
    },
  },
  extraReducers: {
    [getBillPayCourseAdmin.pending]: (state) => {
      state.loading = true;
    },
    [getBillPayCourseAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.listBillCoursePt = action.payload?.data;
      state.pagination.total = action.payload?.total;
      state.pagination.current_page = action.payload?.current_page;
    },
    [getBillPayCourseAdmin.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { setFilters, removeFilters } = BillPayCourseAdminSlice.actions;
export default BillPayCourseAdminSlice.reducer;
