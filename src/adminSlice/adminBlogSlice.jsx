import { createSlice } from '@reduxjs/toolkit';

const adminBlogSlice = createSlice({
  name: 'adminBlogs',
  initialState: { 
    adminBlogsData: [], 
    adminLoading: false, 
    adminError: null 
  },
  reducers: {
    adminFetchBlogsRequest: (state) => { 
      state.adminLoading = true; 
    },
    adminFetchBlogsSuccess: (state, action) => {
      state.adminLoading = false;
      state.adminBlogsData = action.payload;
    },
    adminFetchBlogsFailure: (state, action) => {
      state.adminLoading = false;
      state.adminError = action.payload;
    },
  },
});

export const { 
  adminFetchBlogsRequest, 
  adminFetchBlogsSuccess, 
  adminFetchBlogsFailure 
} = adminBlogSlice.actions;

export default adminBlogSlice.reducer;