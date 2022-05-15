import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";

export const getStudents = createAsyncThunk(
  "studentManager/get",
  async (params) => {
    try {
      const response = await Api.get(
        `course_student?order_by=course_students.id asc`,
        {
          params: params,
        }
      );
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getStudentsByStatus = createAsyncThunk(
  "studentManager/getByStatus",
  async (status) => {
    try {
      const response = await Api.get(
        `course_student?course_students__status__eq=${status}`
      );
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return error;
    }
  }
);

export const cancelStudents = createAsyncThunk(
  "studentManager/cancel",
  async (id, value) => {
    try {
      const response = await Api.post(`pt-cancel/${id}`, value);
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return error;
    }
  }
);
export const sendAdminThrough = createAsyncThunk(
  "students/sendAdminThrough",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Api.put(`send-admin-through/${id}`);
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
export const ptThrough = createAsyncThunk(
  "students/ptThrough",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Api.put(`pt-through/${id}`);
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
const studentsSlice = createSlice({
  name: "students",
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
    [getStudents.pending]: (state, action) => {
      state.loading = true;
    },
    [getStudents.fulfilled]: (state, action) => {
      const { data, current_page, per_page, total } = action.payload;
      state.items = data;
      state.loading = false;
      state.meta = {
        current_page: current_page,
        per_page: per_page,
        total: total,
      };
    },
    [getStudents.rejected]: (state, action) => {
      state.loading = false;
    },

    [cancelStudents.pending]: (state, action) => {
      state.loading = true;
    },
    [cancelStudents.fulfilled]: (state, action) => {
      const data = action.payload;
      state.item = data;
      state.loading = false;
    },
    [cancelStudents.rejected]: (state, action) => {
      state.loading = false;
    },
    [sendAdminThrough.pending]: (state) => {
      state.loading = true;
    },
    [sendAdminThrough.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [sendAdminThrough.rejected]: (state) => {
      state.loading = false;
    },
    [ptThrough.pending]: (state) => {
      state.loading = true;
    },
    [ptThrough.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [ptThrough.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default studentsSlice.reducer;
