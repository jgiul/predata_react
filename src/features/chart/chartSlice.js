import { createSlice } from "@reduxjs/toolkit";
import { API_DOMAIN } from "../../constants";

export const chartSlice = createSlice({
  name: "chart",
  initialState: {
    data: [],
    date: "2019-04-11"
  },
  reducers: {
    add: (state, action) => {
      state.data = action.payload;
    }
  }
});

export const fetchChartData = language => {
  return dispatch => {
    fetch(`${API_DOMAIN}/websites?=${language}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(res => res.json())
      .then(websites => {
        dispatch(chartSlice.actions.add(websites));
      });
  };
};

export default chartSlice.reducer;
