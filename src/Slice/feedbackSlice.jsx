import { createSlice } from '@reduxjs/toolkit';

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: { loading: false, success: false, error: null },
  reducers: {
    submitFeedbackRequest: (state) => { state.loading = true; },
    submitFeedbackSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    submitFeedbackFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetFeedback: (state) => { state.success = false; state.error = null; }
  },
});

export const { submitFeedbackRequest, submitFeedbackSuccess, submitFeedbackFailure, resetFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;