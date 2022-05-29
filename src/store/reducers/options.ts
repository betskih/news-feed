import { createAction, createSlice } from '@reduxjs/toolkit';

export const setSection = createAction('options/set-setcion', (section: string) => ({
  payload: { section },
}));

export const setOfflineMode = createAction('options/set-offline', (mode: boolean) => ({
  payload: { mode },
}));

export type OptionsState = { section: string; offline: boolean };

const initialState: OptionsState = { section: 'home', offline: false };

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
      });
  },
});

export default cacheSlice.reducer;
