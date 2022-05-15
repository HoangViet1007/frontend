


import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue
} from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";

export const getListCourses = createAsyncThunk(
  "courses/getlistcourses",
  async (params) => {
    try {
      const response = await Api.get(`list-course`, {
        params: params,
      });
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return error;
    }
  }
);


export const getListCoursesByIdSpecializes = createAsyncThunk(
  "courses/getListCoursesByIdSpecializes",
  async (data) => {
    try {
      const response = await Api.get(`list-course?specializes=${data}`);
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return error;
    }
  }
);

export const getListSpecializations = createAsyncThunk(
  "courses/getlistspecializations",
  async (params) => {
    try {
      const response = await Api.get("list-specialize-for-client", {
        params: params,
      });
      return response?.data;
    } catch (error) {
      return error;
    }
  }
);

export const getListCustomerLevels = createAsyncThunk(
  "courses/getlistcustomerlevel",
  async (params) => {
    try {
      const response = await Api.get(`list-customer-level`, {
        params: params,
      });
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return error;
    }
  }
);

export const getCoursesID = createAsyncThunk(
  "courses/getcoursesid",
  async (id) => {
    try {
      const response = await Api.get(`course/pt/${id}`);
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return error;
    }
  }
);

export const addCourses = createAsyncThunk(
  "courses/addcourses",
  async (data) => {
    try {
      const response = await Api.post("course", data);
      return response?.data;
    } catch (error) {
      return isRejectedWithValue(error.response.messages.config_key);
    }
  }
);

export const updateCourses = createAsyncThunk(
  "courses/updatecourses",
  async (data) => {
    const id = data?.id;
    const reqData = data?.payload;
    try {
      const response = await Api.put(`course/${id}`, reqData);

      return response.data;
    } catch (error) {
      return isRejectedWithValue(error.response.messages.config_key);
    }
  }
);

const ListCoursesSlice = createSlice({
  name: "clientListCourses",
  initialState: {
    items: [],
    specializations: [],
    customerlevels: [],
    item: null,
    meta: {
      current_page: null,
      per_page: null,
      total: null,
    },
    loading: false,
  },
  extraReducers: {
    [getListCourses.pending]: (state, action) => {
      state.loading = true;
    },
    [getListCourses.fulfilled]: (state, action) => {
      const { data, current_page, per_page, total } = action.payload;
      state.items = data;
      state.loading = false;
      state.meta = {
        current_page: current_page,
        per_page: per_page,
        total: total,
      };
    },
    [getListCourses.rejected]: (state, action) => {
      state.loading = false;
    },


    [getListCoursesByIdSpecializes.pending]: (state, action) => {
      state.loading = true;
    },
    [getListCoursesByIdSpecializes.fulfilled]: (state, action) => {
      const { data, current_page, per_page, total } = action?.payload;
      state.items = data;
      state.loading = false;
      state.meta = {
        current_page: current_page,
        per_page: per_page,
        total: total,
      };
    },
    [getListCoursesByIdSpecializes.rejected]: (state, action) => {
      state.loading = false;
    },

    [getListSpecializations.pending]: (state, action) => {
      state.loading = true;
    },
    [getListSpecializations.fulfilled]: (state, action) => {
      const data = action.payload;
      state.specializations = data;
      state.loading = false;
      // state.meta = {
      //   current_page: current_page,
      //   per_page: per_page,
      //   total: total,
      // };
    },
    [getListSpecializations.rejected]: (state, action) => {
      state.loading = false;
    },

    [getListCustomerLevels.pending]: (state, action) => {
      state.loading = true;
    },
    [getListCustomerLevels.fulfilled]: (state, action) => {
      const data = action.payload;
      state.customerlevels = data;
      state.loading = false;
      // state.meta = {
      //   current_page: current_page,
      //   per_page: per_page,
      //   total: total,
      // };
    },
    [getListCustomerLevels.rejected]: (state, action) => {
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
  },
});

export default ListCoursesSlice.reducer;
