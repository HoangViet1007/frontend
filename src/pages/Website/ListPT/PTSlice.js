import {
  createAsyncThunk,
  createSlice
} from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";

export const getListPT = createAsyncThunk(
  "list_pt/getListPT",
  async (params) => {
    try {
      const response = await Api.get(`get-list-pt-client`, {
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

const PTSlice = createSlice({
  name: "pt",
  initialState: {
    items: [],
    meta: {
      current_page: null,
      per_page: null,
      total: null,
    },
    loading: false,
  },
  extraReducers: {
    [getListPT.pending]: (state, action) => {
      state.loading = true;
    },
    [getListPT.fulfilled]: (state, action) => {
      const { data, current_page, per_page, total } = action.payload;
      state.items = data;
      state.loading = false;
      state.meta = {
        current_page: current_page,
        per_page: per_page,
        total: total,
      };
    },
    [getListPT.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default PTSlice.reducer;
