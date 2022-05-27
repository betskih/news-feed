import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import constants from '@feed/constants';
import { errorInterceptor } from '@feed/api/errorInterceptor';

const client: AxiosInstance = axios.create({
  timeout: constants.API_REQUEST_TIMEOUT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosRetry(client, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000,
  retryCondition: (err) => err.code === constants.networkError,
});

client.interceptors.response.use(undefined, errorInterceptor);

export default client;
