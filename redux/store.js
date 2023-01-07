import { configureStore } from "@reduxjs/toolkit";
import coffeeshopsSlices from "./slices/coffeeshopSlices";

const store = configureStore({
  reducer: {
    coffeeshops: coffeeshopsSlices,
  },
});

export default store;
