import React, { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css"; // Import CSS for MapLibre GL
// import maptilersdk from "maptilersdk"; // Import MapTiler SDK
// import maptilerweather from "maptilerweather"; // Import MapTiler Weather SDK

const MapComponent = ({ lat=28.7, lon=77.1 }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    // Set MapTiler API Key
    maptilersdk.config.apiKey = "kgRk5eACicDc7ULfQ69W";

    // Initialize Map using MapTiler SDK
    const map = new maptilersdk.Map({
      container: mapContainer.current, // Container's id or the HTML element to render the map
      style: maptilersdk.MapStyle.BACKDROP, // Choose appropriate map style
      zoom: 10, // Set initial zoom level to focus on the current location
      center: [lon, lat], // Set initial center to the given lat/lon
      hash: true,
    });

    // Add Marker at Current Location
    const marker = new maptilersdk.Marker()
      .setLngLat([lon, lat])
      .addTo(map);

    // Create Weather Layer
    const weatherLayer = new maptilerweather.TemperatureLayer({
      colorramp: maptilerweather.ColorRamp.builtin.TEMPERATURE_3,
    });

    // Add Weather Layer on Map Load
    map.on("load", function () {
      map.setPaintProperty("Water", "fill-color", "rgba(0, 0, 0, 0.4)");
      map.addLayer(weatherLayer, "Water");
      weatherLayer.animateByFactor(3600); // Animate by factor
    });

    // Handle Mouse Events for Data Display
    const timeTextDiv = document.getElementById("time-text");
    const pointerDataDiv = document.getElementById("pointer-data");
    let pointerLngLat = null;

    weatherLayer.on("tick", (event) => {
      refreshTime();
      updatePointerValue(pointerLngLat);
    });

    map.on("mouseout", function (evt) {
      if (!evt.originalEvent.relatedTarget) {
        pointerDataDiv.innerText = "";
        pointerLngLat = null;
      }
    });

    function refreshTime() {
      const d = weatherLayer.getAnimationTimeDate();
      timeTextDiv.innerText = d.toString();
    }

    function updatePointerValue(lngLat) {
      if (!lngLat) return;
      pointerLngLat = lngLat;
      const value = weatherLayer.pickAt(lngLat.lng, lngLat.lat);
      if (!value) {
        pointerDataDiv.innerText = "";
        return;
      }
      pointerDataDiv.innerText = `${value.value.toFixed(1)}°`;
    }

    map.on("mousemove", (e) => {
      updatePointerValue(e.lngLat);
    });

    // Clean up map resources on component unmount
    return () => {
      map.remove();
    };
  }, [lat, lon]); // Dependency array includes lat and lon to reinitialize map on change

  return (
    <div className="relative h-screen">
      <div
        id="map"
        ref={mapContainer}
        className="w-full h-full"
        style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
      ></div>
      <div
        id="time-info"
        className="fixed bottom-0 w-full text-center z-10 text-white p-4 text-lg"
      >
        <span id="time-text"></span>
      </div>
      <div
        id="variable-name"
        className="fixed top-25 left-20 z-10 text-white font-bold text-xl"
      >
        Temperature
      </div>
      <div
        id="pointer-data"
        className="fixed top-[95px] left-[100px] z-10 text-white font-extrabold text-xl"
      ></div>
    </div>
  );
};

export default MapComponent;
