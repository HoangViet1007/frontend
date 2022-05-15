 
 
 
 
 
 
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";
export const getComplain = createAsyncThunk(
  "admin/listComplain",
  async (params) => {
    try {
      const response = await Api.get(`list-complain`, {
        params: params,
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return error;
    }
  }
);
export const updateComplain = createAsyncThunk(
  "user/updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Api.put(`change-complain`, data);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data.messages);
    }
  }
);
const ComplainSilce = createSlice({
  name: "user",
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
    [getComplain.pending]: (state, action) => {
      state.loading = true;
    },
    [getComplain.fulfilled]: (state, action) => {
      const { data, current_page, per_page, total } = action?.payload;
      state.items = data;
      state.loading = false;
      state.meta = {
        current_page: current_page,
        per_page: per_page,
        total: total,
      };
    },
    [getComplain.rejected]: (state, action) => {
      state.loading = false;
    },
    [updateComplain.pending]: (state, action) => {
      state.loading = true;
    },
    [updateComplain.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateComplain.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default ComplainSilce.reducer;
