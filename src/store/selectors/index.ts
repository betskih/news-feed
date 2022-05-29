import _ from 'lodash';
import { AppState } from '@feed/store/types';
import { createSelector } from '@reduxjs/toolkit';
import { NewsState } from '@feed/store/reducers/news';

export const getLastUpdateBySection = (section: string) => (state: AppState) =>
  _.get(state, ['news', section, 'last_updated'], '');

export const getCurrentSection = (state: AppState) => state.options.section;
export const getNews = (state: AppState) => state.news;

export const geCurrentSectionData = createSelector(
  getCurrentSection,
  getNews,
  // @ts-ignore
  (section: string, news: NewsState) => news[section]?.data || [],
);
