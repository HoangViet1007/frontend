import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";

export const getPass = createAsyncThunk(
  "resetPass/getPass",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Api.post("/get-password", data);
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      if (error.response.data.messages) {
        return rejectWithValue(error.response.data.messages);
      }
      if (error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
    }
  }
);
const resetPassSlice = createSlice({
  name: "resetPass",
  initialState: {
    loading: false,
  },
  extraReducers: {
    [getPass.pending]: (state) => {
      state.loading = true;
    },
    [getPass.fulfilled]: (state) => {
      state.loading = false;
    },
    [getPass.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export default resetPassSlice.reducer;
