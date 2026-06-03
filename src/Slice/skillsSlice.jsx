import { createSlice } from '@reduxjs/toolkit';

const skillsSlice = createSlice({
  name: 'skills',
  initialState: { data: null, loading: false, error: null },
  reducers: {
    fetchSkillsRequest: (state) => { state.loading = true; },
    fetchSkillsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchSkillsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchSkillsRequest, fetchSkillsSuccess, fetchSkillsFailure } = skillsSlice.actions;
export default skillsSlice.reducer;