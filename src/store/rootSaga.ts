import { spawn, take, put } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist';
import newsSaga from './sagas/news';
import { cacheClear } from '@feed/store/reducers/cache';

export default function* rootSaga() {
  yield take(REHYDRATE);
  yield spawn(newsSaga);
  yield put(cacheClear());
}
