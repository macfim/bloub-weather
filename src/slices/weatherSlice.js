import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchWeatherData } from "../api/weatherApi";

export const getWeatherData = createAsyncThunk(
  "weather/getWeatherData",
  async (_, { rejectWithValue, getState }) => {
    try {
      const userPosition = getState().weather.userPosition;

      const weatherData = await fetchWeatherData(userPosition);

      return weatherData.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const initialState = {
  weatherData: null,
  weatherStatus: "idle",
  weatherError: null,
  userPosition: null,
};

const TUN_POS = { lot: 10.1858, lat: 36.8002 };

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setUserPosition(state, action) {
      if (action.payload)
        return {
          ...state,
          userPosition: action.payload,
        };
      else
        return {
          ...state,
          userPosition: TUN_POS,
        };
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
  },
});

export const { setUserPosition } = weatherSlice.actions;
export default weatherSlice.reducer;
