import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";

export const getUserId = createAsyncThunk("user/getUserId", async (id) => {
  try {
    const response = await Api.get(`user/${id}`);
    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    return error;
  }
});

export const getUser = createAsyncThunk("user/getUser", async (params, { rejectWithValue}) => {
  try {
    const response = await Api.get(`user`, {
      params: params,
    });
    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const addUser = createAsyncThunk(
  "user/addUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Api.post("user", data);
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data, { rejectWithValue }) => {
    const id = data?.id;
    const reqData = data?.payload;
    try {
      const response = await Api.put(`user/${id}`, reqData);

      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Api.delete(`user/${id}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const UserAdminSilce = createSlice({
  name: "user",
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
    [getUserId.pending]: (state, action) => {
      state.loading = true;
    },
    [getUserId.fulfilled]: (state, action) => {
      state.loading = false;
      state.item = action?.payload;
    },
    [getUserId.rejected]: (state, action) => {
      state.loading = false;
    },
    [getUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      const { data, current_page, per_page, total } = action?.payload;
      state.items = data;
      state.loading = false;
      state.meta = {
        current_page: current_page,
        per_page: per_page,
        total: total,
      };
    },
    [getUser.rejected]: (state, action) => {
      state.loading = false;
    },
    [deleteUser.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      if (action?.payload?.data === true) {
        state.items = state.items.filter((item) => item.id !== action.meta.arg);
      }
      state.loading = false;
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
    },
    [addUser.pending]: (state, action) => {
      state.loading = true;
    },
    [addUser.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [addUser.rejected]: (state, action) => {
      state.loading = false;
    },
    [updateUser.pending]: (state, action) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});
export const { setFilters, removeFilters } = UserAdminSilce.actions;
export default UserAdminSilce.reducer;
