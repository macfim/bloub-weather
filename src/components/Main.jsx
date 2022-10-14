import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getWeatherData } from "../slices/weatherSlice";

import WeatherIcon from "./WeatherIcon";

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWeatherData());
  }, []);

  const weatherData = useSelector((state) => state.weather.weatherData);
  const weatherStatus = useSelector((state) => state.weather.weatherStatus);

  if (weatherStatus !== "success") return <div>loading...</div>;
  else
    return (
      <div className="min-h-screen flex justify-center items-center z-[-10] font-semibold text-gray-500 dark:text-gray-300">
        <div className="h-full flex flex-col items-center justify-center">
          <div className="text-2xl">
            <span>Right now in</span>
            <input
              className={`focus:outline-none text-black w-20 px-2 bg-inherit border-b-2`}
              placeholder={weatherData.name}
            />
            <span>, it have {weatherData.weather[0].main}.</span>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex-auto h-auto w-[16rem]">
              <WeatherIcon />
            </div>
            <div className="flex flex-col items-center justify-center w-[16rem] flex-auto aspect-square">
              <div className="text-[10rem] text-black dark:text-white">
                {Math.floor(weatherData.main.temp)}
              </div>
              <div className="relative top-[-2.5rem]">
                {Math.floor(weatherData.main.temp_min)}
                <span>&deg;C</span> / {Math.floor(weatherData.main.temp_max)}
                <span>&deg;C</span>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-[16rem] gap-4 flex-auto aspect-square">
              <div className="flex gap-4 items-center w-36">
                <img
                  className="w-8 h-auto grayscale"
                  src="/images/wicon/Wind.png"
                  alt="wind"
                />
                <div>
                  <span className="text-2xl">{weatherData.wind.speed}</span>{" "}
                  <span className="text-xs">m/s</span>
                </div>
              </div>
              <div className="flex gap-4 items-center w-36">
                <img
                  className="w-8 h-auto grayscale"
                  src="/images/wicon/802_4.png"
                  alt="visibility"
                />
                <div>
                  <span className="text-2xl">
                    {weatherData.visibility / 1000}
                  </span>{" "}
                  <span className="text-xs">km</span>
                </div>
              </div>
              <div className="flex gap-4 items-center w-36">
                <img
                  className="w-8 h-auto grayscale"
                  src="/images/wicon/Cloud.png"
                  alt="wind"
                />
                <div>
                  <span className="text-2xl">{weatherData.main.humidity}</span>{" "}
                  <span className="text-xs">%</span>
                </div>
              </div>
            </div>
          </div>
          <div>days</div>
        </div>
        <div className="absolute bottom-0 flex w-full justify-center">
          
          <div className="absolute right-1 bottom-1">
            <label className="inline-flex relative items-center cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={true}
                className="sr-only peer"
                onClick={({ target }) =>
                  document.documentElement.classList.toggle("dark")
                }
              />
              <div className="w-11 h-6 bg-gray-200 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    );
};

export default Main;