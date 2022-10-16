import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WeatherIcon from "./WeatherIcon";

import { getDay, formatAMPM } from "../utils/date";

const WeatherForecast = () => {
  const weatherForecastData = useSelector(
    (state) => state.weather.weatherForecastData
  );
  const weatherForecastStatus = useSelector(
    (state) => state.weather.weatherForecastStatus
  );
  const weatherForecastError = useSelector(
    (state) => state.weather.weatherForecastError
  );

  const [days, setDays] = useState([]);

  useEffect(() => {
    setDays(
      weatherForecastData?.list
        ?.map?.((item) => getDay(item?.dt_txt))
        ?.filter?.((item, i, arr) => arr.indexOf(item) === i)
    );
  }, []);

  return (
    <div className="flex flex-col items-center select-none">
      <div className="flex py-4 overflow-x-scroll h-10rem  w-[100vw] max-w-[50rem]">
        {weatherForecastData?.list.map((item, i) => (
          <div
            key={i}
            className=" px-4 flex flex-col justify-between items-center"
          >
            <div className="text-center leading-none">
              {formatAMPM(new Date(item?.dt_txt))}{" "}
              {getDay(item?.dt_txt).slice(0, 3)}
            </div>
            <div className="p-1">
              <WeatherIcon
                id={item?.weather[0]?.id}
                icon={item?.weather[0]?.icon}
              />
            </div>
            <div className="text-center text-md">
              {item?.main?.temp_min ? Math.floor(item.main.temp_min) : 0} /{" "}
              {item?.main?.temp_max ? Math.floor(item.main.temp_max) : 0}
            </div>
          </div>
        ))}
      </div>
      {weatherForecastStatus === "loading" ? (
        <div className=" absolute bottom-[6rem] dark:text-gray-700 text-gray-300">
          loading...
        </div>
      ) : null}
    </div>
  );
};

export default WeatherForecast;
