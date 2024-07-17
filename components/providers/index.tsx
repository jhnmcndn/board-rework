import { ReactNode } from 'react';
import { StoreProvider } from './StoreProvider';
import { GameProvider } from './GameProvider';
import { MessageProvider } from './MessageProvider';

export type GlobalProviderProps = Readonly<{ children: ReactNode }>;

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  return (
    <StoreProvider>
      <GameProvider>
        <MessageProvider>{children}</MessageProvider>
      </GameProvider>
    </StoreProvider>
  );
};
