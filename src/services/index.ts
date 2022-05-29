import api from '@feed/api';
import config from '@feed/config';
import { ApiResponse, SectionType } from '@feed/types/apiTypes';

const getUrl = (path: string) => `${config.BaseUrl}${path}.json?api-key=${config.API_KEY}`;

export default {
  getNewsBySection: async (section: SectionType): Promise<ApiResponse> => {
    const { data } = await api.get(getUrl(`/svc/topstories/v2/${section}`));
    return data;
  },
};
