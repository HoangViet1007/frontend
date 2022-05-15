import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { Api } from "../../../utils/Api";
export const getCourses = createAsyncThunk(
  "courses/getcourses",
  async (params, { rejectWithValue }) => {
    try {
      const response = await Api.get(`course/pt`, {
        params: params,
      });
      return response;
    } catch (error) {
      if (error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        const errors = error.response.data.messages;
        for (const [key, value] of Object.entries(errors)) {
          return rejectWithValue(value);
        }
      }
    }
  }
);

export const getCoursesID = createAsyncThunk(
  "courses/getcoursesid",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Api.get(`course/pt/${id}`);
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      if (error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        const errors = error.response.data.messages;
        for (const [key, value] of Object.entries(errors)) {
          return rejectWithValue(value);
        }
      }
    }
  }
);

export const addCourses = createAsyncThunk(
  "courses/addcourses",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Api.post("course", data);
      return response?.data;
    } catch (error) {
      if (error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        const errors = error.response.data.messages;
        for (const [key, value] of Object.entries(errors)) {
          return rejectWithValue(value);
        }
      }
    }
  }
);
export const updateCourses = createAsyncThunk(
  "courses/updatecourses",
  async (data, { rejectWithValue }) => {
    const id = data?.id;
    const reqData = data?.payload;
    try {
      const response = await Api.put(`course/${id}`, reqData);
      return response.data;
    } catch (error) {
      if (error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        if (error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          const errors = error.response.data.messages;
          for (const [key, value] of Object.entries(errors)) {
            return rejectWithValue(value);
          }
        }
      }
    }
  }
);
export const deleteCourses = createAsyncThunk(
  "courses/deletecourses",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Api.delete(`course/${id}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const sendRequest = createAsyncThunk(
  "courses/sendRequest",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Api.get(`request-course/${id}`);
      return response?.data;
    } catch (error) {
      if (error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        const errors = error.response.data.messages;
        for (const [key, value] of Object.entries(errors)) {
          return rejectWithValue(value);
        }
      }
    }
  }
);

export const cancelRequest = createAsyncThunk(
  "courses/cancelRequest",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Api.get(`cancel-request-course/${id}`);
      return response?.data;
    } catch (error) {
      if (error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        const errors = error.response.data.messages;
        for (const [key, value] of Object.entries(errors)) {
          return rejectWithValue(value);
        }
      }
    }
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    items: [],
    item: null,
    meta: {
      current_page: 0,
      per_page: 10,
      total: 0,
    },
    loading: false,
  },
  extraReducers: {
    [getCourses.pending]: (state, action) => {
      state.loading = true;
    },
    [getCourses.fulfilled]: (state, action) => {
      const { data, current_page, per_page, total } = action?.payload;
      state.items = data;
      state.loading = false;
      state.meta = {
        current_page: current_page,
        per_page: per_page,
        total: total,
      };
    },
    [getCourses.rejected]: (state, action) => {
      state.loading = false;
    },

    [getCoursesID.pending]: (state, action) => {
      state.loading = true;
    },
    [getCoursesID.fulfilled]: (state, action) => {
      const data = action.payload;
      state.item = data;
      state.loading = false;
    },
    [getCoursesID.rejected]: (state, action) => {
      state.loading = false;
    },

    [sendRequest.pending]: (state, action) => {
      state.loading = true;
    },
    [sendRequest.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [sendRequest.rejected]: (state, action) => {
      state.loading = false;
    },

    [deleteCourses.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteCourses.fulfilled]: (state, action) => {
      if (action?.payload?.data === true) {
        state.items = state.items.filter((item) => item.id !== action.meta.arg);
      }
      state.loading = false;
    },
    [deleteCourses.rejected]: (state, action) => {
      state.loading = false;
    },
    [addCourses.pending]: (state, action) => {
      state.loading = true;
    },
    [addCourses.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [addCourses.rejected]: (state, action) => {
      state.loading = false;
    },
    [updateCourses.pending]: (state, action) => {
      state.loading = true;
    },
    [updateCourses.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateCourses.rejected]: (state, action) => {
      state.loading = false;
    },
    [cancelRequest.pending]: (state, action) => {
      state.loading = true;
    },
    [cancelRequest.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [cancelRequest.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default coursesSlice.reducer;
