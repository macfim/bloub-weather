import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { getWeatherData, changeUnit } from "../slices/weatherSlice";

import WeatherIcon from "./WeatherIcon";

const TIME = 1000 * 60; // 1min

const Main = () => {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");
  const [inputSize, setInputSize] = useState(1);

  const weatherData = useSelector((state) => state.weather.weatherData);
  const weatherStatus = useSelector((state) => state.weather.weatherStatus);
  const unit = useSelector((state) => state.weather.unit);

  const inputRef = useRef();
  const input = inputRef?.current;

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getWeatherData());
    }, TIME);

    dispatch(getWeatherData());

    return () => clearInterval(interval);
  }, [unit]);

  useEffect(() => {
    if (weatherData) {
      setInputValue(weatherData.name);
    }
  }, [weatherData]);

  useEffect(() => {
    updateSize();
  }, [inputValue]);

  function updateSize() {
    const inputLength = input?.value?.length;

    if (inputLength === 0) setInputSize(1);
    else if (inputLength > 0 && inputLength < 16)
      setInputSize(input?.value?.length);
  }

  return (
    <div className="min-h-screen flex justify-center items-center font-semibold text-gray-500 dark:text-gray-300">
      <div className="h-full flex flex-col items-center justify-center">
        <div className="text-2xl">
          <span>Right now in</span>
          <div className="inline-block">
            <input
              value={inputValue}
              onChange={({ target }) => {
                setInputValue(target.value);
              }}
              size={inputSize}
              ref={inputRef}
              className={`focus:outline-none text-black mx-2 dark:text-white text-center placeholder:text-center bg-inherit border-gray-500 dark:border-gray-300 border-b-2`}
            />
          </div>
          <span>
            , have{" "}
            {weatherData?.weather[0]?.description ? (
              <span className="underline decoration-gray-500 decoration-wavy decoration-1">
                {weatherData.weather[0].description}
              </span>
            ) : (
              "loading"
            )}
            .
          </span>
          <br />
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-auto h-auto w-[16rem]">
            <WeatherIcon />
          </div>
          <div className="flex flex-col items-center justify-center w-[16rem] flex-auto aspect-square">
            <div className="text-[10rem] text-black dark:text-white">
              {weatherData?.main?.temp
                ? Math.floor(weatherData.main.temp)
                : "0"}
            </div>
            <div className="relative top-[-2.5rem]">
              {weatherData?.main?.temp_min
                ? Math.floor(weatherData.main.temp_min)
                : 0}
              <span>{unit === "metric" ? "℃" : "℉"}</span> /{" "}
              {weatherData?.main?.temp_max
                ? Math.floor(weatherData.main.temp_max)
                : 0}
              <span>{unit === "metric" ? "℃" : "℉"}</span>
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
                <span className="text-2xl">
                  {weatherData?.wind?.speed ? weatherData.wind.speed : 0}
                </span>{" "}
                <span className="text-xs">
                  {unit === "metric" ? "m/s" : "mph"}
                </span>
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
                  {weatherData?.visibility ? weatherData.visibility / 1000 : 0}
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
                <span className="text-2xl">
                  {weatherData?.main?.humidity ? weatherData.main.humidity : 0}
                </span>{" "}
                <span className="text-xs">%</span>
              </div>
            </div>
          </div>
        </div>
        <div>days</div>
      </div>
      <div className="absolute bottom-0 flex w-full justify-center">
        <div className="mx-auto pb-4 font-normal">
          <button
            className={`${
              unit === "metric" ? "text-black dark:text-white" : null
            }`}
            onClick={() => dispatch(changeUnit("metric"))}
          >
            &#8451;
          </button>{" "}
          |{" "}
          <button
            className={`${
              unit === "imperial" ? "text-black dark:text-white" : null
            }`}
            onClick={() => dispatch(changeUnit("imperial"))}
          >
            &#8457;
          </button>
        </div>
        <div className="absolute right-1 bottom-1">
          <label className="inline-flex relative items-center cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={() =>
                document.documentElement.classList.contains("dark")
              }
              className="sr-only peer"
              onClick={() => document.documentElement.classList.toggle("dark")}
            />
            <div className="w-11 h-6 bg-gray-200 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-700"></div>
          </label>
        </div>
      </div>
      {weatherStatus === "loading" ? (
        <span className="absolute top-1/3 dark:text-gray-700 text-gray-300">
          loading...
        </span>
      ) : null}
    </div>
  );
};

export default Main;
