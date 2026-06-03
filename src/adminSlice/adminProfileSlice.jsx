import { createSlice } from '@reduxjs/toolkit';

const adminProfileSlice = createSlice({
  name: 'adminProfile',
  initialState: { data: null, loading: false, error: null },
  reducers: {
    adminFetchProfileRequest: (state) => { state.loading = true; },
    adminFetchProfileSuccess: (state, action) => { 
      state.loading = false; 
      state.data = action.payload; 
    },
    adminUpdateProfileRequest: (state) => { state.loading = true; },
    adminUpdateProfileSuccess: (state, action) => { 
      state.loading = false; 
      state.data = action.payload; 
    },
    adminProfileFailure: (state, action) => { 
      state.loading = false; 
      state.error = action.payload; 
    },
  },
});

export const { 
  adminFetchProfileRequest, adminFetchProfileSuccess, 
  adminUpdateProfileRequest, adminUpdateProfileSuccess, adminProfileFailure 
} = adminProfileSlice.actions;

export default adminProfileSlice.reducer;