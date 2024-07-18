import { CSStoreProvider } from '@/components/providers/CustomerServiceProvider';
import { GameProvider } from '@/components/providers/GameProvider';
import { MessageProvider } from '@/components/providers/MessageProvider';
import { StoreProvider } from '@/components/providers/StoreProvider';
import { ReactNode } from 'react';

export type GlobalProviderProps = Readonly<{ children: ReactNode }>;

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  return (
    <StoreProvider>
      <GameProvider>
        <MessageProvider>
          <CSStoreProvider>{children}</CSStoreProvider>
        </MessageProvider>
      </GameProvider>
    </StoreProvider>
  );
};
