import { request } from '@/api';
import { AccountInfo, RootResponse } from '@/types/app';
import { API_ENDPOINT, APP_ROUTE } from '@/types/enums';

export const getAccountInfo = async () => {
  const data = await request<RootResponse<AccountInfo>>({
    route: APP_ROUTE.GAME,
    endpoint: API_ENDPOINT.ACCOUNT_INFO,
  });
  return data.data;
};
