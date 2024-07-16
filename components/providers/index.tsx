import { ReactNode } from 'react';
import { StoreProvider } from './StoreProvider';
import { GameProvider } from './GameProvider';

export type GlobalProviderProps = Readonly<{ children: ReactNode }>;

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  return (
    <StoreProvider>
      <GameProvider>{children}</GameProvider>
    </StoreProvider>
  );
};
