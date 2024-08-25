import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  weatherData : null,
  forecastData : null,
  pinnedCitiesWeather : []
};
  
  export const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        addWeather: (state, action) => {
            state.weatherData = action.payload;
        },
        addForecast: (state, action) => {
            state.forecastData = action.payload;
        },
        addPinnedCityWeather : (state, action) => {
          state.pinnedCitiesWeather.push(action.payload);
      },
      removePinnedCityWeather: (state, action) => {
        state.pinnedCitiesWeather = state.pinnedCitiesWeather.filter(
          (city) => city.name !== action.payload
        );
      },
     }
})

  export const {addWeather,addForecast,addPinnedCityWeather,removePinnedCityWeather} = weatherSlice.actions;
  
export default weatherSlice.reducer;