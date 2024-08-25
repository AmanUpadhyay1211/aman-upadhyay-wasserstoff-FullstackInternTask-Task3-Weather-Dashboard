import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FaWind } from "react-icons/fa";
import { FiSunrise, FiSunset, FiTrash2 } from "react-icons/fi"; 
import { removePinnedCityWeather, addPinnedCityWeather } from "../redux/slices/weatherSlice";
import api from "../api/api";

function PinnedCity() {
  const dispatch = useDispatch();

  // Fetching pinned cities' weather data from the Redux store
  const pinnedCitiesWeather = useSelector((state) => state.weather.pinnedCitiesWeather);

  useEffect(() => {
    const fetchPinnedCitiesWeather = async () => {
      const pinnedCities = localStorage.getItem("PinnedCity");

      if (pinnedCities) {
        const citiesArray = JSON.parse(pinnedCities);
        
        // Filter out cities that are already fetched to avoid duplication
        const citiesToFetch = citiesArray.filter(
          (city) => !pinnedCitiesWeather.some((weather) => weather.name === city)
        );

        if (citiesToFetch.length > 0) {
          citiesToFetch.map(async (city) => {
            try {
              const response = await api.searchWeatherByCity({ city });
              dispatch(addPinnedCityWeather(response));
            } catch (error) {
              console.error(error);
            }
          });
        }
      }
    };

    fetchPinnedCitiesWeather();
  }, [dispatch, pinnedCitiesWeather]);

  const removeCity = (cityName) => {
    let pinnedCities = JSON.parse(localStorage.getItem("PinnedCity")) || [];
    pinnedCities = pinnedCities.filter((city) => city !== cityName);
    localStorage.setItem("PinnedCity", JSON.stringify(pinnedCities));
    dispatch(removePinnedCityWeather(cityName));
    alert(`${cityName} removed from pinned cities!`);
  };

  if (!pinnedCitiesWeather.length) {
    return (
      <div className="flex items-center justify-center h-[88.7vh] bg-white dark:bg-gray-900">
        <p className="text-center text-2xl font-semibold text-gray-800 dark:text-white">
          No pinned cities. Pin a city to see its weather here.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[88.7vh] bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Pinned Cities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pinnedCitiesWeather.map((cityData, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-all duration-300 ease-in-out hover:shadow-lg"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {cityData.name}
                </h3>
                <button
                  onClick={() => removeCity(cityData.name)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-300"
                >
                  <FiTrash2 />
                </button>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-300 capitalize">
                    {cityData.weather[0].description}
                  </p>
                  <p className="text-3xl font-bold text-gray-800 dark:text-white">
                    {Math.round(cityData.main.temp - 273.15)}°C
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Max Temp: {Math.round(cityData.main.temp_max - 273.15)}°C
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Min Temp: {Math.round(cityData.main.temp_min - 273.15)}°C
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 flex items-center">
                    <FaWind className="mr-2" /> Wind: {cityData.wind.speed} m/s
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 flex items-center">
                    <FiSunrise className="mr-2" /> Sunrise:{" "}
                    {new Date(cityData.sys.sunrise * 1000).toLocaleTimeString()}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 flex items-center">
                    <FiSunset className="mr-2" /> Sunset:{" "}
                    {new Date(cityData.sys.sunset * 1000).toLocaleTimeString()}
                  </p>
                </div>
                <img
                  className="w-16 h-16 object-cover"
                  src={`https://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`}
                  alt="Weather icon"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PinnedCity;
