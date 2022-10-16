import axios from "axios";

const APP_ID = import.meta.env.VITE_APP_ID;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeatherData = async (position, unit) => {
  const PARAMS = `weather?lat=${position.lat}&lon=${position.lon}&appid=${APP_ID}&units=${unit}`;
  const toFetch = `${BASE_URL}/${PARAMS}`;

  const response = await axios.get(toFetch);
  return response;
};

export const fetchWeatherForecastData = async (position, unit) => {
  const PARAMS = `forecast?lat=${position.lat}&lon=${position.lon}&appid=${APP_ID}&units=${unit}`;
  const toFetch = `${BASE_URL}/${PARAMS}`;

  const response = await axios.get(toFetch);
  return response;
};

export const fetchGeocoding = async (name) => {
  const BASE_URL = "https://api.openweathermap.org/geo/1.0";
  const PARAMS = `direct?q=${name}&appid=${APP_ID}&limit=1`;
  const toFetch = `${BASE_URL}/${PARAMS}`;

  const response = await axios.get(toFetch);
  return response;
};
