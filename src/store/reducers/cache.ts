import { createAction, createSlice } from '@reduxjs/toolkit';

export const cacheAdd = createAction('cache/add', (url: string, html: string) => ({
  payload: { url, html },
}));

export const cacheRemove = createAction('cache/remove', (url: string) => ({
  payload: { url },
}));

export type CacheState = Array<string>;

const initialState: CacheState = [];

const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cacheAdd, (state, action) => {
        const { url } = action.payload;
        if (!state.includes(url)) {
          return [...state, url];
        }
        return state;
      })
      .addCase(cacheRemove, (state, action) => {
        const { url } = action.payload;
        return state.filter((item) => item !== url);
      });
  },
});

export default cacheSlice.reducer;
