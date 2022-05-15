import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";
// import { useDispatch } from 'react-redux';

export const getSetting = createAsyncThunk("setting/getSetting", async (params) => {
  try {
    const response = await Api.get(`setting`, {
      params: params,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
});
export const getSettingClient = createAsyncThunk("setting/getSettingClient", async () => {
  try {
    const response = await Api.get(`get-setting-client`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
});
export const addSetting = createAsyncThunk(
  "setting/addSetting",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Api.post("setting", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.messages);
    }
  }
);
export const updateSetting = createAsyncThunk(
  "setting/updatesetting",
  async (data, { rejectWithValue }) => {
    const id = data.id;
    const reqData = data.payload;
    try {
      const response = await Api.put(`setting/${id}`, reqData);

      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.messages);
    }
  }
);
export const deleteSetting = createAsyncThunk(
  "setting/deleteSetting",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Api.delete(`setting/${id}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const settingSlice = createSlice({
  name: "setting",
  initialState: {
    items: [],
    listSettingClient: [],
    meta: {
      current_page: 0,
      per_page: 10,
      total: 0,
    },
    loading: false,
  },
  extraReducers: {
    [getSetting.pending]: (state, action) => {
      state.loading = true;
    },
    [getSetting.fulfilled]: (state, action) => {
      const { data, current_page, per_page, total } = action.payload;
      state.items = data;
      state.loading = false;
      state.meta = {
        current_page: current_page,
        per_page: per_page,
        total: total,
      };
    },
    [getSetting.rejected]: (state, action) => {
      state.loading = false;
    },
    [getSettingClient.pending]: (state, action) => {
      state.loading = true;
    },
    [getSettingClient.fulfilled]: (state, action) => {
      state.listSettingClient = action.payload;
      state.loading = false;
    },
    [getSettingClient.rejected]: (state, action) => {
      state.loading = false;
    },
    [deleteSetting.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteSetting.fulfilled]: (state, action) => {
      if (action.payload.data === true) {
        state.items = state.items.filter((setting) => setting.id !== action.meta.arg);
      }
      state.loading = false;
    },
    [deleteSetting.rejected]: (state, action) => {
      state.loading = false;
    },
    [addSetting.pending]: (state, action) => {
      state.loading = true;
    },
    [addSetting.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [addSetting.rejected]: (state, action) => {
      state.loading = false;
    },
    [updateSetting.pending]: (state, action) => {
      state.loading = true;
    },
    [updateSetting.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateSetting.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default settingSlice.reducer;
