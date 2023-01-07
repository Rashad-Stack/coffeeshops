import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const header = {
  method: "GET", // or 'PUT'
  headers: {
    "Content-Type": "application/json",
    Authorization: process.env.NEXT_PUBLIC_COFFEESHOPS_API_KEY,
  },
};

export const getCoffeeshops = createAsyncThunk(
  "coffeeshops/getCoffeeshops",
  async () => {
    const response = await fetch(
      "https://api.foursquare.com/v3/places/search?query=coffee",
      header
    ).then((res) => res.json());

    return response.data;
  }
);

const state = {
  coffeeShops: [],
  isLoading: false,
  error: null,
};

const coffeeshopsSlice = createSlice({
  name: "coffeeshops",
  initialState: state,
  extraReducers(builder) {
    builder.addCase(getCoffeeshops.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCoffeeshops.fulfilled, (state, action) => {
      state.isLoading = false;
      state.coffeeShops = action.payload;
    });
    builder.addCase(getCoffeeshops.rejected, (state, action) => {
      state.error = action.error.message;
      state.coffeeShops = state.coffeeShops;
    });
  },
});

export default coffeeshopsSlice.reducer;
