import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  fetchWeatherData,
  fetchWeatherForecastData,
  fetchGeocoding,
} from "../api/weatherApi";

import { getCurrentLocation } from "../utils/getLocation";

export const getWeatherData = createAsyncThunk(
  "weather/getWeatherData",
  async (_, { rejectWithValue, getState }) => {
    try {
      const location = getState().weather.location;
      const unit = getState().weather.unit;

      const weatherData = await fetchWeatherData(location, unit);

      return weatherData.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const getWeatherForecastData = createAsyncThunk(
  "weather/getWeatherForecastData",
  async (_, { rejectWithValue, getState }) => {
    try {
      const location = getState().weather.location;
      const unit = getState().weather.unit;

      const weatherForecastData = await fetchWeatherForecastData(
        location,
        unit
      );

      return weatherForecastData.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const getLocation = createAsyncThunk(
  "weather/getLocation",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const searchValue = getState().weather.searchValue;

      const location = await fetchGeocoding(searchValue);

      if (location.data.length === 0)
        return rejectWithValue("city name not found");

      return [
        {
          lat: location.data[0].lat,
          lon: location.data[0].lon,
        },
        location.data[0].local_names.en,
      ];
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserLocation = createAsyncThunk(
  "weather/getUserLocation",
  async (_, { rejectWithValue }) => {
    try {
      const location = await getCurrentLocation();

      return { lat: location.coords.latitude, lon: location.coords.longitude };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const initialState = {
  searchValue: "Hammam Sousse",

  weatherData: null,
  weatherStatus: "idle",
  weatherError: null,

  weatherForecastData: null,
  weatherForecastStatus: "idle",
  weatherForecastError: null,

  location: { lat: 35.8245029, lon: 10.5886908 },
  locationStatus: "idle",
  locationError: null,

  unit: "metric",
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    changeUnit(state, action) {
      state.unit = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
  extraReducers: {
    // getWeatherData
    [getWeatherData.pending]: (state, action) => {
      state.weatherStatus = "loading";
    },
    [getWeatherData.fulfilled]: (state, action) => {
      state.weatherStatus = "success";
      state.weatherData = action.payload;
    },
    [getWeatherData.rejected]: (state, action) => {
      state.weatherStatus = "failed";
      state.weatherError = action.payload;
    },

    // getWeatherForecastData
    [getWeatherForecastData.pending]: (state, action) => {
      state.weatherForecastStatus = "loading";
    },
    [getWeatherForecastData.fulfilled]: (state, action) => {
      state.weatherForecastStatus = "success";
      state.weatherForecastData = action.payload;
    },
    [getWeatherForecastData.rejected]: (state, action) => {
      state.weatherForecastStatus = "failed";
      state.weatherForecastError = action.payload;
    },

    // getLocation
    [getLocation.pending]: (state, action) => {
      state.locationStatus = "loading";
    },
    [getLocation.fulfilled]: (state, action) => {
      state.locationStatus = "success";
      state.location = action.payload[0];
      state.searchValue = action.payload[1];
    },
    [getLocation.rejected]: (state, action) => {
      state.locationStatus = "error";
      state.locationError = action.payload;
    },

    // getUserLocation
    [getUserLocation.pending]: (state, action) => {
      state.locationStatus = "loading";
      state.searchValue = "loading";
    },
    [getUserLocation.fulfilled]: (state, action) => {
      state.locationStatus = "success";
      state.location = action.payload;
      state.searchValue = "Current";
    },
    [getUserLocation.rejected]: (state, action) => {
      state.locationStatus = "error";
      state.searchValue = "error";
      state.locationError = action.payload;
    },
  },
});

export const { changeUnit, setSearchValue } = weatherSlice.actions;
export default weatherSlice.reducer;
