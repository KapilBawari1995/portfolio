import { createSlice } from '@reduxjs/toolkit';

const adminExperienceSlice = createSlice({
  name: 'adminExperience',
  initialState: { 
    data: [], 
    loading: false, 
    error: null 
  },
  reducers: {
    // Fetch Actions
    adminFetchExperienceRequest: (state) => { state.loading = true; },
    adminFetchExperienceSuccess: (state, action) => { 
      state.loading = false; 
      state.data = action.payload; 
    },

    // Add Actions
    adminAddExperienceRequest: (state) => { state.loading = true; },
    adminAddExperienceSuccess: (state, action) => { 
      state.loading = false; 
      state.data.push(action.payload); 
    },

    // Update Actions
    adminUpdateExperienceRequest: (state) => { state.loading = true; },
    adminUpdateExperienceSuccess: (state, action) => {
      state.loading = false;
      state.data = state.data.map(item => 
        item.id == action.payload.id ? action.payload : item
      );
    },

    // Delete Actions
    adminDeleteExperienceRequest: (state) => { state.loading = true; },
    adminDeleteExperienceSuccess: (state, action) => {
      state.loading = false;
      state.data = state.data.filter(item => item.id !== action.payload);
    },

    // Error Handling
    adminExperienceFailure: (state, action) => { 
      state.loading = false; 
      state.error = action.payload; 
    },
  },
});

// Yahan se saare actions export ho rahe hain
export const { 
  adminFetchExperienceRequest, 
  adminFetchExperienceSuccess,
  adminAddExperienceRequest, 
  adminAddExperienceSuccess,
  adminUpdateExperienceRequest, 
  adminUpdateExperienceSuccess,
  adminDeleteExperienceRequest, 
  adminDeleteExperienceSuccess, 
  adminExperienceFailure 
} = adminExperienceSlice.actions;

export default adminExperienceSlice.reducer;