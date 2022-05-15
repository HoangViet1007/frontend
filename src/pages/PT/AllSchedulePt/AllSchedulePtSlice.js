import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";
export const getEventsPt = createAsyncThunk(
  "AllschedulePt/getEventsPt",
  async (date) => {
    try {
      const response = await Api.get(
        `get-calender-work-pt${date ? `?date=${date}` : ""}`
      );
      if (response?.status === 200) {
        return response.data;
      }
    } catch (error) {
      return error;
    }
  }
);
export const startLesson = createAsyncThunk(
  "AllschedulePt/startLesson",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Api.put(`start-schedule/${id}`);
      if (response?.status === 200) {
        return response.data;
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
export const endLesson = createAsyncThunk(
  "AllschedulePt/endLesson",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await Api.put(`end-schedule/${id}`, data);
      if (response?.status === 200) {
        return response.data;
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
export const addLinkRecord = createAsyncThunk(
  "AllschedulePt/addLinkRecord",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await Api.put(`update-record-schedule/${id}`, data);
      if (response?.status === 200) {
        return response.data;
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
const AllschedulePtSlice = createSlice({
  name: "AllschedulePt",
  initialState: {
    events: [],
    loading: false,
    event: {},
    loadingStart: false,
    loadindEnd: false,
    loadingRecord: false,
  },
  reducers: {
    setInfoEventClick: (state, action) => {
      state.event = action.payload;
    },
  },
  extraReducers: {
    [getEventsPt.pending]: (state) => {
      state.loading = true;
    },
    [getEventsPt.fulfilled]: (state, action) => {
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
    [getEventsPt.rejected]: (state) => {
      state.loading = false;
    },

    [startLesson.pending]: (state) => {
      state.loadingStart = true;
    },
    [startLesson.fulfilled]: (state, action) => {
      const schedule = action.payload;
      const newSchedule = {
        ...schedule,
        newDate: schedule.date,
        start: `${schedule.date}T${schedule.time_start}`,
        end: `${schedule.date}T${schedule.time_end}`,
      };
      state.events = state.events.map((event) => {
        return event?.id === newSchedule.id
          ? { ...event, ...newSchedule }
          : event;
      });
      state.loadingStart = false;
    },
    [startLesson.rejected]: (state) => {
      state.loadingStart = false;
    },
    [endLesson.pending]: (state) => {
      state.loadindEnd = true;
    },
    [endLesson.fulfilled]: (state, action) => {
      const schedule = action.payload;
      const newSchedule = {
        ...schedule,
        newDate: schedule.date,
        start: `${schedule.date}T${schedule.time_start}`,
        end: `${schedule.date}T${schedule.time_end}`,
      };
      state.events = state.events.map((event) => {
        return event?.id === newSchedule.id
          ? { ...event, ...newSchedule }
          : event;
      });
      state.loadindEnd = false;
    },
    [endLesson.rejected]: (state) => {
      state.loadindEnd = false;
    },
    [addLinkRecord.pending]: (state) => {
      state.loadingRecord = true;
    },
    [addLinkRecord.fulfilled]: (state, action) => {
      const schedule = action.payload;
      const newSchedule = {
        ...schedule,
        newDate: schedule.date,
        start: `${schedule.date}T${schedule.time_start}`,
        end: `${schedule.date}T${schedule.time_end}`,
      };
      state.events = state.events.map((event) => {
        return event?.id === newSchedule.id
          ? { ...event, ...newSchedule }
          : event;
      });
      state.loadingRecord = false;
    },
    [addLinkRecord.rejected]: (state) => {
      state.loadingRecord = false;
    },
  },
});
export const { setInfoEventClick } = AllschedulePtSlice.actions;
export default AllschedulePtSlice.reducer;
