import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const WeatherDetails = () => {
  const weatherData = useSelector((state) => state.weather.weatherData);
  const forecastData = useSelector((state) => state.weather.forecastData);

  const [filteredForecast, setFilteredForecast] = useState([]);
  console.log(weatherData,forecastData)

  useEffect(() => {
    if (forecastData?.list) {
      // Filter forecast data to get the 8th, 16th, 24th, 32nd, and 40th items
      const filtered = forecastData.list.filter((_, index) =>
        [7, 15, 23, 31, 39].includes(index)
      );
      setFilteredForecast(filtered);
    }
  }, [forecastData]);

  if (!weatherData || !forecastData) {
    return <p className="text-center text-gray-600 dark:text-gray-300">Loading or City not found...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Current Weather Section */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Current Weather in {weatherData.name}
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 dark:text-gray-300">
              {weatherData.weather[0].description}
            </p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">
              {Math.round(weatherData.main.temp - 273.15)}°C
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Feels like: {Math.round(weatherData.main.feels_like - 273.15)}°C
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Humidity: {weatherData.main.humidity}%
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Wind Speed: {weatherData.wind.speed} m/s
            </p>
          </div>
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="Weather icon"
            />
          </div>
        </div>
      </div>

      {/* 5-Day Forecast Section */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          5-Day Forecast
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {filteredForecast.map((forecast, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4"
            >
              <p className="text-lg font-semibold text-gray-700 dark:text-white">
                {new Date(forecast.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                alt="Forecast icon"
              />
              <p className="text-gray-600 dark:text-gray-300">
                {forecast.weather[0].description}
              </p>
              <p className="text-xl font-bold text-gray-800 dark:text-white">
                {Math.round(forecast.main.temp - 273.15)}°C
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Humidity: {forecast.main.humidity}%
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Wind Speed: {forecast.wind.speed} m/s
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
