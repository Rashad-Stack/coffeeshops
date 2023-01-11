import { createSlice } from "@reduxjs/toolkit";

const state = {
  location: "",
  coffeeshops: [],
};

const currentLocationSlices = createSlice({
  name: "currentLocation",
  initialState: state,
  reducers: {
    setCurrentLocation(state, action) {
      state.location = action.payload;
    },
    setCoffeeshops(state, action) {
      state.coffeeshops = action.payload;
    },
  },
});

export const { setCurrentLocation, setCoffeeshops } =
  currentLocationSlices.actions;

export default currentLocationSlices.reducer;
