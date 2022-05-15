import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";

export const calculateBMI = createAsyncThunk(
  "HomeSlice/calculateBMI",
  async (data) => {
    try {
      const response = await Api.post("BMI", data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const getDataHome = createAsyncThunk(
  "HomeSlice/getCoursesFeatured",
  async () => {
    try {
      const response = await Api.get("/trang-chu");
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return error;
    }
  }
);
export const sendMessage = createAsyncThunk(
  "HomeSlice/sendMessage",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Api.post("/contact", data);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (error.response.data.messages) {
        return rejectWithValue(error.response.data.messages);
      }
      if (error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
    }
  }
);
const HomeSlice = createSlice({
  name: "HomeSlice",
  initialState: {
    loading: false,
    loadingSend: false,
    resultBMI: { result: 0, comment: "" },
    listCourse: [],
    listPt: [],
  },
  extraReducers: {
    [calculateBMI.pending]: (state) => {
      state.loading = true;
    },
    [calculateBMI.fulfilled]: (state, action) => {
      state.loading = false;
      state.resultBMI.result = action.payload.BMI;
      state.resultBMI.comment = action.payload.message;
    },
    [calculateBMI.rejected]: (state) => {
      state.loading = false;
    },
    [getDataHome.pending]: (state) => {
      state.loading = true;
    },
    [getDataHome.fulfilled]: (state, action) => {
      state.loading = false;
      state.listCourse = action?.payload?.get_course;
      state.listPt = action?.payload?.get_pt;
    },
    [getDataHome.rejected]: (state) => {
      state.loading = false;
    },
    [sendMessage.pending]: (state) => {
      state.loadingSend = true;
    },
    [sendMessage.fulfilled]: (state) => {
      state.loadingSend = false;
    },
    [sendMessage.rejected]: (state) => {
      state.loadingSend = false;
    },
  },
});
export default HomeSlice.reducer;
