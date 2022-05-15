import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";
import { message } from "antd";

export const getRoleId = createAsyncThunk("Role/getRoleId", async (id) => {
  try {
    const response = await Api.get(`role/${id}`);
    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    return error;
  }
});

export const getRole = createAsyncThunk("Role/getRole", async (params) => {
  try {
    const response = await Api.get(`role`, {
      params: params,
    });
    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    return error;
  }
});
export const addRole = createAsyncThunk("Role/addRole", async (data, { rejectWithValue }) => {
  try {
    const response = await Api.post("role", data);
    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    return rejectWithValue(error.response.data.messages);
  }
});
export const updateRole = createAsyncThunk("Role/updateRole", async (data, { rejectWithValue }) => {
  const id = data?.id;
  const reqData = data?.payload;
  try {
    const response = await Api.put(`role/${id}`, reqData);

    return response?.data;
  } catch (error) {
    return rejectWithValue(error.response.data.messages);
  }
});
export const deleteRole = createAsyncThunk("Role/deleteRole", async (id, { rejectWithValue }) => {
  try {
    const response = await Api.delete(`role/${id}`);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

const RoleSilce = createSlice({
  name: "Role",
  initialState: {
    item: {},
    items: [],
    meta: {
      current_page: 0,
      per_page: 10,
      total: 0,
    },
    loading: false,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    removeFilters: (state) => {
      state.filters = {};
    },
  },
  extraReducers: {
    [getRoleId.pending]: (state, action) => {
      state.loading = true;
    },
    [getRoleId.fulfilled]: (state, action) => {
      state.loading = false;
      state.item = action?.payload;
    },
    [getRoleId.rejected]: (state, action) => {
      state.loading = false;
    },
    [getRole.pending]: (state, action) => {
      state.loading = true;
    },
    [getRole.fulfilled]: (state, action) => {
      const { data, current_page, per_page, total } = action?.payload;
      state.items = data;
      state.loading = false;
      state.meta = {
        current_page: current_page,
        per_page: per_page,
        total: total,
      };
    },
    [getRole.rejected]: (state, action) => {
      state.loading = false;
    },
    [deleteRole.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteRole.fulfilled]: (state, action) => {
      if (action?.payload?.data === true) {
        state.items = state.items.filter((item) => item.id !== action.meta.arg);
      }
      state.loading = false;
    },
    [deleteRole.rejected]: (state, action) => {
      state.loading = false;
    },
    [addRole.pending]: (state, action) => {
      state.loading = true;
    },
    [addRole.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [addRole.rejected]: (state, action) => {
      state.loading = false;
    },
    [updateRole.pending]: (state, action) => {
      state.loading = true;
    },
    [updateRole.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateRole.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});
export const { setFilters, removeFilters } = RoleSilce.actions;
export default RoleSilce.reducer;
