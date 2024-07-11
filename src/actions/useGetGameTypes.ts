import { getGameTypes } from '@/api/gameApp';
import { API_ENDPOINT } from '@/types/enums';
import { useQuery } from '@tanstack/react-query';

export const useGetGameTypes = () =>
  useQuery({
    queryKey: [API_ENDPOINT.GAME_TYPES],
    queryFn: getGameTypes,
  });
