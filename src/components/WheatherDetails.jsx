import React from "react";
import { useState } from "react";
import {Btn} from "./index";

const WeatherDetails = () => {
  const [isCelsius, setIsCelsius] = useState(true);

  // Function to toggle between Celsius and Fahrenheit
  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-black rounded-lg shadow-md">
      {/* Current Weather Details */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">State of Bihār, IN</h2>
          <p className="text-sm text-gray-600">Aug 23, 11:11am</p>
          <div className="flex items-center mt-2">
            <span className="text-4xl font-bold">27°C</span>
            <span className="text-sm ml-2">Feels like 30°C. Overcast clouds. Moderate breeze</span>
          </div>
        </div>
        <div className="w-40 h-24 bg-gray-200 rounded-lg shadow-inner">
          {/* Placeholder for weather map */}
        </div>
      </div>

      {/* Additional Weather Details */}
      <div className="flex justify-start items-center space-x-4 text-sm text-gray-700 mb-6">
        <p>🌬️ 5.5m/s NE</p>
        <p>🌡️ 1005hPa</p>
        <p>Humidity: 80%</p>
        <p>UV: 9</p>
        <p>Dew point: 24°C</p>
        <p>Visibility: 10.0km</p>
      </div>

      {/* Hourly Forecast */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">Hourly forecast</h3>
        <div className="flex space-x-4">
          {/* Placeholder for hourly forecast data */}
          <div className="flex flex-col items-center">
            <p className="text-sm">10am</p>
            <p className="text-xl font-bold">30°C</p>
            <p className="text-sm">overcast clouds</p>
          </div>
          {/* Repeat similar divs for other hourly forecasts */}
        </div>
      </div>

      {/* 8-day Forecast */}
      <div>
        <h3 className="text-xl font-bold mb-2">8-day forecast</h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Placeholder for 8-day forecast data */}
          <div className="flex justify-between items-center">
            <p className="text-sm">Fri, Aug 23</p>
            <div className="flex items-center space-x-2">
              <p className="text-xl font-bold">29 / 27°C</p>
              <p className="text-sm">light rain</p>
            </div>
          </div>
          {/* Repeat similar divs for other days */}
        </div>
      </div>

      {/* Temperature Unit Toggle Button */}
      <div className="mt-6 flex justify-end">
        <Btn
          onClick={toggleTemperatureUnit}
          bg="bg-blue-500"
          text="text-white"
          className="w-32"
        >
          {isCelsius ? "Switch to °F" : "Switch to °C"}
        </Btn>
      </div>
    </div>
  );
};

export default WeatherDetails;
