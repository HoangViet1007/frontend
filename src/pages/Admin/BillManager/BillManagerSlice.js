import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";

export const getBills = createAsyncThunk(
  "billings/getBills",
  async (params) => {
    try {
      const response = await Api.get(`/bill`, {
        params: params,
      });
      return response?.data;
    } catch (error) {
      return error;
    }
  }
);
const BillManagerSlices = createSlice({
  name: "billings",
  initialState: {
    loading: false,
    data: [],
  },
  extraReducers: {
    [getBills.pending]: (state) => {
      state.loading = true;
    },
    [getBills.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload?.data;
    },
    [getBills.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export default BillManagerSlices.reducer;
