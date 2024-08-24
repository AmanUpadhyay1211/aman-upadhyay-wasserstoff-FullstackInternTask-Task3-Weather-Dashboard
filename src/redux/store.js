import { configureStore } from "@reduxjs/toolkit";
import weatherSlice from "./slices/weatherSlice";
import citiesSlice from "./slices/citiesSlice";

export const store = configureStore({
  reducer: {
    weather: weatherSlice,
    cities: citiesSlice,
  },
});
