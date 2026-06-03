import { createSlice } from '@reduxjs/toolkit';

const projectsSlice = createSlice({
  name: 'adminprojects',
  initialState: { data: [], loading: false, error: null },
  reducers: {
    adminFetchProjectsRequest: (state) => { state.loading = true; },
    adminFetchProjectsSuccess: (state, action) => { 
      state.loading = false; 
      state.data = action.payload; 
    },
    adminAddProjectRequest: (state) => { state.loading = true; },
    adminUpdateProjectRequest: (state) => { state.loading = true; },
    adminDeleteProjectRequest: (state) => { state.loading = true; },
    adminOperationSuccess: (state) => { state.loading = false; },
    adminOperationFailure: (state, action) => { 
      state.loading = false; 
      state.error = action.payload; 
    },
  },
});

export const { 
  adminFetchProjectsRequest, 
  adminFetchProjectsSuccess, 
  adminAddProjectRequest, 
  adminUpdateProjectRequest, 
  adminDeleteProjectRequest,
  adminOperationSuccess, 
  adminOperationFailure 
} = projectsSlice.actions;

export default projectsSlice.reducer;