import s from "./Wheather.module.css";
import { memo, useEffect, useState } from "react";
import { getCurrentWeather } from "../../API/weatherAPI";

type WeatherCondition = {
  text: string;
  icon: string;
};

type CurrentWeather = {
  temp_c: number;
  condition: WeatherCondition;
};

type WeatherData = {
  current: CurrentWeather;
};

type WeatherProps = {
  location: string;
};

export const Weather = memo(({ location }: WeatherProps) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    <div className={s.weatherContainer}>
      <img src={weather.current.condition.icon} alt={weather.current.condition.text} className={s.weatherIcon} />
      <div className={s.weatherText}>
        <p className={s.weatherTemperature}>Temperature: {weather.current.temp_c}°C</p>
        <p className={s.weatherCondition}>Condition: {weather.current.condition.text}</p>
      </div>
    </div>
  );
});
