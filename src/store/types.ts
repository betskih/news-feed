import { NewsState } from '@feed/store/reducers/news';
import { OptionsState } from '@feed/store/reducers/options';

export type AppState = {
  options: OptionsState;
  news: NewsState;
  cache: Array<string>;
};
