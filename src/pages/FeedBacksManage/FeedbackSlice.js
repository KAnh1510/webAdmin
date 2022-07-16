import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import feedbackApi from "~/api/feedbackApi";

export const FeedbackSlice = createSlice({
  name: "feedbacks",
  initialState: {
    loading: false,
    values: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllFeedbacks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllFeedbacks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllFeedbacks.fulfilled, (state, action) => {
        state.values = action.payload;
      });
  },
});

export const getAllFeedbacks = createAsyncThunk(
  "feedbacks/getAll",
  async () => {
    const res = await feedbackApi.getAll();
    return res;
  }
);

export default FeedbackSlice;
