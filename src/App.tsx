import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView } from 'react-native';

import { NewsFeed } from '@feed/scenes';
import { store } from './store';
import useRehydrate from '@feed/store/useRehydrate';

const App = () => {
  useRehydrate();

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <NewsFeed />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
