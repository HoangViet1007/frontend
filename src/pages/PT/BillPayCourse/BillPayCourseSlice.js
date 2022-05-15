import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";
export const getBillPayCoursePt = createAsyncThunk(
  "BillPayCoursePt/getBillPayCoursePt",
  async (param) => {
    try {
      const response = await Api.get(
        `/bill-personal-trainer-pt${param ? param : ""}`
      );
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return error;
    }
  }
);
const BillPayCoursePtSlice = createSlice({
  name: "BillPayCoursePt",
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
    [getBillPayCoursePt.pending]: (state) => {
      state.loading = true;
    },
    [getBillPayCoursePt.fulfilled]: (state, action) => {
      state.loading = false;
      state.listBillCoursePt = action.payload?.data;
      state.pagination.total = action.payload?.total;
      state.pagination.current_page = action.payload?.current_page;
    },
    [getBillPayCoursePt.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { setFilters, removeFilters } = BillPayCoursePtSlice.actions;
export default BillPayCoursePtSlice.reducer;
