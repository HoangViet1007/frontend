import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { Api } from "../utils/Api";

export const getInfoUser = createAsyncThunk("user/getInfoUser", async () => {
  try {
    const response = await Api.get("who-am-i");
    if (response.status === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("infoUser");
    }
  }
});
export const LogOutUser = createAsyncThunk("user/LogOutUser", async () => {
  try {
    const response = await Api.get("logout");
    return response?.data?.message;
  } catch (error) {
    notification.error({ message: "Đăng xuất thất bại" });
  }
});
const UserSlice = createSlice({
  name: "User",
  initialState: {
    social_all: [],
    infoUser: "",
    loading: false,
  },
  reducers: {
    changeInfoUser: (state, action) => {
      state.infoUser = action.payload;
    },
  },
  extraReducers: {
    [getInfoUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getInfoUser.fulfilled]: (state, action) => {
      state.infoUser = action?.payload;
      state.social_all = action?.payload?.social_all;
      state.loading = false;
    },
    [getInfoUser.rejected]: (state, action) => {
      state.loading = false;
    },
    [LogOutUser.pending]: (state, action) => {
      state.loading = true;
    },
    [LogOutUser.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.removeItem("infoUser");
      state.infoUser = "";
    },
    [LogOutUser.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});
export const { changeInfoUser } = UserSlice.actions;
export default UserSlice.reducer;
