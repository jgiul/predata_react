import { createSelector } from "reselect";
import _ from "underscore";

export const getLanguages = state => state.language.tags;

export const getSelectedLanguages = createSelector(
  [getLanguages],
  languages => {
    return _.filter(languages, tag => tag.displayed);
  }
);
