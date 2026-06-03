import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: { data: [], loading: false, error: null },
  reducers: {
    fetchBlogsRequest: (state) => { state.loading = true; },
    fetchBlogsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchBlogsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchBlogsRequest, fetchBlogsSuccess, fetchBlogsFailure } = blogSlice.actions;
export default blogSlice.reducer;