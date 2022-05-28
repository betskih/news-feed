import { Action, combineReducers } from 'redux';
import news from './reducers/news';
import { AppState } from './types';

const rootReducer = combineReducers<AppState>({
  //@ts-ignore
  news,
});

export default (state: Readonly<AppState>, action: Action) => {
  return rootReducer(state, action);
};
