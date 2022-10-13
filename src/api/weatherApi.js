import axios from "axios";

const APP_ID = process.env.APPID;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeatherData = async (position) => {
  const PARAMS = `weather?lat=${position.lat}&lon=${position.lon}&appid=${APP_ID}&units=metric`;
  const toFetch = `${BASE_URL}/${PARAMS}`;

  const response = await axios.get(toFetch);
  return response;
};
