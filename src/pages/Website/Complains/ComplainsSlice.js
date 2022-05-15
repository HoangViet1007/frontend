import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";
export const getComplains = createAsyncThunk(
  "Complains/getComplains",
  async (param) => {
    try {
      const response = await Api.get(
        `/get-complain-for-customer${param ? param : ""}`
      );
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return error;
    }
  }
);
export const ChangeComplains = createAsyncThunk(
  "Complains/ChangeComplains",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Api.put(`/cancel-complain/${id}`);
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      if (error?.response?.data.messages) {
        return rejectWithValue(error?.response?.data.messages);
      }
      if (error?.response?.data.message) {
        return rejectWithValue(error?.response?.data.message);
      }
    }
  }
);
const ComplainsSlice = createSlice({
  name: "Complains",
  initialState: {
    loading: false,
    loadingCalcel: false,
    Complains: [],
    filters: {},
    pagination: {
      total: "",
      current_page: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setComplains: (state, action) => {
      state.Complains = state.Complains.filter(
        (complain) => complain.id !== action.payload
      );
    },
  },
  extraReducers: {
    [getComplains.pending]: (state) => {
      state.loading = true;
    },
    [getComplains.fulfilled]: (state, action) => {
      state.loading = false;
      state.Complains = action.payload?.data;
      state.pagination.total = action.payload?.total;
      state.pagination.current_page = action.payload?.current_page;
    },
    [getComplains.rejected]: (state) => {
      state.loading = false;
    },
    [ChangeComplains.pending]: (state) => {
      state.loadingCalcel = true;
    },
    [ChangeComplains.fulfilled]: (state) => {
      state.loadingCalcel = false;
    },
    [ChangeComplains.rejected]: (state) => {
      state.loadingCalcel = false;
    },
  },
});
export const { setFilters, setComplains } = ComplainsSlice.actions;
export default ComplainsSlice.reducer;
