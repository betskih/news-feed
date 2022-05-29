import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import constants, { colors, labels } from '@feed/constants';
import { NewsList, SectionSelector } from '@feed/components';
import NewsDetails from '@feed/components/NewsDetails/NewsDetails';
import BottomSheet from '@feed/components/BottomSheet/BottomSheet';
import { useDispatch, useSelector } from 'react-redux';
import { geCurrentSectionData, getCurrentSection } from '@feed/store/selectors';
import { fetchNews } from '@feed/store/reducers/news';

export default () => {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const currentSection: string = useSelector(getCurrentSection);
  const data = useSelector(geCurrentSectionData);
  const [currentUrl, setUrl] = useState('');

  const getData = useCallback(() => {
    dispatch(fetchNews(currentSection));
  }, [dispatch, currentSection]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handlePress = useCallback((url: string) => {
    setUrl(url);
    setShowDetails(true);
  }, []);

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text style={style.headerText}>{labels.title}</Text>
      </View>
      <SectionSelector />
      <NewsList data={data} onPress={handlePress} />
      <BottomSheet visible={showDetails} onDismiss={() => setShowDetails(false)}>
        {currentUrl && <NewsDetails url={currentUrl} />}
      </BottomSheet>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: 40,
    backgroundColor: colors.header,
    justifyContent: 'center',
    paddingLeft: constants.gridStep,
  },

  headerText: {
    color: colors.white,
    fontSize: 18,
  },

  sectionText: {
    marginTop: constants.gridStep,
    marginLeft: constants.gridStep,
  },

  sections: {},
});
