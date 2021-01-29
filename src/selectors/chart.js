import { createSelector } from "reselect";
import _ from "underscore";
import { getSelectedLanguages } from "./language";

const selectData = state => state.chart.data;

/**
 * Group total websites views by language.
 *
 * @param data Array<{
 *  tags: Array<{name: string}>;
 *  url: string;
 *  website_views: Array<{ date: string, count: string}>
 * }>
 * @param languages Array<{name: string, displayed: bool}>
 *
 * Return: { language: string, views: number }
 */
export const groupByLanguage = createSelector(
  [selectData, getSelectedLanguages],
  (data, languages) => {

    return Object.entries(
      data
      // Returns language data aggregated in format [{English: 100},...]
      .reduce(
        function(viewsByLanguages, website) {
          var language = website.tags[0].name

          if (!viewsByLanguages.hasOwnProperty(language)) {
            viewsByLanguages[language] = 0;
          }
          var numberOfViewsForThisWebsite = website.website_views
            .reduce(
              (accumulator, currentValue) =>
                accumulator + parseInt(currentValue.count),
              0
            )
          viewsByLanguages[language] += numberOfViewsForThisWebsite
          return viewsByLanguages
        },
        {}
      )
    )
      // reformats the values of the object to fit the expected return format
      .map(
        function(languageData) {

          var formattedLanguageData = {}
          return {language: languageData[0], views: languageData[1]}
        }
      )
      // removes non-selected languages from output
      .filter(
        languageData =>
          languages.some(
            (language) =>
              language.name === languageData.language
          )
      )
  }
);

/**
 * Flattened list of daily views.
 *
 * @param data Array<{
 *  tags: <{name: string}>;
 *  url: string;
 *  website_views: Array<{ date: string, count: number}>
 * }>
 * @param languages Array<{name: string, displayed: bool}>
 *
 *
 * Return: Array<{
 *    count: number;
 *    date: string;
 *    website: string;
 * }>
 */
export const flattenWebsiteViews = createSelector(
  [selectData, getSelectedLanguages],
  (data, languages) => {
    return _.flatten(
      data
        .filter(
          website =>
            website.tags.filter(tag =>
              languages.map(lang => lang.name).includes(tag.name)
            ).length > 0
        )
        .map(website =>
          website.website_views.map(views => {
            return {
              count: views.count,
              date: views.date,
              website: website.url
            };
          })
        )
    );
  }
);
