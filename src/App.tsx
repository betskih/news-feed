import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView, StyleSheet } from 'react-native';

import { NewsFeed } from '@feed/scenes';
import { store } from './store';
import useRehydrate from '@feed/store/useRehydrate';

const App = () => {
  useRehydrate();

  return (
    <Provider store={store}>
      <SafeAreaView style={style.container}>
        <NewsFeed />
      </SafeAreaView>
    </Provider>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
