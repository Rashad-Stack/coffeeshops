import { configureStore } from "@reduxjs/toolkit";
import currentLocationSlices from "./slices/currentLocationSlices";

const store = configureStore({
  reducer: {
    currentLocation: currentLocationSlices,
  },
});

export default store;
