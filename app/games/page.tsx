import { request } from '@/api';
import { RootResponse } from '@/types/app';
import { API_ENDPOINT, APP_ROUTE } from '@/types/enums';
import { JoinGameParams } from '@/types/fns';
import { getToken } from '@/utils/getToken';
import { FC } from 'react';
import Games from './Games';

type Props = {
  searchParams: {
    id: string;
  };
};

const page: FC<Props> = async ({ searchParams }) => {
  const joinGame: JoinGameParams = async (id) => {
    let body = {
      id,
    };
    const response = await request<RootResponse<string>>({
      route: APP_ROUTE.GAME,
      endpoint: API_ENDPOINT.JOIN_GAME,
      body,
      tags: API_ENDPOINT.JOIN_GAME,
      otherHeaders: {
        token: getToken() || '',
      },
    });
    return response.data;
  };

  const id = await joinGame(searchParams.id);

  return <Games gameId={id} />;
};

export default page;
