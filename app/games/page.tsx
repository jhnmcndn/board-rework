import { request } from '@/api';
import { RootResponse } from '@/types/app';
import { API_ENDPOINT, APP_ROUTE } from '@/types/enums';
import { JoinGameParams } from '@/types/fns';
import { getToken } from '@/utils/getToken';
import { redirect } from 'next/navigation';
import { FC } from 'react';
import Games from './Games';

type Props = {
  searchParams: {
    id: string;
  };
};

const GamesPage: FC<Props> = async ({ searchParams }) => {
  const joinGame: JoinGameParams = async (id) => {
    const response = await request<RootResponse<string>>({
      route: APP_ROUTE.GAME,
      endpoint: API_ENDPOINT.JOIN_GAME,
      body: { id },
      tags: API_ENDPOINT.JOIN_GAME,
      otherHeaders: {
        token: getToken() || '',
      },
    });
    return response.data;
  };

  const gameUrl = await joinGame(searchParams.id);

  if (typeof gameUrl === 'string') return <Games gameUrl={gameUrl} />;

  redirect('/');
};

export default GamesPage;
