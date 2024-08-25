import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  weatherData : null,
  forecastData : null
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
        }
     }
})

  export const {addWeather,addForecast,addUnit} = weatherSlice.actions;
  
export default weatherSlice.reducer;