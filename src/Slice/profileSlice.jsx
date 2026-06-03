import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: { data: null, loading: false, error: null },
  reducers: {
    fetchProfileRequest: (state) => { state.loading = true; },
    fetchProfileSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchProfileRequest, fetchProfileSuccess, fetchProfileFailure } = profileSlice.actions;
export default profileSlice.reducer;