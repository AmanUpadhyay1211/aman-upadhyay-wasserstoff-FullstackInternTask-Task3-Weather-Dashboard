import { createSlice } from "@reduxjs/toolkit";

const initialState = null

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    addCities: (state, action) => {
      state = action.payload;
    },
  },
});
export const { addCities } = citiesSlice.actions;

export default citiesSlice.reducer;
