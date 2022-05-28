import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import services from '@feed/services';
import constants, { colors, labels } from '@feed/constants';
import { NewsItem, SectionSelector } from '@feed/components';
import type { NewsItemType } from '@feed/types/apiTypes';

const mockItem: NewsItemType = {
  section: 'business',
  subsection: '',
  title: 'Stellantis and Samsung to spend $2.5 billion on an electric vehicle battery plant in Indiana.',
  abstract: 'The automaker, which owns Jeep and Ram, is seeking to catch up in a global race to build electric cars and trucks.',
  url: 'https://www.nytimes.com/2022/05/24/business/stellantis-samsung-indiana-battery-plant.html',
  uri: 'nyt://article/48aadf54-924b-5e58-8b03-301f7eb1af1d',
  byline: 'By Neal E. Boudette',
  item_type: 'Article',
  updated_date: '2022-05-25T15:10:44-04:00',
  created_date: '2022-05-24T16:44:31-04:00',
  published_date: '2022-05-27T16:44:31-04:00',
  material_type_facet: '',
  kicker: '',
  des_facet: ['Electric and Hybrid Vehicles', 'Batteries', 'Factories and Manufacturing', 'Automobiles'],
  org_facet: ['Stellantis NV', 'Samsung Group'],
  per_facet: [],
  geo_facet: ['Indiana'],
  multimedia: [
    {
      url: 'https://static01.nyt.com/images/2022/05/24/business/24economy-briefing-stellantis-plant/merlin_189033171_43470c3b-d18b-4c9d-8f3d-7b679f42471b-threeByTwoSmallAt2X.jpg',
      format: 'threeByTwoSmallAt2X',
      height: 400,
      width: 600,
      type: 'image',
      subtype: 'photo',
      caption:
        'Stellantis, which owns Jeep, above, joins several other automakers in the race to build battery plants and introduce new electric models. ',
      copyright: 'Bill Pugliano/Getty Images',
    },
    {
      url: 'https://static01.nyt.com/images/2022/05/24/business/24economy-briefing-stellantis-plant/merlin_189033171_43470c3b-d18b-4c9d-8f3d-7b679f42471b-thumbLarge.jpg',
      format: 'Large Thumbnail',
      height: 150,
      width: 150,
      type: 'image',
      subtype: 'photo',
      caption:
        'Stellantis, which owns Jeep, above, joins several other automakers in the race to build battery plants and introduce new electric models. ',
      copyright: 'Bill Pugliano/Getty Images',
    },
  ],
  short_url: 'https://nyti.ms/3MKzozn',
};

export default () => {
  const [data, setData] = useState<any>(null);

  const getData = useCallback(() => {
    services.getSomeData().then((data) => setData(data));
  }, []);

  return (
    <View>
      <View style={style.header}>
        <Text style={style.headerText}>{labels.title}</Text>
      </View>
      <SectionSelector />
      <View style={{ height: 300, backgroundColor: '#7799FF' }}>
        <NewsItem item={mockItem} />
      </View>
      <TouchableOpacity onPress={getData}>
        <Text>Get Data</Text>
      </TouchableOpacity>
      {data && <Text>{data.results[0].title}</Text>}
    </View>
  );
};

const style = StyleSheet.create({
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
