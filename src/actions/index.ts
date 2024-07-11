import { getAccountInfo, getGameTypes } from '@/api/gameApp';
import { init } from '@/api/platformApp';
import { initialAccountInfoState } from '@/store/useAccountStore';
import { initialInitState } from '@/store/useAppStore';
import { API_ENDPOINT } from '@/types/enums';
import { useQuery } from '@tanstack/react-query';

export const useGetAccountInfo = () =>
  useQuery({
    queryKey: [API_ENDPOINT.ACCOUNT_INFO],
    queryFn: getAccountInfo,
    initialData: initialAccountInfoState,
  });

export const useGetGameTypes = () =>
  useQuery({
    queryKey: [API_ENDPOINT.GAME_TYPES],
    queryFn: getGameTypes,
  });

export const useInit = () =>
  useQuery({
    queryKey: [API_ENDPOINT.INIT],
    queryFn: init,
    initialData: initialInitState,
  });
