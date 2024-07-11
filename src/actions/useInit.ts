import { init } from '@/api/platformApp';
import { initialInitState } from '@/store/init';
import { API_ENDPOINT } from '@/types/enums';
import { useQuery } from '@tanstack/react-query';

export const useInit = () =>
  useQuery({
    queryKey: [API_ENDPOINT.INIT],
    queryFn: init,
    initialData: initialInitState,
  });
