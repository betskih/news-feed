import React, { useCallback, useMemo } from 'react';
import { FlatList, Platform, ScrollView, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import SelectorItem from './SelectorItem';
import constants, { labels } from '@feed/constants';
import { Sections, SectionType } from '@feed/types/apiTypes';
import { setSection } from '@feed/store/reducers/options';
import { getCurrentSection } from '@feed/store/selectors';

export default () => {
  const sections = useMemo(() => Object.keys(Sections), []);
  const activeSection = useSelector(getCurrentSection);
  const dispatch = useDispatch();
  const onSelect = useCallback(
    (value: keyof typeof Sections) => {
      dispatch(setSection(Sections[value]));
    },
    [dispatch],
  );

  const keyExtractor = useCallback((item: string) => item, []);
  const renderItem = useCallback(
    ({ item }: { item: SectionType }) => {
      return <SelectorItem label={item} onPress={onSelect} isSelected={Sections[item] === activeSection} />;
    },
    [onSelect, activeSection],
  );

  const listRender = useCallback(() => {
    return (
      <FlatList
        contentContainerStyle={style.sections}
        data={sections}
        //@ts-ignore
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={Math.ceil(sections.length / 2)}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  }, [keyExtractor, renderItem, sections]);

  return (
    <LinearGradient style={style.container} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#ccccdd', '#eeeeee']}>
      <Text style={style.sectionText}>{labels.section}</Text>
      {Platform.OS === 'ios' ? (
        listRender()
      ) : (
        <ScrollView horizontal showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          {listRender()}
        </ScrollView>
      )}
    </LinearGradient>
  );
};

const style = StyleSheet.create({
  container: {
    height: 130,
  },
  sectionText: {
    margin: constants.gridStep,
  },

  sections: {
    alignSelf: 'flex-start',
    height: 95,
  },
});
