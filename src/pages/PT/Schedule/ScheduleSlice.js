import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";

export const getSchedule = createAsyncThunk(
  "schedulePt/getSchedule",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Api.get(`/get-schedule-by-course-student/${id}`);
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.messages);
    }
  }
);
export const getCoursePlan = createAsyncThunk(
  "schedulePt/getCoursePlan",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Api.get(`/get-course-plan-off-by-course/${id}`);
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data.messages);
    }
  }
);
export const createSchedule = createAsyncThunk(
  "schedulePt/createSchedule",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Api.post("/schedule", data);
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
export const removeSchedule = createAsyncThunk(
  "schedulePt/removeSchedule",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Api.delete(`/schedule/${id}`);
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
export const editSchedule = createAsyncThunk(
  "schedulePt/editSchedule",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await Api.put(`/schedule/${id}`, data);
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

const SchedulePtSlice = createSlice({
  name: "schedulePt",
  initialState: {
    schedules: [],
    loadingdata: false,
    loading: false,
    CoursePlans: [],
    eventDetail: {},
  },
  reducers: {
    getDetailEvent: (state, action) => {
      state.eventDetail = action?.payload;
    },
    removeDetailEvent: (state, action) => {
      state.schedules = state.schedules.filter(
        (event) => event.id !== +action?.payload
      );
    },
  },
  extraReducers: {
    [getSchedule.pending]: (state) => {
      state.loadingdata = true;
    },
    [getSchedule.fulfilled]: (state, action) => {
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
        state.schedules = newSchedules;
      } else {
        state.schedules = action?.payload;
      }
      state.loadingdata = false;
    },
    [getSchedule.rejected]: (state) => {
      state.loadingdata = false;
    },
    [getCoursePlan.pending]: (state) => {
      state.loading = true;
    },
    [getCoursePlan.fulfilled]: (state, action) => {
      state.CoursePlans = action?.payload;
      state.loading = false;
    },
    [getCoursePlan.rejected]: (state) => {
      state.loading = false;
    },
    [createSchedule.pending]: (state) => {
      state.loading = true;
    },
    [createSchedule.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [createSchedule.rejected]: (state) => {
      state.loading = false;
    },
    [removeSchedule.pending]: (state) => {
      state.loading = true;
    },
    [removeSchedule.fulfilled]: (state, action) => {
      // state.CoursePlans = action?.payload;
      state.loading = false;
    },
    [removeSchedule.rejected]: (state) => {
      state.loading = false;
    },
    [editSchedule.pending]: (state) => {
      state.loading = true;
    },
    [editSchedule.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [editSchedule.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { getDetailEvent, removeDetailEvent } = SchedulePtSlice.actions;
export default SchedulePtSlice.reducer;
