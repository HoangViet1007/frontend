import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";

export const getInfoPT = createAsyncThunk("pt/getInfoPT", async (id) => {
  try {
    const response = await Api.get(`detail-pt/${id}`);
    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    if (error.response.status === 400) {
      window.location.href = "/404";
    }
  }
});

const PTDetailSlice = createSlice({
  name: "PTDetailSlice",
  initialState: {
    data: null,
    loading: false,
  },
  extraReducers: {
    [getInfoPT.pending]: (state, action) => {
      state.loading = true;
    },
    [getInfoPT.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [getInfoPT.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default PTDetailSlice.reducer;
