import { createSlice } from "@reduxjs/toolkit";
import _ from "underscore";
import { API_DOMAIN } from "../../constants";
import { fetchChartData } from "../chart/chartSlice";

export const languageSlice = createSlice({
  name: "language",
  initialState: {
    tags: {}
  },
  reducers: {
    select: (state, action) => {
      const selectedTag = state.tags.find(tag => tag.name === action.payload);
      selectedTag.displayed = !selectedTag.displayed;
    },
    add: (state, action) => {
      state.tags = _.map(action.payload, language => {
        return { name: language.name, displayed: false };
      });
    }
  }
});

export const fetchTagData = () => {
  return dispatch => {
    fetch(`${API_DOMAIN}/tags`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then(res => res.json())
      .then(languages => {
        dispatch(languageSlice.actions.add(languages));
      });
  };
};

export const fetchSelectedLanguages = name => {
  return dispatch => {
    dispatch(languageSlice.actions.select(name));
    dispatch(fetchChartData(name));
  };
};

export default languageSlice.reducer;
