import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";
export const PaymentUrl = createAsyncThunk(
  "website/paymenturl",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Api.post("thanh-toan", data);
      if (response.status === 200) {
        return response?.data;
      }
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data?.messages);
    }
  }
);
export const PaymentRegister = createAsyncThunk(
  "website/payment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Api.post("course_student-post", data);
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data?.messages);
    }
  }
);

const PaymentSilce = createSlice({
  name: "specializedetailpt",
  initialState: {
    items: [],
    meta: {
      current_page: 0,
      per_page: 10,
      total: 0,
    },
    loading: false,
  },
  extraReducers: {
    [PaymentRegister.pending]: (state, action) => {
      state.loading = true;
    },
    [PaymentRegister.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [PaymentRegister.rejected]: (state, action) => {
      state.loading = false;
    },
    [PaymentRegister.pending]: (state, action) => {
      state.loading = true;
    },
    [PaymentRegister.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [PaymentRegister.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});
export default PaymentSilce.reducer;
