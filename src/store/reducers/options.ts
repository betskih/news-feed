import { createAction, createSlice } from '@reduxjs/toolkit';

export const setSection = createAction('options/set-setcion', (section: string) => ({
  payload: { section },
}));

export const setOfflineMode = createAction('options/set-offline', (mode: boolean) => ({
  payload: { mode },
}));

export const setGeoTag = createAction('options/set-geo-tag', (value: string) => ({
  payload: value,
}));

export const setKeyWord = createAction('options/set-key-word', (value: string) => ({
  payload: value,
}));

export type OptionsState = { section: string; offline: boolean; keyWord: string; geoTag: string };

const initialState: OptionsState = { section: 'home', offline: false, keyWord: '', geoTag: '' };

const cacheSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setSection, (state, action) => {
        const { section } = action.payload;
        state.section = section;
      })
      .addCase(setOfflineMode, (state, action) => {
        const { mode } = action.payload;
        state.offline = mode;
      })
      .addCase(setKeyWord, (state, action) => {
        state.keyWord = action.payload;
      })
      .addCase(setGeoTag, (state, action) => {
        state.geoTag = action.payload;
      });
  },
});

export default cacheSlice.reducer;
