import { createSlice } from '@reduxjs/toolkit';

const adminExperienceSlice = createSlice({
  name: 'adminExperience',
  initialState: { data: [], loading: false, error: null },
  reducers: {
    adminFetchExperienceRequest: (state) => { state.loading = true; },
    adminFetchExperienceSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
adminUpdateExperienceRequest: (state) => { state.loading = true; },
adminUpdateExperienceSuccess: (state, action) => { 
  state.loading = false;
  state.data = state.data.map(item => 
    item.id === action.payload.id ? action.payload : item
  );
},    adminExperienceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { 
  adminFetchExperienceRequest, adminFetchExperienceSuccess, 
  adminUpdateExperienceRequest, adminUpdateExperienceSuccess, adminExperienceFailure 
} = adminExperienceSlice.actions;

export default adminExperienceSlice.reducer;