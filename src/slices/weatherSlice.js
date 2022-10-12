import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
  weatherData: null,
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
  extraReducers: {},
});

export const { setUserPosition } = weatherSlice.actions;
export default weatherSlice.reducer;
