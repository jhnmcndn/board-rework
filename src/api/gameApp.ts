import { APP_ROUTE } from '@/types/enums';
import { GetGameTypes, RootResponse } from '@/types/response';
import { AxiosResponse } from 'axios';
import { request } from './request';

export const getGameTypes = async () => {
  const response: AxiosResponse<RootResponse<GetGameTypes>> =
    await request.post(APP_ROUTE.GAME_APP + 'getGameTypes');
  const { data } = response.data;
  return data;
};
