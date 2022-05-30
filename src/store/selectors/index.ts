import _ from 'lodash';
import { AppState } from '@feed/store/types';
import { createSelector } from '@reduxjs/toolkit';
import { NewsState } from '@feed/store/reducers/news';
import { NewsItemType } from '@feed/types/apiTypes';

export const getLastUpdateBySection = (section: string) => (state: AppState) =>
  _.get(state, ['news', section, 'last_updated'], '');

export const getCurrentSection = (state: AppState) => state.options.section;
export const getNews = (state: AppState) => state.news;
export const isOfflineMode = (state: AppState) => state.options.offline;
export const getCachedItems = (state: AppState) => state.cache;
export const getFilters = (state: AppState) => ({ geoTag: state.options.geoTag, keyWord: state.options.keyWord });
export const geCurrentSectionData = createSelector(
  getCurrentSection,
  getNews,
  getFilters,
  (section: string, news: NewsState, filters) => {
    const { geoTag, keyWord } = filters;
    // @ts-ignore
    const raw = news[section]?.data || [];
    const withGeo = geoTag ? raw.filter((item: NewsItemType) => item.geo_facet?.includes(geoTag)) : raw;
    return keyWord ? withGeo.filter((item: NewsItemType) => item.des_facet?.includes(keyWord)) : withGeo;
  },
);

export const isAbleToView = (url: string) =>
  createSelector(isOfflineMode, getCachedItems, (offline, items) => {
    return (offline && items.includes(url)) || !offline;
  });

export const getGeoTags = createSelector(getNews, getCurrentSection, (news, selection) => {
  // @ts-ignore
  const currentSection: Array<NewsItemType> = news[selection]?.data;
  const geoTags = currentSection.reduce((acc: Array<string>, item: NewsItemType) => {
    return acc.concat(item.geo_facet);
  }, []);

  const keyWords = currentSection.reduce((acc: Array<string>, item: NewsItemType) => {
    return acc.concat(item.des_facet);
  }, []);

  return { geoTags: _.uniq(geoTags).sort(), keyWords: _.uniq(keyWords).sort() };
});
