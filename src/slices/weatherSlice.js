import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
  weatherData: null,
  userPosition: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setUserPosition(state, action) {
      return {
        ...state,
        userPosition: action.payload,
      };
    },
  },
  extraReducers: {},
});

export const { setUserPosition } = weatherSlice.actions;
export default weatherSlice.reducer;
