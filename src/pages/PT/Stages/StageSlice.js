import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import { Api } from "../../../utils/Api";

export const getStages = createAsyncThunk(
  "stage/getStages",
  async ({ id, params }, { rejectWithValue }) => {
    try {
      const response = await Api.get(`/stage-of-course/${id}?order_by=id asc`, {
        params: params,
      });
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.messages);
    }
  }
);
export const getStageById = createAsyncThunk(
  "stage/getStageById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Api.get(`/detail-stage/${id}`);
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.messages);
    }
  }
);
export const addStage = createAsyncThunk(
  "stage/addStage",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Api.post("/stage", data);
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.messages);
    }
  }
);
export const editStage = createAsyncThunk(
  "stage/editStage",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Api.put(`/stage/${data.idStage}`, data.newData);
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.messages);
    }
  }
);
export const removeStage = createAsyncThunk(
  "stage/removeStage",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Api.delete(`/stage/${id}`);
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
const StagesSlice = createSlice({
  name: "Stages",
  initialState: {
    loading: false,
    items: [],
    errors: false,
    meta: {
      current_page: 0,
      per_page: 10,
      total: 0,
    },
    item: "",
  },
  extraReducers: {
    [getStages.pending]: (state) => {
      state.loading = true;
    },
    [getStages.fulfilled]: (state, action) => {
      const { data, current_page, per_page, total } = action.payload;
      state.loading = false;
      state.items = data;
      state.meta = {
        current_page: current_page,
        per_page: per_page,
        total: total,
      };
    },
    [getStages.rejected]: (state) => {
      state.loading = false;
    },
    [getStageById.pending]: (state) => {
      state.loading = true;
    },
    [getStageById.fulfilled]: (state, action) => {
      state.loading = false;
      state.item = action.payload;
    },
    [getStageById.rejected]: (state) => {
      state.loading = false;
    },
    [addStage.pending]: (state) => {
      state.loading = true;
    },
    [addStage.fulfilled]: (state) => {
      state.loading = false;
    },
    [addStage.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [editStage.pending]: (state) => {
      state.loading = true;
    },
    [editStage.fulfilled]: (state) => {
      state.loading = false;
    },
    [editStage.rejected]: (state) => {
      state.loading = false;
    },
    [removeStage.pending]: (state) => {
      state.loading = true;
    },
    [removeStage.fulfilled]: (state, action) => {
      if (action.payload.data === true) {
        state.loading = false;
        state.items = state.items.filter(
          (stage) => stage.id !== action.meta.arg
        );
        notification.success({ message: `Xóa giai đoạn thành công` });
      }
    },
    [removeStage.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});
export default StagesSlice.reducer;
