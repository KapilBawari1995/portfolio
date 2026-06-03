import { createSlice } from '@reduxjs/toolkit';

const heroSlice = createSlice({
  name: 'hero',
  initialState: { data: null, loading: false, error: null },
  reducers: {
    fetchHeroRequest: (state) => { state.loading = true; },
    fetchHeroSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchHeroFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchHeroRequest, fetchHeroSuccess, fetchHeroFailure } = heroSlice.actions;
export default heroSlice.reducer;