import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";
import { uploadImg } from "../../../utils/uploadImg";
export const addCustomer = createAsyncThunk(
  "Customer/addCustomer",
  async (info, { rejectWithValue }) => {
    try {
      const url = await uploadImg(info.image);
      info.image = url;
      const response = await Api.post("/user_customer", info);
      if (response?.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.messages);
    }
  }
);
const RegisterCustomerSlice = createSlice({
  name: "RegisterCustomer",
  initialState: {
    loading: false,
  },
  extraReducers: {
    [addCustomer.pending]: (state) => {
      state.loading = true;
    },
    [addCustomer.fulfilled]: (state) => {
      state.loading = false;
    },
    [addCustomer.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export default RegisterCustomerSlice.reducer;
