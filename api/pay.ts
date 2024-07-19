import { request } from '@/api';
import { BindCardList, RootResponse } from '@/types/app';
import { API_ENDPOINT, APP_ROUTE } from '@/types/enums';

export const getBindCardList = async () => {
  const data = await request<RootResponse<BindCardList>>({
    route: APP_ROUTE.PAY,
    endpoint: API_ENDPOINT.BIND_CARD_LIST,
    tags: API_ENDPOINT.BIND_CARD_LIST,
  });
  return data.data;
};