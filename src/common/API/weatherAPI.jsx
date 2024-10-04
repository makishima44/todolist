import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = process.env.REACT_APP_NEWS_BASE_API_URL;

const weatherAPI = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export const getCurrentWeather = async (location) => {
  try {
    const response = await weatherAPI.get("/current.json", {
      params: { q: location },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching current weather:", error);
    throw error;
  }
};
