import { Action, combineReducers } from 'redux';
import news from './reducers/news';
import cache from './reducers/cache';
import options from './reducers/options';
import { AppState } from './types';

const rootReducer = combineReducers<AppState>({
  options,
  //@ts-ignore
  news,
  cache,
});

export default (state: Readonly<AppState>, action: Action) => {
  return rootReducer(state, action);
};
