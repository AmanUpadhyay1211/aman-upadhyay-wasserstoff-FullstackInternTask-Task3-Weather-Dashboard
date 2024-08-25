import { useEffect } from "react";
import { ThemeToggler, VerticalNavbar, SearchBar } from "./components/index";
import { Outlet } from "react-router-dom";
import api from "./api/api";
import { useDispatch } from "react-redux";
import { addPinnedCityWeather } from "./redux/slices/weatherSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPinnedCitiesWeather = async () => {
      const pinnedCities = localStorage.getItem("PinnedCity");

      if (pinnedCities) {
        const citiesArray = JSON.parse(pinnedCities);
        citiesArray.map(async (city) => {
          try {
            const response = await api.searchWeatherByCity({ city });
            dispatch(addPinnedCityWeather(response));
          } catch (error) {
            console.error(error);
          }
        });
      }
    };
    fetchPinnedCitiesWeather();
  }, [dispatch]);

  return (
    <>
      <div className="body">
        <VerticalNavbar />
        <SearchBar />
        <Outlet />
        <ThemeToggler />
      </div>
    </>
  );
}

export default App;
