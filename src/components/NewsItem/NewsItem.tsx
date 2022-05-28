import React, { useMemo } from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import type { NewsItemType } from '@feed/types/apiTypes';
import constants, { colors, labels } from '@feed/constants';
import { getRelativeTimestamp } from '@feed/utils/utils';

interface Props {
  item: NewsItemType;
}

export default (props: Props) => {
  const { item } = props;

  const image = useMemo(() => {
    let img: any = { width: 9999999, url: '' };
    item.multimedia.forEach((imgItem) => {
      if (imgItem.width < img.width) {
        return (img = { width: imgItem.width, url: imgItem.url });
      }
    });
    return { uri: img.url };
  }, [item]);

  return (
    <TouchableOpacity style={style.container}>
      <Image source={image} resizeMode={'cover'} style={style.image} />
      <View style={style.infoContainer}>
        <Text numberOfLines={4} ellipsizeMode="tail" style={style.title}>
          {item.title}
        </Text>
        <View>
          <Text numberOfLines={1} ellipsizeMode="tail" style={style.info}>
            {item.byline}
          </Text>
          <Text style={style.info}>{`${labels.published} ${getRelativeTimestamp(item.published_date)}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 150,
    marginVertical: constants.gridStep / 2,
    marginHorizontal: constants.gridStep,
    borderRadius: constants.gridStep / 2,
    padding: constants.gridStep,
    backgroundColor: colors.white,
    overflow: 'hidden',
  },

  title: {
    fontSize: 18,
    color: colors.header1,
  },

  image: {
    width: '30%',
    marginRight: constants.gridStep,
  },

  infoContainer: {
    width: '65%',
    marginLeft: constants.gridStep,
    justifyContent: 'space-between',
  },

  info: {
    marginTop: constants.gridStep / 2,
    color: colors.header1,
    fontSize: 12,
  },
});
