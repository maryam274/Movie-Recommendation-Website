import { createSlice } from "@reduxjs/toolkit";

// This slice manages the application state in the Redux store
export const appStateSlice = createSlice({
  name: "AppState",
  initialState: {
    appState: ""
  },
  reducers: {
    setAppState: (state, action) => {
      state.appState = action.payload;
    }
  }
});

export const {
  setAppState
} = appStateSlice.actions;

export default appStateSlice.reducer;