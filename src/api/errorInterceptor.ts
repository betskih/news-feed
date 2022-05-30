import { AxiosError } from 'axios';
import { store } from '@feed/store';
import { setOfflineMode } from '@feed/store/reducers/options';

export const errorInterceptor = (error: AxiosError) => {
  // @ts-ignore
  store.dispatch(setOfflineMode(true));
  return Promise.reject(error);
};
