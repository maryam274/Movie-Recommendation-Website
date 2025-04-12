import { createSlice } from "@reduxjs/toolkit";

// This slice manages the user state in the Redux store
export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null, // Initial state for user is null
  },
  reducers: {
    // Action to set the user state
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
