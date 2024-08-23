import React, { useState, useRef, useEffect } from "react";
import { Input, Btn } from "./index";
import api from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { addWheather } from "../redux/slices/wheatherSlice";

const WeatherSearchBar = () => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather);

  // Debounce timer
  const [debounceTimer, setDebounceTimer] = useState(null);

  // Function to handle the input change and debounce the API call
  const handleInputChange = (e) => {
    setCity(e.target.value);

    if (e.target.value.length >= 3) {
      // Clear the previous debounce timer
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      // Set a new debounce timer
      setDebounceTimer(
        setTimeout(async () => {
          const cities = await api.searchCities({state:e.target.value,limit:5})
          setSuggestions(cities);
          setShowSuggestions(true);
        }, 2000)
      );
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Function to fetch city suggestions from the API
  // const fetchCitySuggestions = async (query) => {
  //   try {
  //     const response = await fetch(
  //       `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=52fc768d200d9f2960c9c299128cff1e`
  //     );
  //     const data = await response.json();
  //     setSuggestions(data);
  //     setShowSuggestions(true);
  //   } catch (error) {
  //     console.error("Error fetching city suggestions:", error);
  //   }
  // };

  // Function to handle selecting a suggestion
 
 
  const handleSuggestionClick = async (suggestion) => {
    const { lat, lon } = suggestion;
    try {
      const weatherData = await api.searchWheatherByCoordinates({lat,lon})
      dispatch(addWheather(weatherData));
      setCity(suggestion.name); // Set the city name to the selected suggestion
      setShowSuggestions(false);
    } catch (error) {
      console.error("Error fetching weather data by lat/lon:", error);
    }
  };

  // Function to handle search button click
  const handleSearch = async () => {
    try {
      const cityWeather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=52fc768d200d9f2960c9c299128cff1e`
      );
      const weatherData = await cityWeather.json();
      dispatch(addWheather(weatherData));
      console.log("City:", city, "Weather:", weather);
    } catch (error) {
      console.error("Error fetching weather data by city name:", error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-5">
      <div className="relative flex space-x-3 bg-white p-4 rounded-lg shadow-md w-full max-w-md">
        <Input
          ref={inputRef}
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name..."
          className="flex-grow"
        />
        <Btn onClick={handleSearch} bg="bg-blue-500" text="text-white">
          Search
        </Btn>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions?.length > 0 && (
          <ul className="absolute top-full left-0 right-0 mt-1 bg-white shadow-md rounded-lg max-h-48 overflow-y-auto z-10">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="cursor-pointer p-2 hover:bg-gray-100"
              >
                {suggestion.name}, {suggestion.state}, {suggestion.country} 
                {/* <img src={`https://flagsapi.com/${suggestion.country}/flat/64.png`} alt="flag" /> */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WeatherSearchBar;
