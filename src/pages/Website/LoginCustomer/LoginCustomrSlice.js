import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";
export const addCustomerGoogle = createAsyncThunk(
  "customer/addCustomerGoogle",
  async (access_token, { rejectWithValue }) => {
    try {
      const response = await Api.post("/login/google", {
        access_token,
        role: "Customer",
      });
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.messages);
    }
  }
);
export const loginCustomer = createAsyncThunk(
  "customer/loginCustomer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Api.post("/login", data);
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
const LoginCustomerSlice = createSlice({
  name: "LoginCustomer",
  initialState: {
    loading: false,
  },
  extraReducers: {
    [addCustomerGoogle.pending]: (state, action) => {
      state.loading = true;
    },
    [addCustomerGoogle.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [addCustomerGoogle.rejected]: (state, action) => {
      state.loading = false;
    },
    [loginCustomer.pending]: (state, action) => {
      state.loading = true;
    },
    [loginCustomer.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [loginCustomer.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});
export default LoginCustomerSlice.reducer;
