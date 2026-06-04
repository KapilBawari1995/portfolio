import { createSlice } from '@reduxjs/toolkit';

const adminLoginSlice = createSlice({
  name: 'adminlogin',
  initialState: { user: null, loading: false, error: null },
  reducers: {
    loginRequest: (state) => { state.loading = true; state.error = null; },
    loginSuccess: (state, action) => { 
      state.loading = false; 
      state.user = action.payload; 
    },
    loginFailure: (state, action) => { 
      state.loading = false; 
      state.error = action.payload; 
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure } = adminLoginSlice.actions;
export default adminLoginSlice.reducer;