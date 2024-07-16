import { request } from '@/api';
import { Init, RootResponse } from '@/types/app';
import { API_ENDPOINT, APP_ROUTE } from '@/types/enums';
import { getToken } from '@/utils/getToken';

export const init = async () => {
  const data = await request<RootResponse<Init>>({
    route: APP_ROUTE.PLATFORM,
    endpoint: API_ENDPOINT.INIT,
    body: {
      token: getToken(),
      id: getToken(),
    },
  });
  return data.data;
};
