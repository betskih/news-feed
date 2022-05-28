import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SelectorItem from './SelectorItem';
import constants, { labels } from '@feed/constants';
import { Sections, SectionType } from '@feed/types/apiTypes';

export default () => {
  const sections = useMemo(() => Object.keys(Sections), []);
  const [activeSection, setActiveSection] = useState<SectionType>('Home');
  const onSelect = useCallback((value: keyof typeof Sections) => {
    setActiveSection(value);
  }, []);

  const keyExtractor = useCallback((item: string) => item, []);
  const renderItem = useCallback(
    ({ item }: { item: SectionType }) => {
      return <SelectorItem label={item} onPress={onSelect} isSelected={item === activeSection} />;
    },
    [onSelect, activeSection],
  );

  return (
    <LinearGradient style={style.container} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#ccccff', '#eeeeee']}>
      <Text style={style.sectionText}>{labels.section}</Text>
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
