import axios from "axios";

const APP_ID = "51ee09bab3648e0efadd4548d24d370e";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeatherData = async (position) => {
  const PARAMS = `weather?lat=${position.lat}&lon=${position.lon}$appid=${APP_ID}`;
  const toFetch = `${BASE_URL}/${PARAMS}`;

  const response = await axios.get(toFetch);
  return response;
};