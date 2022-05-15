import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";

// CertificatesBySpecialize
export const getCertificatesBySpecialize = createAsyncThunk(
  "specializedetailpt/getcertificatesbyspecialize",
  async (id) => {
    try {
      const response = await Api.get(`get-list-certificates-specialize/${id}`);
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return error;
    }
  }
);
export const addCertificatesBySpecialize = createAsyncThunk(
  "specializedetailpt/addcertificatesbyspecialize",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Api.post("certificates", data);
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.messages);
    }
  }
);
export const updateCertificatesBySpecialize = createAsyncThunk(
  "specializedetailpt/updatecertificatesbyspecialize",
  async (data, { rejectWithValue }) => {
    const id = data?.id;
    const reqData = data?.payload;
    try {
      const response = await Api.put(`certificates/${id}`, reqData);

      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data.messages);
    }
  }
);
export const deleteCertificatesBySpecialize = createAsyncThunk(
  "specializedetailpt/deletecertificatesbyspecialize",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Api.delete(`certificates/${id}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// SpecializeDetailPt
export const getSpecializeDetailPt = createAsyncThunk(
  "specializedetailpt/getspecializedetailpt",
  async (params) => {
    try {
      const response = await Api.get(`specialize-detail/pt`, {
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
export const addSpecializeDetailPt = createAsyncThunk(
  "specializedetailpt/addspecializedetailpt",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Api.post("specialize-detail", data);
      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.messages);
    }
  }
);
export const updateSpecializeDetailPt = createAsyncThunk(
  "specializedetailpt/updatespecializedetailpt",
  async (data, { rejectWithValue }) => {
    const id = data?.id;
    const reqData = data?.payload;
    try {
      const response = await Api.put(`specialize-detail/${id}`, reqData);

      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data.messages);
    }
  }
);
export const deleteSpecializeDetailPt = createAsyncThunk(
  "specializedetailpt/deletespecializedetailpt",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Api.delete(`specialize-detail/${id}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const SpecializeDetailPtSilce = createSlice({
  name: "specializedetailpt",
  initialState: {
    items: [],
    filtersSpecialize: {},
    meta: {
      current_page: 0,
      per_page: 10,
      total: 0,
    },
    loading: false,
  },
  reducers: {
    setFiltersSpecialize: (state, action) => {
      state.filtersSpecialize = { ...state.filtersSpecialize, ...action.payload };
    },
    removeFiltersSpecialize: (state) => {
      state.filtersSpecialize = {};
    },
  },
  extraReducers: {
    //CertificatesBySpecialize
    [getCertificatesBySpecialize.pending]: (state, action) => {
      state.loading = true;
    },
    [getCertificatesBySpecialize.fulfilled]: (state, action) => {
      state.items = action?.payload;
      state.loading = false;
    },
    [getCertificatesBySpecialize.rejected]: (state, action) => {
      state.loading = false;
    },
    [deleteCertificatesBySpecialize.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteCertificatesBySpecialize.fulfilled]: (state, action) => {
      if (action?.payload?.data === true) {
        state.items = state.items.filter((Certificates) => Certificates.id !== action.meta.arg);
      }

      state.loading = false;
    },
    [deleteCertificatesBySpecialize.rejected]: (state, action) => {
      state.loading = false;
    },
    [addCertificatesBySpecialize.pending]: (state, action) => {
      state.loading = true;
    },
    [addCertificatesBySpecialize.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [addCertificatesBySpecialize.rejected]: (state, action) => {
      state.loading = false;
    },
    [updateCertificatesBySpecialize.pending]: (state, action) => {
      state.loading = true;
    },
    [updateCertificatesBySpecialize.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateCertificatesBySpecialize.rejected]: (state, action) => {
      state.loading = false;
    },

    // SpecializeDetailPt
    [getSpecializeDetailPt.pending]: (state, action) => {
      state.loading = true;
    },
    [getSpecializeDetailPt.fulfilled]: (state, action) => {
      const { data, current_page, per_page, total } = action?.payload;
      state.items = data;
      state.loading = false;
      state.meta = {
        current_page: current_page,
        per_page: per_page,
        total: total,
      };
    },
    [getSpecializeDetailPt.rejected]: (state, action) => {
      state.loading = false;
    },
    [deleteSpecializeDetailPt.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteSpecializeDetailPt.fulfilled]: (state, action) => {
      if (action?.payload?.data === true) {
        state.items = state.items.filter((Certificates) => Certificates.id !== action.meta.arg);
      }
      state.loading = false;
    },
    [deleteSpecializeDetailPt.rejected]: (state, action) => {
      state.loading = false;
    },
    [addSpecializeDetailPt.pending]: (state, action) => {
      state.loading = true;
    },
    [addSpecializeDetailPt.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [addSpecializeDetailPt.rejected]: (state, action) => {
      state.loading = false;
    },
    // [updateCertificates.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [updateCertificates.fulfilled]: (state, action) => {
    //   state.loading = false;
    // },
    // [updateCertificates.rejected]: (state, action) => {
    //   state.loading = false;
    // },
  },
});

export const { setFiltersSpecialize, removeFiltersSpecialize } = SpecializeDetailPtSilce.actions;
export default SpecializeDetailPtSilce.reducer;
