import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";
export const getBillCustomer = createAsyncThunk(
  "BillCustomer/getBillCustomer",
  async (param) => {
    try {
      const response = await Api.get(`/hoa-don${param ? param : ""}`);
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return error;
    }
  }
);
const BillCustomerSlice = createSlice({
  name: "BillCustomer",
  initialState: {
    loading: false,
    listBill: [],
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
    [getBillCustomer.pending]: (state) => {
      state.loading = true;
    },
    [getBillCustomer.fulfilled]: (state, action) => {
      state.loading = false;
      state.listBill = action.payload?.data;
      state.pagination.total = action.payload?.total;
      state.pagination.current_page = action.payload?.current_page;
    },
    [getBillCustomer.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { setFilters, removeFilters } = BillCustomerSlice.actions;
export default BillCustomerSlice.reducer;
