import axios from "axios";

const APP_ID = import.meta.env.VITE_APP_ID;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeatherData = async (position, unit) => {
  const PARAMS = `weather?lat=${position.lat}&lon=${position.lon}&appid=${APP_ID}&units=${unit}`;
  const toFetch = `${BASE_URL}/${PARAMS}`;

  const response = await axios.get(toFetch);
  return response;
};
