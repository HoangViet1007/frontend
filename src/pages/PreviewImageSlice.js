import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const previewImage = createAsyncThunk(
  "previewImageSlice/previewImage",
  (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        resolve(url);
      }, 1000);
    });
  }
);
const previewImageSlice = createSlice({
  name: "previewImage",
  initialState: {
    loading: false,
    urlImage: "",
  },
  reducers: {
    setUrlImage: (state, action) => {
      state.urlImage = "";
    },
  },
  extraReducers: {
    [previewImage.pending]: (state) => {
      state.loading = true;
    },
    [previewImage.fulfilled]: (state, action) => {
      state.loading = false;
      state.urlImage = action.payload;
    },
    [previewImage.rejected]: (state) => {
      state.loadingImage = false;
    },
  },
});
export const { setUrlImage } = previewImageSlice.actions;
export default previewImageSlice.reducer;
