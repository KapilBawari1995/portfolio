import { createSlice } from '@reduxjs/toolkit';

const projectsSlice = createSlice({
  name: 'projects',
  initialState: { data: [], loading: false, error: null },
  reducers: {
    fetchProjectsRequest: (state) => { state.loading = true; },
    fetchProjectsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchProjectsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchProjectsRequest, fetchProjectsSuccess, fetchProjectsFailure } = projectsSlice.actions;
export default projectsSlice.reducer;