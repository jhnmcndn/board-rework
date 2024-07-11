import { getAccountInfo } from '@/api/gameApp';
import { initialAccountInfoState } from '@/store/accountInfo';
import { API_ENDPOINT } from '@/types/enums';
import { useQuery } from '@tanstack/react-query';

export const useGetAccountInfo = () =>
  useQuery({
    queryKey: [API_ENDPOINT.ACCOUNT_INFO],
    queryFn: getAccountInfo,
    initialData: initialAccountInfoState,
  });
