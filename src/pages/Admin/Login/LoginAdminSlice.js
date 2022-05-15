import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";
export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Api.post("/login", data);
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.messages
          ? error.response.data.messages
          : error.response.data.message
      );
    }
  }
);
const LoginAdminSlice = createSlice({
  name: "LoginAdmin",
  initialState: {
    loading: false,
  },
  extraReducers: {
    [loginAdmin.pending]: (state) => {
      state.loading = true;
    },
    [loginAdmin.fulfilled]: (state) => {
      state.loading = false;
    },
    [loginAdmin.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export default LoginAdminSlice.reducer;
