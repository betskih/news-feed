import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, Persistor } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import createPersistConfig from './persistConfig';
import rootSaga from './rootSaga';

export const sagaMiddleware = createSagaMiddleware();

const store: EnhancedStore = configureStore({
  // @ts-ignore
  reducer: persistReducer(createPersistConfig(), rootReducer),
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

const persistor: Persistor = persistStore(store);

export { store, persistor };
