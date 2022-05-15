import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (params) => {
    try {
      const response = await Api.get("/payment", {
        params: params,
      });
      return response?.data;
    } catch (error) {
      return error;
    }
  }
);

const BillManagerSlices = createSlice({
  name: "transactions",
  initialState: {
    loading: false,
    data: [],
  },
  extraReducers: {
    [getTransactions.pending]: (state) => {
      state.loading = true;
    },
    [getTransactions.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
    },
    [getTransactions.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export default BillManagerSlices.reducer;
