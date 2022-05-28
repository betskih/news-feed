import moment from 'moment';

export const getRelativeTimestamp = (date: string) => {
  const dateValue = moment(date);
  const hoursAhead = moment().diff(dateValue, 'hour');
  return hoursAhead < 23 ? dateValue.fromNow() : dateValue.format('YYYY-MM-DD HH:mm');
};
