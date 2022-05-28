import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PersistConfig } from 'redux-persist';
import type { AppState } from './types';

const createPersistConfig = (): PersistConfig<AppState> => ({
  version: 0,
  key: 'root',
  storage: AsyncStorage,
  throttle: 60,
});

export default createPersistConfig;
