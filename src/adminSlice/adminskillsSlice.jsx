import { createSlice } from '@reduxjs/toolkit';

const skillsSlice = createSlice({
  name: 'skills',
  initialState: { 
    data: { languages: '', databases: '', tools: '', frameworks: '', other: '' }, 
    loading: false, 
    error: null 
  },
  reducers: {
    fetchSkillsRequest: (state) => { state.loading = true; },
    fetchSkillsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    updateSkillsRequest: (state) => { state.loading = true; },
    updateSkillsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    skillsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { 
  fetchSkillsRequest, fetchSkillsSuccess, 
  updateSkillsRequest, updateSkillsSuccess, skillsFailure 
} = skillsSlice.actions;

export default skillsSlice.reducer;