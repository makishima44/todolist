import axios from "axios";

const API_KEY = "13548c457a5e49d4912173525240809";
const BASE_URL = "https://api.weatherapi.com/v1";

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
