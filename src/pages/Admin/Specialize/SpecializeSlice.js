import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";
import { notification } from "antd";

export const getAllSpecialize = createAsyncThunk("specialize/select-option", async () => {
  try {
    const response = await Api.get(`specialize-select-option`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
});

export const getSpecialize = createAsyncThunk("specialize/getspecialize", async (params) => {
  try {
    const response = await Api.get(`specialize`, {
      params: params,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
});

export const addSpecialize = createAsyncThunk(
  "specialize/addspecialize",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Api.post("specialize", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.messages);
    }
  }
);
export const updateSpecialize = createAsyncThunk(
  "specialize/updatespecialize",
  async (data, { rejectWithValue }) => {
    const id = data.id;
    const reqData = data.payload;
    try {
      const response = await Api.put(`specialize/${id}`, reqData);

      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data.messages);
    }
  }
);
export const deleteSpecialize = createAsyncThunk(
  "specialize/deletespecialize",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Api.delete(`specialize/${id}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const specializeSlice = createSlice({
  name: "specialize",
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
    [getAllSpecialize.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllSpecialize.fulfilled]: (state, action) => {
      const data = action.payload;
      state.items = data;
      state.loading = false;
    },
    [getAllSpecialize.rejected]: (state, action) => {
      state.loading = false;
    },
    [getSpecialize.pending]: (state, action) => {
      state.loading = true;
    },
    [getSpecialize.fulfilled]: (state, action) => {
      const { data, current_page, per_page, total } = action.payload;
      state.items = data;
      state.loading = false;
      state.meta = {
        current_page: current_page,
        per_page: per_page,
        total: total,
      };
    },
    [getSpecialize.rejected]: (state, action) => {
      state.loading = false;
    },
    [deleteSpecialize.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteSpecialize.fulfilled]: (state, action) => {
      if (action.payload.data === true) {
        notification.success({ message: `Xóa dữ liệu thành công` });
        state.items = state.items.filter((specialize) => specialize.id !== action.meta.arg);
      } else {
        notification.error({ message: `Xóa không thành công` });
      }

      state.loading = false;
    },
    [deleteSpecialize.rejected]: (state, action) => {
      state.loading = false;
    },
    [addSpecialize.pending]: (state, action) => {
      state.loading = true;
    },
    [addSpecialize.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [addSpecialize.rejected]: (state, action) => {
      state.loading = false;
    },
    [updateSpecialize.pending]: (state, action) => {
      state.loading = true;
    },
    [updateSpecialize.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateSpecialize.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default specializeSlice.reducer;
