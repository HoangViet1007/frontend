import {
  createAsyncThunk, createSlice, isRejectedWithValue
} from "@reduxjs/toolkit";
import { notification } from "antd";
import { Api } from "../../../utils/Api";

export const getCertificates = createAsyncThunk(
  "certificates/getcertificates",
  async (params) => {
    try {
      const response = await Api.get(`certificates`, {
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
export const addCertificates = createAsyncThunk(
  "certificates/addcertificates",
  async (data, { rejectWithValue }) => {
    try {
   
      const response = await Api.post("certificates", data);
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.messages);
    }
  }
);
export const updateCertificates = createAsyncThunk(
  "certificates/updatecertificates",
  async (data) => {
    const id = data?.id;
    const reqData = data?.payload;
    try {
      const response = await Api.put(`certificates/${id}`, reqData);

      return response?.data;
    } catch (error) {
      return isRejectedWithValue(error.response.messages.config_key);
    }
  }
);
export const deleteCertificates = createAsyncThunk(
  "certificates/deletecertificates",
  async (id) => {
    try {
      const response = await Api.delete(`certificates/${id}`);
      return response;
    } catch (error) {
      return error;
    }
  }
);

const certificatesSlice = createSlice({
  name: "certificates",
  initialState: {
    items: [],
    meta: {
      current_page: 0,
      per_page: 10,
      total: 0,
    },
    loading: false,
  },
  extraReducers: {
    [getCertificates.pending]: (state, action) => {
      state.loading = true;
    },
    [getCertificates.fulfilled]: (state, action) => {
      const { data, current_page, per_page, total } = action.payload;
      state.items = data;
      state.loading = false;
      state.meta = {
        current_page: current_page,
        per_page: per_page,
        total: total,
      };
    },
    [getCertificates.rejected]: (state, action) => {
      state.loading = false;
    },
    [deleteCertificates.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteCertificates.fulfilled]: (state, action) => {
      if (action.payload.data === true) {
        notification.success({ message: `Xóa chứng chỉ thành công` });
        state.items = state.items.filter(
          (Certificates) => Certificates.id !== action.meta.arg
        );
      } else {
        notification.error({ message: `Xóa chứng chỉ không thành công` });
      }

      state.loading = false;
    },
    [deleteCertificates.rejected]: (state, action) => {
      state.loading = false;
    },
    [addCertificates.pending]: (state, action) => {
      state.loading = true;
    },
    [addCertificates.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [addCertificates.rejected]: (state, action) => {
      state.loading = false;
    },
    [updateCertificates.pending]: (state, action) => {
      state.loading = true;
    },
    [updateCertificates.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateCertificates.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default certificatesSlice.reducer;
