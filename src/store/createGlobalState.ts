import { useQuery, useQueryClient } from '@tanstack/react-query';

export type CreateGlobalStateParams<T> = {
  queryKey: unknown;
  queryFn?: () => Promise<T>;
  initialData?: T;
};

export const createGlobalState = <T>({ queryKey, queryFn, initialData }: CreateGlobalStateParams<T>) =>
  function () {
    const queryClient = useQueryClient();
    const query = useQuery({
      queryKey: [queryKey],
      queryFn: queryFn || (() => Promise.resolve(initialData)),
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
    });
    const setQueryData = (data: Partial<T>) => queryClient.setQueryData([queryKey], data);
    const invalidateQueries = () => queryClient.invalidateQueries({ queryKey: [queryKey] });
    const refetchQueries = () => queryClient.refetchQueries({ queryKey: [queryKey] });
    const set = (data: Partial<T>) => {
      setQueryData(data);
    };
    const reset = () => {
      invalidateQueries();
      refetchQueries();
    };
    return { query, set, reset };
  };
