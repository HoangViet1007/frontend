import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";

export const getChart = createAsyncThunk("chart/get", async (params) => {
  try {
    const response = await Api.get(`/dashboard-pt`, {
      params: params,
    });
    return response?.data;
  } catch (error) {
    return error;
  }
});

const chartSlice = createSlice({
  name: "ptChart",
  initialState: {
    item: null,
    loading: false,
  },
  extraReducers: {
    [getChart.pending]: (state, action) => {
      state.loading = true;
    },
    [getChart.fulfilled]: (state, action) => {
      state.item = action.payload;
      state.loading = false;
    },
    [getChart.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default chartSlice.reducer;
