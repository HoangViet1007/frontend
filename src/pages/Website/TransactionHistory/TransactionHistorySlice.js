import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";
export const getTransactionHistory = createAsyncThunk(
  "TransactionHistory/getTransactionHistory",
  async (param) => {
    try {
      const response = await Api.get(
        `/khach-hang/payment${param ? param : ""}`
      );
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return error;
    }
  }
);
const TransactionHistorySlice = createSlice({
  name: "TransactionHistory",
  initialState: {
    loading: false,
    listTransactions: [],
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
    [getTransactionHistory.pending]: (state) => {
      state.loading = true;
    },
    [getTransactionHistory.fulfilled]: (state, action) => {
      state.loading = false;
      state.listTransactions = action.payload?.data;
      state.pagination.total = action.payload?.total;
      state.pagination.current_page = action.payload?.current_page;
    },
    [getTransactionHistory.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { setFilters, removeFilters } = TransactionHistorySlice.actions;
export default TransactionHistorySlice.reducer;
