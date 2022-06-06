import React, { useCallback, useMemo } from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import styled from 'styled-components';
import type { NewsItemType } from '@feed/types/apiTypes';
import constants, { colors, labels } from '@feed/constants';
import { getRelativeTimestamp } from '@feed/utils/utils';
import { isAbleToView } from '@feed/store/selectors';
import { useSelector } from 'react-redux';

interface Props {
  item: NewsItemType;
  onPress?: (url: string) => void;
}
const InfoText = styled.Text`
  margin-top: ${constants.gridStep / 2}px;
  color: ${colors.header1};
  font-size: 12px;
`;
export default (props: Props) => {
  const { item, onPress } = props;
  const canView = useSelector(isAbleToView(item.url));

  const image = useMemo(() => {
    let img: any = { width: 9999999, url: '' };
    item?.multimedia?.forEach((imgItem) => {
      if (imgItem.width < img.width) {
        return (img = { width: imgItem.width, url: imgItem.url });
      }
    });
    return { uri: img.url };
  }, [item]);

  const handlePress = useCallback(() => {
    onPress && onPress(item.url);
  }, [onPress, item]);

  if (!item.title || !item.url.includes('http')) {
    return null;
  }

  return (
    <TouchableOpacity style={[style.container, !canView && style.disabled]} onPress={handlePress} disabled={!canView}>
      {!!image.uri && <Image source={image} resizeMode={'cover'} style={style.image} />}
      <View style={style.infoContainer}>
        <Text numberOfLines={4} ellipsizeMode="tail" style={style.title}>
          {item.title}
        </Text>
        <View>
          <InfoText numberOfLines={1} ellipsizeMode="tail">
            {item.byline}
          </InfoText>
          <InfoText>{`${labels.published} ${getRelativeTimestamp(item.published_date)}`}</InfoText>
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

  disabled: {
    opacity: 0.2,
  },
});
