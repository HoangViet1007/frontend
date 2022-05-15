import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";
export const getRequestPayment = createAsyncThunk(
  "RequestPayment/getRequestPayment",
  async (param) => {
    try {
      const response = await Api.get(
        `/get-request-admin-for-pt${param ? param : ""}`
      );
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return error;
    }
  }
);
const RequestPaymentSlice = createSlice({
  name: "RequestPayment",
  initialState: {
    loading: false,
    listRequest: [],
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
    [getRequestPayment.pending]: (state) => {
      state.loading = true;
    },
    [getRequestPayment.fulfilled]: (state, action) => {
      state.loading = false;
      state.listRequest = action.payload?.data;
      state.pagination.total = action.payload?.total;
      state.pagination.current_page = action.payload?.current_page;
    },
    [getRequestPayment.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { setFilters, removeFilters } = RequestPaymentSlice.actions;
export default RequestPaymentSlice.reducer;
