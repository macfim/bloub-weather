import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import WeatherIcon from "./WeatherIcon";

import { getDay, formatAMPM } from "../utils/date";

const WeatherForecast = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  const weatherForecastData = useSelector(
    (state) => state.weather.weatherForecastData
  );
  const weatherForecastStatus = useSelector(
    (state) => state.weather.weatherForecastStatus
  );
  const weatherForecastError = useSelector(
    (state) => state.weather.weatherForecastError
  );

  useEffect(() => {
    setWidth(carousel?.current?.scrollWidth - carousel?.current?.offsetWidth);
  }, [weatherForecastData]);

  return (
    <motion.div
      className="hidden md:flex flex-col items-center overflow-x-hidden select-none rounded-md ring-1 ring-gray-200 dark:ring-gray-700"
      ref={carousel}
    >
      <motion.div
        className="flex py-4 h-10rem cursor-grab w-[100vw] max-w-[50rem]"
        whileDrag={{ cursor: "grabbing" }}
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
      >
        {weatherForecastData?.list.map((item, i) => (
          <div
            key={i}
            className=" px-4 flex flex-col justify-between items-center"
          >
            <div className="text-center leading-none">
              {formatAMPM(new Date(item?.dt_txt))}{" "}
              {getDay(item?.dt_txt).slice(0, 3)}
            </div>
            <div className="p-1 pointer-events-none">
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
      </motion.div>
      {weatherForecastStatus === "loading" ? (
        <div className=" absolute bottom-[6rem] dark:text-gray-700 text-gray-300">
          loading...
        </div>
      ) : null}
    </motion.div>
  );
};

export default WeatherForecast;
