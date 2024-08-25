import React, { useState, useRef, useEffect } from "react";
import api from "../api/api";
import { useDispatch } from "react-redux";
import { addWeather, addForecast } from "../redux/slices/weatherSlice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FiSearch, FiMapPin } from "react-icons/fi";

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

  useEffect(() => {
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation) {
      const locationData = JSON.parse(storedLocation);
      fetchWeatherByCoordinates(locationData.lat, locationData.lon);
    }
  }, []);

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
        }, 1000)  // Debounce time set to 1000ms (1 second)
      );
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && city.length >= 3) {
      handleSearch(city);
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    const { lat, lon } = suggestion;
    fetchWeatherByCoordinates(lat, lon);
    setCity(suggestion.name);
    setShowSuggestions(false);
  };

  const fetchWeatherByCoordinates = async (lat, lon) => {
    try {
      const weatherData = await api.searchWeatherByCoordinates({ lat, lon });
      dispatch(addWeather(weatherData));
      if (weatherData) {
        const forecastData = await api.FiveDaysThreeHourForecast({ lat, lon });
        dispatch(addForecast(forecastData));
      }
      toast.success("Weather data fetched successfully!");
    } catch (error) {
      toast.error("Error fetching weather data!");
    }
  };

  const handleSearch = async (city) => {
    try {
      const weatherData = await api.searchWeatherByCity({ city: city });
      dispatch(addWeather(weatherData));
      if (weatherData) {
        const forecastData = await api.FiveDaysThreeHourForecast({
          lat: weatherData.coord.lat,
          lon: weatherData.coord.lon,
        });
        dispatch(addForecast(forecastData));
      }
      toast.success("Weather data fetched successfully!");
      setShowSuggestions(false);
    } catch (error) {
      toast.error("Error fetching weather data by city name!");
    }
  };

  const handleLocationClick = async () => {
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation) {
      const locationData = JSON.parse(storedLocation);
      fetchWeatherByCoordinates(locationData.lat, locationData.lon);
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            localStorage.setItem("userLocation", JSON.stringify({ lat: latitude, lon: longitude }));
            fetchWeatherByCoordinates(latitude, longitude);
          },
          (error) => {
            toast.error("Error fetching location. Please enable location services.");
          }
        );
      } else {
        toast.error("Geolocation is not supported by your browser.");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full bg-white dark:bg-slate-900 p-4 md:p-2">
      <div className="relative flex flex-col md:flex-row md:space-x-3 bg-white dark:bg-gray-800 p-4 md:p-2 rounded-lg shadow-md w-full max-w-2xl">
        <input
          ref={inputRef}
          type="text"
          value={city}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter city name..."
          className="flex-grow bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 px-4 py-2"
          aria-label="City name input"
        />
        <button
          onClick={() => handleSearch(city)}
          disabled={btnDisabled}
          className={`flex items-center justify-center px-4 py-2 mt-3 md:mt-0 rounded-md shadow-md focus:outline-none transition duration-200 ${
            btnDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
          aria-label="Search button"
        >
          <FiSearch className="mr-2" />
          Search
        </button>
        <button
          onClick={handleLocationClick}
          className="flex items-center justify-center px-4 py-2 mt-3 md:mt-0 rounded-md shadow-md focus:outline-none transition duration-200 bg-green-500 hover:bg-green-600 text-white"
          aria-label="Use location button"
        >
          <FiMapPin className="mr-2" />
          Use Location
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
