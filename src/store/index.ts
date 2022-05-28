import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, Persistor } from 'redux-persist';
import rootReducer from './rootReducer';
import createPersistConfig from './persistConfig';

const store: EnhancedStore = configureStore({
  // @ts-ignore
  reducer: persistReducer(createPersistConfig(), rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
const persistor: Persistor = persistStore(store);

export { store, persistor };
