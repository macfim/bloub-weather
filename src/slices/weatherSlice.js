import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchWeatherData } from "../api/weatherApi";
import { getLocation } from "../utils/getLocation";

export const getWeatherData = createAsyncThunk(
  "weather/getWeatherData",
  async (_, { rejectWithValue, getState }) => {
    try {
      const userLocation = getState().weather.userLocation;

      const weatherData = await fetchWeatherData(userLocation);

      return weatherData.data;
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
      const location = await getLocation();

      return { lat: location.coords.latitude, lon: location.coords.longitude };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const initialState = {
  weatherData: null,
  weatherStatus: "idle",
  weatherError: null,
  userLocation: { lat: 35.8245029, lon: 10.5886908 },
  userLocationStatus: "idle",
  userLocationError: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
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

    // getUserLocation
    [getUserLocation.pending]: (state, action) => {
      state.userLocationStatus = "loading";
    },
    [getUserLocation.fulfilled]: (state, action) => {
      state.userLocationStatus = "success";
      state.userLocation = action.payload;
    },
    [getUserLocation.rejected]: (state, action) => {
      state.userLocationStatus = "error";
      state.userLocationError = action.payload;
    },
  },
});

export const {} = weatherSlice.actions;
export default weatherSlice.reducer;
