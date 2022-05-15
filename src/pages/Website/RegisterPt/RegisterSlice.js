import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";
import { notification } from "antd";
import { uploadImg } from "../../../utils/uploadImg";
export const addPT = createAsyncThunk(
  "PT/addPT",
  async (info, { rejectWithValue }) => {
    try {
      const url = await uploadImg(info.image);
      info.image = url;
      const response = await Api.post("user_pt", info);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.messages);
    }
  }
);
export const addPtGoogle = createAsyncThunk(
  " PT/addPtGoogle",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Api.post("/login/google", data);
      if (response?.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.messages);
    }
  }
);
const RegisterPtSlice = createSlice({
  name: "RegisterPT",
  initialState: {
    loading: false,
    accessToken: "",
  },
  reducers: {
    removeErrors: (state) => {
      state.errors = null;
    },
    showLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: {
    [addPT.pending]: (state, action) => {
      state.loading = true;
    },
    [addPT.fulfilled]: (state, action) => {
      state.loading = false;
      notification.success({ message: `Đăng ký PT thành công` });
    },
    [addPT.rejected]: (state, action) => {
      state.loading = false;
    },
    [addPtGoogle.pending]: (state, action) => {
      state.loading = true;
    },
    [addPtGoogle.fulfilled]: (state, action) => {
      state.loading = false;
      state.accessToken = action.payload;
      notification.success({ message: `Đăng ký PT thành công` });
    },
    [addPtGoogle.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
  },
});
export const { removeErrors, showLoading } = RegisterPtSlice.actions;
export default RegisterPtSlice.reducer;
