import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";
import { notification } from "antd";
export const getContactList = createAsyncThunk(
  "contact/getContact",
  async (params) => {
    try {
      const response = await Api.get(`get-list-contact`, {
        params: params,
      });
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return error;
    }
  }
);

export const sendMail = createAsyncThunk(
  "contact/sendMail",
  async (values, { rejectWithValue }) => {
    try {
      const response = await Api.post(`send-email-contact`, values);
      if (response.status === 200) {
        return response?.data;
      }
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

const ContactSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getContactList.pending]: (state, action) => {
      state.loading = true;
    },
    [getContactList.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action?.payload?.data;
    },
    [getContactList.rejected]: (state, action) => {
      state.loading = false;
    },

    [sendMail.pending]: (state, action) => {
      state.loading = true;
    },
    [sendMail.fulfilled]: (state, action) => {
      state.loading = false;
      notification.success({ message: "Gửi email thành công" });
    },
    [sendMail.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});
export default ContactSlice.reducer;
