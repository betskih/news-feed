import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { NewsItemType } from '@feed/types/apiTypes';
import { NewsItem } from '@feed/components';
import constants, { colors } from '@feed/constants';
import { useSelector } from 'react-redux';
import { isOfflineMode } from '@feed/store/selectors';

interface Props {
  data: Array<NewsItemType>;
  onPress?: (url: string) => void;
}

export default (props: Props) => {
  const { data, onPress } = props;
  useSelector(isOfflineMode);

  const renderItem = useCallback(
    ({ item }: { item: NewsItemType }) => {
      return <NewsItem item={item} onPress={onPress} />;
    },
    [onPress],
  );

  return <FlatList contentContainerStyle={style.contentContainer} data={data} renderItem={renderItem} listKey="uri" />;
};

const style = StyleSheet.create({
  contentContainer: {
    backgroundColor: colors.list,
    paddingVertical: constants.gridStep,
    flexGrow: 1,
  },
});
