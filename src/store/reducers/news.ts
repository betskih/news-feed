import { NewsItemType } from '@feed/types/apiTypes';
import { createSlice, createAction } from '@reduxjs/toolkit';

interface Article extends NewsItemType {
  md5: string;
}

export type NewsState = {
  arts: Array<Article>;
  automobiles: Array<Article>;
  books: Array<Article>;
  business: Array<Article>;
  fashion: Array<Article>;
  food: Array<Article>;
  health: Array<Article>;
  home: Array<Article>;
  insider: Array<Article>;
  magazine: Array<Article>;
  movies: Array<Article>;
  nyregion: Array<Article>;
  obituaries: Array<Article>;
  opinion: Array<Article>;
  politics: Array<Article>;
  realestate: Array<Article>;
  science: Array<Article>;
  sports: Array<Article>;
  sundayreview: Array<Article>;
  technology: Array<Article>;
  theater: Array<Article>;
  't-magazine': Array<Article>;
  ravel: Array<Article>;
  upshot: Array<Article>;
  us: Array<Article>;
};
const initialState = {
  arts: [],
  automobiles: [],
  books: [],
  business: [],
  fashion: [],
  food: [],
  health: [],
  home: [],
  insider: [],
  magazine: [],
  movies: [],
  nyregion: [],
  obituaries: [],
  opinion: [],
  politics: [],
  realestate: [],
  science: [],
  sports: [],
  sundayreview: [],
  technology: [],
  theater: [],
  't-magazine': [],
  ravel: [],
  upshot: [],
  us: [],
};

const fetchNews = createAction('news/fetch', (newsSection: string) => ({
  payload: { newsSection },
}));

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNews, (state, action) => {
      return state;
    });
  },
});

export default newsSlice.reducer;
