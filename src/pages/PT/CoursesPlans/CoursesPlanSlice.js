import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

import { notification } from "antd";
import { Api } from "../../../utils/Api";

export const getPlan = createAsyncThunk("plans/getPlan", async (id_stage) => {
  try {
    const response = await Api.get(`course_planes-of-stage/${id_stage}`);
    if (response?.status === 200 && response?.data[0]?.course_planes) {
      return response?.data[0]?.course_planes || "lỗi";
    }
  } catch (error) {
    return error;
  }
});

export const getPlanDetail = createAsyncThunk(
  "plans/getPlanDetail",
  async (id_course_plan, { rejectWithValue }) => {
    try {
      const response = await Api.get(`detail-course_planes/${id_course_plan}`);
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

export const addPlan = createAsyncThunk(
  "plans/addPlan",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Api.post("course_planes", data);
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

export const updatePlan = createAsyncThunk(
  "plans/updatePlan",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Api.post(
        `course_planes/${data.id}?_method=PUT`,
        data
      );
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

export const deletePlan = createAsyncThunk(
  "plans/deletePlan",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Api.delete(`course_planes/${id}`);
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

const PlansSlice = createSlice({
  name: "plans",
  initialState: {
    items: [],
    item: null,
    // meta: {
    //   current_page: 0,
    //   per_page: 10,
    //   total: 0,
    // },
    loading: false,
  },
  extraReducers: {
    [getPlan.pending]: (state, action) => {
      state.loading = true;
    },
    [getPlan.fulfilled]: (state, action) => {
      // const { data, current_page, per_page, total } = action.payload;
      const data = action.payload;
      state.items = data;
      state.loading = false;
      // state.meta = {
      //   current_page: current_page,
      //   per_page: per_page,
      //   total: total,
      // };
    },
    [getPlan.rejected]: (state, action) => {
      state.loading = false;
    },

    [getPlanDetail.pending]: (state, action) => {
      state.loading = true;
    },
    [getPlanDetail.fulfilled]: (state, action) => {
      // const { data, current_page, per_page, total } = action.payload;
      const data = action.payload;
      state.item = data;
      state.loading = false;
      // state.meta = {
      //   current_page: current_page,
      //   per_page: per_page,
      //   total: total,
      // };
    },
    [getPlanDetail.rejected]: (state, action) => {
      state.loading = false;
    },

    [deletePlan.pending]: (state, action) => {
      state.loading = true;
    },
    [deletePlan.fulfilled]: (state, action) => {
      if (action?.payload?.data === true) {
        notification.success({ message: `Xóa buổi học thành công` });
        state.items = state?.items?.filter(
          (item) => item.id !== action?.meta?.arg
        );
      } else {
        notification.error({ message: `${action.payload}` });
      }
      state.loading = false;
    },
    [deletePlan.rejected]: (state, action) => {
      state.loading = false;
    },
    [addPlan.pending]: (state, action) => {
      state.loading = true;
    },
    [addPlan.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [addPlan.rejected]: (state, action) => {
      state.loading = false;
    },
    [updatePlan.pending]: (state, action) => {
      state.loading = true;
    },
    [updatePlan.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updatePlan.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default PlansSlice.reducer;
