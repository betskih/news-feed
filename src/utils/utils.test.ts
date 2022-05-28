import { getRelativeTimestamp } from '@feed/utils/utils';

export {};

describe('getRelativeTimestamp test', () => {
  it('show only minutes', () => {
    const t = getRelativeTimestamp('2022-05-26T23:40:31-04:00');
    console.log(t);
  });
});
