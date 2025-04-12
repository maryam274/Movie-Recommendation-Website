import { createSlice } from "@reduxjs/toolkit";

// Slice to manage global loading state (e.g. for showing a loading spinner)
export const globalLoadingSlice = createSlice({
  name: "globalLoading", 
  initialState: {
    globalLoading: false
  },
  reducers: {
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    }
  }
});

export const {
  setGlobalLoading
} = globalLoadingSlice.actions;

export default globalLoadingSlice.reducer;
