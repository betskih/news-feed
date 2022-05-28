export const Sections = {
  Arts: 'arts',
  Automobiles: 'automobiles',
  Books: 'books',
  Business: 'business',
  Fashion: 'fashion',
  Food: 'food',
  Health: 'health',
  Home: 'home',
  Insider: 'insider',
  Magazine: 'magazine',
  Movies: 'movies',
  'NY Region': 'nyregion',
  Obituaries: 'obituaries',
  Opinion: 'opinion',
  Politics: 'politics',
  Realestate: 'realestate',
  Science: 'science',
  Sports: 'sports',
  Sundayreview: 'sundayreview',
  Technology: 'technology',
  Theater: 'theater',
  'T-Magazine': 't-magazine',
  Travel: 'travel',
  Upshot: 'upshot',
  US: 'us',
  World: 'world',
};

export type SectionType = keyof typeof Sections;

export type MultimediaItem = {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
};

export type NewsItemType = {
  section: string;
  subsection: string;
  title: string;
  abstract: string;
  url: string;
  uri: string;
  byline: string;
  item_type: string;
  updated_date: string;
  created_date: string;
  published_date: string;
  material_type_facet: string;
  kicker: string;
  des_facet: Array<string>;
  org_facet: Array<string>;
  per_facet: Array<string>;
  geo_facet: Array<string>;
  multimedia: Array<MultimediaItem>;
  short_url: string;
};
