import { MapComponent } from "../components/index";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function MapPage() {
  const weatherData = useSelector((state) => state.weather.weatherData);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  useEffect(() => {
    if (weatherData && weatherData.coord) {
      setLat(weatherData.coord.lat);
      setLon(weatherData.coord.lon);
    }
  }, [weatherData]);

  return <MapComponent lat={lat} lon={lon} />;
}

export default MapPage;
