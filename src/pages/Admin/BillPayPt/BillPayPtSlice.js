import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";
import { uploadImg } from "../../../utils/uploadImg";
export const getBillPayPt = createAsyncThunk(
  "BillPayPt/getBillPayPt",
  async (param) => {
    try {
      const response = await Api.get(
        `/get-request-admin-for-admin${param ? param : ""}`
      );
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return error;
    }
  }
);
export const createBillPT = createAsyncThunk(
  "BillPayPt/createBillPT",
  async (data, { rejectWithValue }) => {
    try {
      if (data.image) {
        const url = await uploadImg(data.image?.file?.originFileObj);
        data.image = url;
      }
      const response = await Api.post("/bill-personal-trainer", data);
      if (response?.status === 200) {
        return response?.data;
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
const BillPayPtSlice = createSlice({
  name: "BillPayPt",
  initialState: {
    loading: false,
    loadingCreateBill: false,
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
    [getBillPayPt.pending]: (state) => {
      state.loading = true;
    },
    [getBillPayPt.fulfilled]: (state, action) => {
      state.loading = false;
      state.listBill = action.payload?.data;
      state.pagination.total = action.payload?.total;
      state.pagination.current_page = action.payload?.current_page;
    },
    [getBillPayPt.rejected]: (state) => {
      state.loading = false;
    },
    [createBillPT.pending]: (state) => {
      state.loadingCreateBill = true;
    },
    [createBillPT.fulfilled]: (state) => {
      state.loadingCreateBill = false;
    },
    [createBillPT.rejected]: (state) => {
      state.loadingCreateBill = false;
    },
  },
});
export const { setFilters, removeFilters } = BillPayPtSlice.actions;
export default BillPayPtSlice.reducer;
