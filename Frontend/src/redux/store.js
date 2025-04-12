import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./slices/appStateSlice";
import globalLoadingSlice from "./slices/globalLoadingSlice";
import themeModeSlice from "./slices/themeModeSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    themeMode: themeModeSlice,
    globalLoading: globalLoadingSlice,
    appState: appStateSlice
  }
});

export default store;