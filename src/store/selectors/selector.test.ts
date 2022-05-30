import { geCurrentSectionData, getGeoTags } from '@feed/store/selectors/index';

describe('selectors test', () => {
  const rawData = [
    {
      geo_facet: ['item1', 'item2'],
      des_facet: ['d_item1'],
    },
    {
      geo_facet: ['item2'],
    },
    {
      geo_facet: ['item3', 'item4', 'item5'],
      des_facet: [],
    },
    {
      geo_facet: [],
      des_facet: ['d_item2'],
    },
  ];
  const section: any = {
    data: rawData,
  };
  it('getGeoTags', () => {
    // @ts-ignore
    const result = getGeoTags({ options: { section: 'home' }, news: { arts: {}, home: section } });
    expect(result).toEqual({ geoTags: ['item1', 'item2', 'item3', 'item4', 'item5'], keyWords: ['d_item1', 'd_item2'] });
  });

  it('geCurrentSectionData without filters', () => {
    const options = { section: 'home', keyWord: '', geoTag: '', offline: false };
    const result = geCurrentSectionData({ options: options, news: { arts: {}, home: section } });
    expect(result).toEqual(rawData);
  });

  it('geCurrentSectionData with geo filter', () => {
    const options = { section: 'home', keyWord: '', geoTag: 'item2', offline: false };
    const result = geCurrentSectionData({ options: options, news: { arts: {}, home: section } });
    expect(result).toEqual([
      {
        geo_facet: ['item1', 'item2'],
        des_facet: ['d_item1'],
      },
      {
        geo_facet: ['item2'],
      },
    ]);
  });

  it('geCurrentSectionData with both filters', () => {
    const options = { section: 'home', keyWord: 'd_item1', geoTag: 'item2', offline: false };
    const result = geCurrentSectionData({ options: options, news: { arts: {}, home: section } });
    expect(result).toEqual([
      {
        geo_facet: ['item1', 'item2'],
        des_facet: ['d_item1'],
      },
    ]);
  });
});
