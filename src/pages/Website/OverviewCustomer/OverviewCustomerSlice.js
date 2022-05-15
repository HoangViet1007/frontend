import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";
export const getOverviews = createAsyncThunk(
  "OverviewCustomer/getOverviews",
  async (param) => {
    try {
      const response = await Api.get(
        `/dashboard-customer${param ? `?${param}` : ""}`
      );
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return error;
    }
  }
);
const OverviewCustomerSlice = createSlice({
  name: "OverviewCustomer",
  initialState: {
    loading: false,
    listOverview: {},
  },
  extraReducers: {
    [getOverviews.pending]: (state) => {
      state.loading = true;
    },
    [getOverviews.fulfilled]: (state, action) => {
      state.loading = false;
      state.listOverview = action.payload;
    },
    [getOverviews.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export default OverviewCustomerSlice.reducer;
