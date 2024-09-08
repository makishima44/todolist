import React, { useState, useEffect } from "react";
import { getCurrentWeather } from "./weatherAPI";

export const Weather = ({ location }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getCurrentWeather(location);
        setWeather(data);
      } catch (err) {
        setError("Failed to fetch weather data.");
      }
    };

    fetchWeather();
  }, [location]);

  if (error) return <div>{error}</div>;
  if (!weather) return <div>Loading...</div>;

  return (
    <div>
      <h3> {weather.location.name}</h3>
      <p>Temperature: {weather.current.temp_c}°C</p>
    </div>
  );
};
