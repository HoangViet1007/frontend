import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";

export const getAccountLevel = createAsyncThunk("accountlevel/getaccountlevel", async (params) => {
  try {
    const response = await Api.get(`account-level`, {
      params: params,
    });
    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    return error;
  }
});
export const addAccountLevel = createAsyncThunk(
  "AccountLevel/addAccountLevel",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Api.post("account-level", data);
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.messages);
    }
  }
);
export const updateAccountLevel = createAsyncThunk(
  "AccountLevel/updateAccountLevel",
  async (data, { rejectWithValue }) => {
    const id = data?.id;
    const reqData = data?.payload;
    try {
      const response = await Api.put(`account-level/${id}`, reqData);

      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data.messages);
    }
  }
);
export const deleteAccountLevel = createAsyncThunk(
  "AccountLevel/deleteAccountLevel",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Api.delete(`account-level/${id}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
const AccountLevelSilce = createSlice({
  name: "accountlevel",
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
    [getAccountLevel.pending]: (state, action) => {
      state.loading = true;
    },
    [getAccountLevel.fulfilled]: (state, action) => {
      const { data, current_page, per_page, total } = action?.payload;
      state.items = data;
      state.loading = false;
      state.meta = {
        current_page: current_page,
        per_page: per_page,
        total: total,
      };
    },
    [getAccountLevel.rejected]: (state, action) => {
      state.loading = false;
    },
    [deleteAccountLevel.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteAccountLevel.fulfilled]: (state, action) => {
      if (action?.payload?.data === true) {
        state.items = state.items.filter((item) => item.id !== action.meta.arg);
      }
      state.loading = false;
    },
    [deleteAccountLevel.rejected]: (state, action) => {
      state.loading = false;
    },
    [addAccountLevel.pending]: (state, action) => {
      state.loading = true;
    },
    [addAccountLevel.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [addAccountLevel.rejected]: (state, action) => {
      state.loading = false;
    },
    [updateAccountLevel.pending]: (state, action) => {
      state.loading = true;
    },
    [updateAccountLevel.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateAccountLevel.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default AccountLevelSilce.reducer;
