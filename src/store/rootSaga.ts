import { spawn, take } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist';
import newsSaga from './sagas/news';

export default function* rootSaga() {
  yield take(REHYDRATE);
  yield spawn(newsSaga);
  yield take('APP_READY');
}
