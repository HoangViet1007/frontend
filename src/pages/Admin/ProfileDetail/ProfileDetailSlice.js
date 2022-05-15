import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../../utils/Api";
import { uploadImg } from "../../../utils/uploadImg";
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      if (data.ChangeImage) {
        const url = await uploadImg(data.ChangeImage);
        data.image = url;
        const response = await Api.put(`/user-edit/${data.id}`, data);
        if (response?.status === 200) {
          return response?.data;
        }
      } else {
        data.image = data.currentImage;
        const response = await Api.put(`/user-edit/${data.id}`, data);
        if (response?.status === 200) {
          return response?.data;
        }
      }
    } catch (error) {
      return rejectWithValue(error.response.data.messages);
    }
  }
);
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    urlImg: "",
    loading: false,
  },
  reducers: {
    changeUrl: (state, action) => {
      state.urlImg = action.payload;
    },
  },
  extraReducers: {
    [updateProfile.pending]: (state) => {
      state.loading = true;
    },
    [updateProfile.fulfilled]: (state) => {
      state.loading = false;
    },
    [updateProfile.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { changeUrl } = profileSlice.actions;
export default profileSlice.reducer;
