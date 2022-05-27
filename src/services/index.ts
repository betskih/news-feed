import api from '@feed/api';
import config from '@feed/config';

const getUrl = (path: string) => `${config.BaseUrl}${path}.json?api-key=${config.API_KEY}`;

export default {
  getSomeData: async () => {
    const { data } = await api.get(getUrl('/svc/topstories/v2/automobiles'));
    return data;
  },
};
