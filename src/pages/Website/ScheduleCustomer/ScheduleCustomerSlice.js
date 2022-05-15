import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";

export const getCalenderEvents = createAsyncThunk(
  "scheduleCustom/getCalenderEvents",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Api.get(`get-schedule-by-customer/${id}`);
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
const ScheduleCustomSlice = createSlice({
  name: "scheduleCustom",
  initialState: {
    loading: false,
    events: [],
  },
  extraReducers: {
    [getCalenderEvents.pending]: (state) => {
      state.loading = true;
    },
    [getCalenderEvents.fulfilled]: (state, action) => {
      if (action?.payload && action?.payload.length > 0) {
        const newSchedules = action?.payload.map((schedule) => {
          return {
            ...schedule,
            newDate: schedule.date,
            start: `${schedule.date}T${schedule.time_start}`,
            end: `${schedule.date}T${schedule.time_end}`,
            color: schedule.status === "unfinished" ? "green" : "orange",
          };
        });
        state.events = newSchedules;
      } else {
        state.events = action?.payload;
      }
      state.loading = false;
    },
    [getCalenderEvents.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export default ScheduleCustomSlice.reducer;
