import { Action } from '@reduxjs/toolkit';
import { takeEvery, call, put, select, all } from 'redux-saga/effects';
import _ from 'lodash';
import { fetchNews, fetchNewsError, fetchNewsSuccess, NewsState } from '@feed/store/reducers/news';
import services from '@feed/services';
import { ApiResponse, NewsItemType } from '@feed/types/apiTypes';
import { getLastUpdateBySection } from '@feed/store/selectors';
import { cacheAdd, cacheClear, cacheRemove } from '@feed/store/reducers/cache';
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
  if (!url) {
    return;
  }
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

function* cleanCache() {
  const news: NewsState = yield select((state) => state.news);
  let allUrls: Array<string> = [];
  _.forEach(news, (value) => {
    value.data.forEach((item: NewsItemType) => allUrls.push(item.url));
  });
  let keys: Array<string> = yield AsyncStorage.getAllKeys();
  keys = keys.filter((key) => key !== 'persist:root');
  const keysToRemove: Array<string> = [];
  keys.forEach((key) => {
    if (!allUrls.includes(key)) {
      keysToRemove.push(key);
    }
  });
  yield all(keysToRemove.map((item) => put(cacheRemove(item))));
}

export default function* () {
  yield takeEvery(fetchNews, fetchNewsWorker);
  yield takeEvery(cacheAdd, cacheAddWorker);
  yield takeEvery(cacheRemove, cacheRemoveWorker);
  yield takeEvery(cacheClear, cleanCache);
}
