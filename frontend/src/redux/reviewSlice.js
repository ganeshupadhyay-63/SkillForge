import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviewData: [],
  },
  reducers: {
    
    setReviewData: (state, action) => {
      state.reviewData = action.payload;
    },
    
    addReview: (state, action) => {
      state.reviewData = [action.payload, ...state.reviewData];
    },
  },
});

export const { setReviewData, addReview } = reviewSlice.actions;
export default reviewSlice.reducer;
