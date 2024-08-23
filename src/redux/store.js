import { configureStore } from "@reduxjs/toolkit";
import wheatherSlice from "./slices/wheatherSlice";
import citiesSlice from "./slices/citiesSlice";

export const store = configureStore({
  reducer: {
    wheather: wheatherSlice,
    cities: citiesSlice,
  },
});
