import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: { counts: { projects: 0, skills: 0, experience: 0 }, loading: false },
  reducers: {
    fetchCountsRequest: (state) => { state.loading = true; },
    fetchCountsSuccess: (state, action) => {
      state.loading = false;
      state.counts = action.payload;
    },
  },
});

export const { fetchCountsRequest, fetchCountsSuccess } = dashboardSlice.actions;
export default dashboardSlice.reducer;