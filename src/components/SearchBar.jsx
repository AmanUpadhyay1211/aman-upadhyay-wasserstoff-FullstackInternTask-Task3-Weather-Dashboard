import React, { useState, useRef, useEffect } from "react";
import api from "../api/api";
import { useDispatch } from "react-redux";
import { addWeather, addForecast } from "../redux/slices/weatherSlice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FiSearch } from "react-icons/fi";

const WeatherSearchBar = () => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [debounceTimer, setDebounceTimer] = useState(null);

  useEffect(() => {
    setBtnDisabled(!(city.length >= 3));
  }, [city]);

  const handleInputChange = (e) => {
    setCity(e.target.value);

    if (e.target.value.length >= 3) {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      setDebounceTimer(
        setTimeout(async () => {
          try {
            const cities = await api.searchCities({ state: e.target.value, limit: 5 });
            setSuggestions(cities);
            setShowSuggestions(true);
          } catch (err) {
            toast.error("Error fetching city suggestions!");
          }
        }, 2000)
      );
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    const { lat, lon } = suggestion;
    try {
      const weatherData = await api.searchWeatherByCoordinates({ lat, lon });
      dispatch(addWeather(weatherData));
      if (weatherData) {
        const forecastData = await api.FiveDaysThreeHourForecast({ lat, lon });
        dispatch(addForecast(forecastData));
      }
      toast.success("Weather data fetched successfully!");
      setCity(suggestion.name);
      setShowSuggestions(false);
    } catch (error) {
      toast.error("Error fetching weather data!");
    }
  };

  const handleSearch = async (city) => {
    try {
      const weatherData = await api.searchWeatherByCity({ city: city });
      dispatch(addWeather(weatherData));
      if (weatherData) {
        const forecastData = await api.FiveDaysThreeHourForecast({ lat: weatherData.coord.lat, lon: weatherData.coord.lon });
        dispatch(addForecast(forecastData));
      }
      toast.success("Weather data fetched successfully!");
      setSuggestions([]);
      setShowSuggestions(false);
    } catch (error) {
      toast.error("Error fetching weather data by city name!");
    }
  };

  return (
    <div className="flex items-center justify-center mt-5">
      <div className="relative flex space-x-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-2xl">
        <input
          ref={inputRef}
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name..."
          className="flex-grow bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 px-4 py-2"
        />
        <button
          onClick={() => handleSearch(city)}
          disabled={btnDisabled}
          className={`flex items-center justify-center px-4 py-2 rounded-md shadow-md focus:outline-none transition duration-200 ${
            btnDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          <FiSearch className="mr-2" />
          Search
        </button>

        {showSuggestions && suggestions?.length > 0 && (
          <ul className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 shadow-md rounded-lg max-h-48 overflow-y-auto z-10">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="cursor-pointer p-2 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-200"
              >
                <img
                  src={`https://flagsapi.com/${suggestion.country}/flat/64.png`}
                  alt={`${suggestion.country} flag`}
                  className="w-6 h-4 mr-2 rounded-sm"
                />
                <span>{suggestion.name}, {suggestion.state}, {suggestion.country}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default WeatherSearchBar;
