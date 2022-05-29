import { NewsItemType } from '@feed/types/apiTypes';
import { createSlice, createAction } from '@reduxjs/toolkit';

interface SectionState {
  last_updated: string;
  data: Array<NewsItemType>;
}

export type NewsState = {
  arts: SectionState;
  automobiles: SectionState;
  books: SectionState;
  business: SectionState;
  fashion: SectionState;
  food: SectionState;
  health: SectionState;
  home: SectionState;
  insider: SectionState;
  magazine: SectionState;
  movies: SectionState;
  nyregion: SectionState;
  obituaries: SectionState;
  opinion: SectionState;
  politics: SectionState;
  realestate: SectionState;
  science: SectionState;
  sports: SectionState;
  sundayreview: SectionState;
  technology: SectionState;
  theater: SectionState;
  't-magazine': SectionState;
  ravel: SectionState;
  upshot: SectionState;
  us: SectionState;
};
const initialSectionState = { last_updated: '', data: [] };
const initialState = {
  arts: initialSectionState,
  automobiles: initialSectionState,
  books: initialSectionState,
  business: initialSectionState,
  fashion: initialSectionState,
  food: initialSectionState,
  health: initialSectionState,
  home: initialSectionState,
  insider: initialSectionState,
  magazine: initialSectionState,
  movies: initialSectionState,
  nyregion: initialSectionState,
  obituaries: initialSectionState,
  opinion: initialSectionState,
  politics: initialSectionState,
  realestate: initialSectionState,
  science: initialSectionState,
  sports: initialSectionState,
  sundayreview: initialSectionState,
  technology: initialSectionState,
  theater: initialSectionState,
  't-magazine': initialSectionState,
  ravel: initialSectionState,
  upshot: initialSectionState,
  us: initialSectionState,
};

export const fetchNews = createAction('news/fetch', (newsSection: string) => ({
  payload: { newsSection },
}));

export const fetchNewsError = createAction('news/fetch-error', (error: any) => ({ payload: { error } }));
export const fetchNewsSuccess = createAction('news/fetch-success', (data: any) => ({ payload: data }));

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNewsSuccess, (state, action) => {
      const { section, last_updated, data } = action.payload;
      // @ts-ignore
      return { ...state, [section]: { last_updated, data } };
    });
  },
});

export default newsSlice.reducer;
