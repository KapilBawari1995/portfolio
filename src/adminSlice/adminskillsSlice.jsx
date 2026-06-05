import { createSlice } from '@reduxjs/toolkit';

const adminSkillsSlice = createSlice({
  name: 'adminSkills',
  initialState: { 
    data: { languages: '', databases: '', tools: '', frameworks: '', other: '' }, 
    loading: false, 
    error: null 
  },
  reducers: {
    // 1. Fetch Request
    adminFetchSkillsRequest: (state) => { 
      console.log("DEBUG: adminFetchSkillsRequest triggered");
      state.loading = true; 
    },
    // 2. Fetch Success
    adminFetchSkillsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    // 3. Update Request
    adminUpdateSkillsRequest: (state, action) => { 
      console.log("DEBUG: Slice received payload for update:", action.payload);
      state.loading = true; 
    },
    // 4. Update Success
    adminUpdateSkillsSuccess: (state, action) => {
      state.loading = false;
      // Update state with the new data
      state.data = action.payload;
    },
    // 5. Failure
    adminSkillsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.error("DEBUG: Slice Error:", action.payload);
    },
  },
});

export const { 
  adminFetchSkillsRequest, 
  adminFetchSkillsSuccess, 
  adminUpdateSkillsRequest, 
  adminUpdateSkillsSuccess, 
  adminSkillsFailure 
} = adminSkillsSlice.actions;

export default adminSkillsSlice.reducer;