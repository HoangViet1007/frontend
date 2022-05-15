import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";
export const addPtGoogle = createAsyncThunk(
  "pt/addPtGoogle",
  async (access_token, { rejectWithValue }) => {
    try {
      const response = await Api.post("/login/google", {
        access_token,
        role: "Pt",
      });
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data?.messages);
    }
  }
);
export const loginPt = createAsyncThunk(
  "pt/loginPt",
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
const LoginPtSlice = createSlice({
  name: "LoginPt",
  initialState: {
    loading: false,
  },
  extraReducers: {
    [addPtGoogle.pending]: (state) => {
      state.loading = true;
    },
    [addPtGoogle.fulfilled]: (state) => {
      state.loading = false;
    },
    [addPtGoogle.rejected]: (state) => {
      state.loading = false;
    },
    [loginPt.pending]: (state) => {
      state.loading = true;
    },
    [loginPt.fulfilled]: (state) => {
      state.loading = false;
    },
    [loginPt.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export default LoginPtSlice.reducer;
