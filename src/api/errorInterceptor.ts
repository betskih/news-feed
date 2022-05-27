import { AxiosError } from 'axios';

export const errorInterceptor = (error: AxiosError) => {
  //TODO Error handling
  return Promise.reject(error);
};
