
 

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";

export const ChangePassword = createAsyncThunk(
  "user/updatePassword",
  async (value, { rejectWithValue }) => {
    try {
      const response = await Api.post("update-password", value);
      return response;
    } catch (error) {
      if (error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        const errors = error.response.data.messages;
        for (const [key, value] of Object.entries(errors)) {
          return rejectWithValue(value);
        }
      }
    }
  }
);

const ChangePasswordSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [ChangePassword.pending]: (state, action) => {
      state.loading = true;
    },
    [ChangePassword.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [ChangePassword.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});
export default ChangePasswordSlice.reducer;
