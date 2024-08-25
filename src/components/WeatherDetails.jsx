import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaWind, FaSun, FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import { FiSunrise, FiSunset, FiMapPin, FiCheckCircle } from "react-icons/fi"; // Icons for sunrise, sunset, and pin
import { toast } from "react-toastify";

const WeatherDetails = () => {
  const weatherData = useSelector((state) => state.weather.weatherData);
  const forecastData = useSelector((state) => state.weather.forecastData);
  const [filteredForecast, setFilteredForecast] = useState([]);
  const [todayForecast, setTodayForecast] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true); // State for unit toggle

  useEffect(() => {
    if (forecastData?.list) {
      // Filter forecast data to get the 8th, 16th, 24th, 32nd, and 40th items for 5-day forecast
      const filtered = forecastData.list.filter((_, index) =>
        [7, 15, 23, 31, 39].includes(index)
      );
      setFilteredForecast(filtered);

      // Extract the first 5 elements for today's forecast (3-hour gap)
      const today = forecastData.list.slice(0, 5);
      setTodayForecast(today);
    }
  }, [forecastData]);

  const toggleUnits = () => {
    setIsCelsius(!isCelsius);
  };

  const convertTemp = (tempK) => {
    return isCelsius
      ? `${Math.round(tempK - 273.15)}°C`
      : `${Math.round(((tempK - 273.15) * 9) / 5 + 32)}°F`;
  };

  const pinCity = () => {
    const pinnedCities = JSON.parse(localStorage.getItem("PinnedCity")) || [];
    if (pinnedCities.includes(weatherData.name)) {
      toast.info("City is already pinned!");
    } else {
      pinnedCities.push(weatherData.name);
      localStorage.setItem("PinnedCity", JSON.stringify(pinnedCities));
      toast.success("City pinned successfully!");
    }
  };

  if (!weatherData || !forecastData) {
    return (
      <p className="text-center text-gray-600 dark:text-gray-300">
        Loading or City not found...
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto ">
      {/* Map and Current Weather Section */}
      <div className="flex flex-col lg:flex-row bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 mb-8">
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Current Weather in {weatherData.name}
          </h2>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-600 dark:text-gray-300">
                {weatherData.weather[0].description}
              </p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">
                {convertTemp(weatherData.main.temp)}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Max Temp: {convertTemp(weatherData.main.temp_max)}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Min Temp: {convertTemp(weatherData.main.temp_min)}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Feels like: {convertTemp(weatherData.main.feels_like)}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Humidity: {weatherData.main.humidity}%
              </p>
              <p className="text-gray-600 dark:text-gray-300 flex items-center">
                <FaWind className="mr-2" /> Wind Speed: {weatherData.wind.speed} m/s, Direction: {weatherData.wind.deg}°
              </p>
              <p className="text-gray-600 dark:text-gray-300 flex items-center">
                <FiSunrise className="mr-2" /> Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
              </p>
              <p className="text-gray-600 dark:text-gray-300 flex items-center">
                <FiSunset className="mr-2" /> Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
              </p>
            </div>
            <div>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="Weather icon"
              />
            </div>
          </div>
          <button
            onClick={toggleUnits}
            className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
          >
            Toggle to {isCelsius ? "Fahrenheit" : "Celsius"}
          </button>
          <button
            onClick={pinCity}
            className="mt-4 ml-2 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700 transition flex items-center"
          >
            <FiMapPin className="mr-1" /> Pin City
          </button>
        </div>
        <div className="w-full lg:w-1/2 h-64 lg:h-auto">
          {/* Map Section */}
          <iframe
            src={`https://maps.google.com/maps?q=${weatherData.coord.lat},${weatherData.coord.lon}&z=15&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Weather Map"
          ></iframe>
        </div>
      </div>

      {/* Today's Forecast Section */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Today's Forecast
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {todayForecast.map((forecast, index) => (
            <div key={index} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-lg font-semibold text-gray-700 dark:text-white">
                {new Date(forecast.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                alt="Forecast icon"
              />
              <p className="text-gray-600 dark:text-gray-300">
                {forecast.weather[0].description}
              </p>
              <p className="text-xl font-bold text-gray-800 dark:text-white">
                {convertTemp(forecast.main.temp)}
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
                {convertTemp(forecast.main.temp)}
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
