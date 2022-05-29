import { Action } from '@reduxjs/toolkit';
import { takeEvery, call, put, select } from 'redux-saga/effects';
import { fetchNews, fetchNewsError, fetchNewsSuccess } from '@feed/store/reducers/news';
import services from '@feed/services';
import { ApiResponse } from '@feed/types/apiTypes';
import { getLastUpdateBySection } from '@feed/store/selectors';
import { cacheAdd, cacheRemove } from '@feed/store/reducers/cache';
import AsyncStorage from '@react-native-async-storage/async-storage';

function* fetchNewsWorker(action: Action) {
  if (!fetchNews.match(action)) {
    return;
  }
  const newsSection = action.payload.newsSection;
  try {
    // @ts-ignore
    const data: ApiResponse = yield call(services.getNewsBySection, newsSection);
    const lastUpdated: string = yield select(getLastUpdateBySection(newsSection));
    if (data.last_updated !== lastUpdated) {
      yield put(
        fetchNewsSuccess({
          section: newsSection,
          last_updated: data.last_updated,
          data: data.results,
        }),
      );
    }
  } catch (e) {
    yield put(fetchNewsError(e));
  }
}

function* cacheAddWorker(action: Action) {
  if (!cacheAdd.match(action)) {
    return;
  }
  const { url, html } = action.payload;
  const keys: Array<string> = yield AsyncStorage.getAllKeys();
  if (!keys.includes(url)) {
    yield AsyncStorage.setItem(url, html);
  }
}

function* cacheRemoveWorker(action: Action) {
  if (!cacheRemove.match(action)) {
    return;
  }
  const { url } = action.payload;
  const keys: Array<string> = yield AsyncStorage.getAllKeys();
  if (keys.includes(url)) {
    yield AsyncStorage.removeItem(url);
  }
}

export default function* () {
  yield takeEvery(fetchNews, fetchNewsWorker);
  yield takeEvery(cacheAdd, cacheAddWorker);
  yield takeEvery(cacheRemove, cacheRemoveWorker);
}
