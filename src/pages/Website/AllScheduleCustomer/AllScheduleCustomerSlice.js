import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";
export const getEventsCustomer = createAsyncThunk(
  "AllscheduleCustomer/getEventsCustomer",
  async (date) => {
    try {
      const response = await Api.get(
        `get-calender-work-customer${date ? `?date=${date}` : ""}`
      );
      if (response?.status === 200) {
        return response.data;
      }
    } catch (error) {
      return error;
    }
  }
);
export const ChangeJoin = createAsyncThunk(
  "AllscheduleCustomer/ChangeJoin",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Api.put(`engaged/${id}`);
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
export const ChangeNoJoin = createAsyncThunk(
  "AllscheduleCustomer/ChangeNoJoin",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Api.put(`not-engaged/${id}`);
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
export const setComplanin = createAsyncThunk(
  "AllscheduleCustomer/setComplanin",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await Api.put(`complanin/${id}`, data);
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

const AllscheduleCustomerSlice = createSlice({
  name: "AllscheduleCustomer",
  initialState: {
    events: [],
    loading: false,
    event: {},
    loadingJoin: false,
    loadingNoJoin: false,
    loadingComplanin: false,
  },
  reducers: {
    setInfoEventClick: (state, action) => {
      state.event = action.payload;
    },
  },
  extraReducers: {
    [getEventsCustomer.pending]: (state) => {
      state.loading = true;
    },
    [getEventsCustomer.fulfilled]: (state, action) => {
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
    [getEventsCustomer.rejected]: (state) => {
      state.loading = false;
    },
    [ChangeJoin.pending]: (state) => {
      state.loadingJoin = true;
    },
    [ChangeJoin.fulfilled]: (state, action) => {
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
      state.loadingJoin = false;
    },
    [ChangeJoin.rejected]: (state) => {
      state.loadingJoin = false;
    },
    [ChangeNoJoin.pending]: (state) => {
      state.loadingNoJoin = true;
    },
    [ChangeNoJoin.fulfilled]: (state, action) => {
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
      state.loadingNoJoin = false;
    },
    [ChangeNoJoin.rejected]: (state) => {
      state.loadingNoJoin = false;
    },
    [setComplanin.pending]: (state) => {
      state.loadingComplanin = true;
    },
    [setComplanin.fulfilled]: (state, action) => {
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
      state.loadingComplanin = false;
    },
    [setComplanin.rejected]: (state) => {
      state.loadingComplanin = false;
    },
  },
});
export const { setInfoEventClick } = AllscheduleCustomerSlice.actions;
export default AllscheduleCustomerSlice.reducer;
