import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api, ApiFormData } from "../../../utils/Api";

export const getPermissionId = createAsyncThunk("Permission/getPermissionId", async (id) => {
  try {
    const response = await Api.get(`permission/${id}`);
    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    return error;
  }
});

export const importPermission = createAsyncThunk(
  "Permission/importPermission",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Api.post("permission-import", data);
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllPermission = createAsyncThunk("Permission/getAllPermission", async (params) => {
  try {
    const response = await Api.get(`get-all-permission`, {
      params: params,
    });
    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    return error;
  }
});
export const addPermission = createAsyncThunk(
  "Permission/addPermission",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Api.post("permission", data);
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.messages);
    }
  }
);
export const updatePermission = createAsyncThunk(
  "Permission/updatePermission",
  async (data, { rejectWithValue }) => {
    const id = data?.id;
    const reqData = data?.payload;
    try {
      const response = await Api.put(`permission/${id}`, reqData);

      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data.messages);
    }
  }
);
export const deletePermission = createAsyncThunk(
  "Permission/deletePermission",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Api.delete(`permission/${id}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const PermissionSilce = createSlice({
  name: "Permission",
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
    [getPermissionId.pending]: (state, action) => {
      state.loading = true;
    },
    [getPermissionId.fulfilled]: (state, action) => {
      state.loading = false;
      state.item = action?.payload;
    },
    [getPermissionId.rejected]: (state, action) => {
      state.loading = false;
    },
    [importPermission.pending]: (state, action) => {
      state.loading = true;
    },
    [importPermission.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [importPermission.rejected]: (state, action) => {
      state.loading = false;
    },
    [getAllPermission.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllPermission.fulfilled]: (state, action) => {
      const { data, current_page, per_page, total } = action?.payload;
      state.items = data;
      state.loading = false;
      state.meta = {
        current_page: current_page,
        per_page: per_page,
        total: total,
      };
    },
    [getAllPermission.rejected]: (state, action) => {
      state.loading = false;
    },
    [deletePermission.pending]: (state, action) => {
      state.loading = true;
    },
    [deletePermission.fulfilled]: (state, action) => {
      if (action?.payload?.data === true) {
        state.items = state.items.filter((item) => item.id !== action.meta.arg);
      }
      state.loading = false;
    },
    [deletePermission.rejected]: (state, action) => {
      state.loading = false;
    },
    [addPermission.pending]: (state, action) => {
      state.loading = true;
    },
    [addPermission.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [addPermission.rejected]: (state, action) => {
      state.loading = false;
    },
    [updatePermission.pending]: (state, action) => {
      state.loading = true;
    },
    [updatePermission.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updatePermission.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});
export default PermissionSilce.reducer;
