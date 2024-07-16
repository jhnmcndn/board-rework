import { ReactNode } from 'react';
import { StoreProvider } from './StoreProvider';

export type GlobalProviderProps = Readonly<{ children: ReactNode }>;

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  return <StoreProvider>{children}</StoreProvider>;
};
