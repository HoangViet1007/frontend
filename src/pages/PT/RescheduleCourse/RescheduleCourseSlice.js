import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";
export const getReschedule = createAsyncThunk(
  "RescheduleCourse/getReschedule",
  async (param) => {
    try {
      const response = await Api.get(
        `/list-course-complain${param ? param : ""}`
      );
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return error;
    }
  }
);
const RescheduleCourseSlice = createSlice({
  name: "RescheduleCourse",
  initialState: {
    loading: false,
    listRescheduleCourse: [],
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: {
    [getReschedule.pending]: (state) => {
      state.loading = true;
    },
    [getReschedule.fulfilled]: (state, action) => {
      state.loading = false;
      state.listRescheduleCourse = action.payload;
    },
    [getReschedule.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { setFilters } = RescheduleCourseSlice.actions;
export default RescheduleCourseSlice.reducer;
