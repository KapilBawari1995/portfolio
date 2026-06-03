import { createSlice } from '@reduxjs/toolkit';

const experienceSlice = createSlice({
  name: 'experience',
  initialState: { data: [], loading: false, error: null },
  reducers: {
    fetchExperienceRequest: (state) => { state.loading = true; },
    fetchExperienceSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchExperienceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchExperienceRequest, fetchExperienceSuccess, fetchExperienceFailure } = experienceSlice.actions;
export default experienceSlice.reducer;