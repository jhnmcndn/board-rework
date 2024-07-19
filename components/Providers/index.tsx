import { AccountStoreProvider } from '@/components/Providers/AccountStoreProvider';
import { CSStoreProvider } from '@/components/Providers/CSStoreProvider';
import { GameStoreProvider } from '@/components/Providers/GameStoreProvider';
import { MessageProvider } from '@/components/Providers/MessageStoreProvider';
import { ReactNode } from 'react';

export type GlobalProviderProps = Readonly<{ children: ReactNode }>;

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  return (
    <AccountStoreProvider>
      <GameStoreProvider>
        <MessageProvider>
          <CSStoreProvider>{children}</CSStoreProvider>
        </MessageProvider>
      </GameStoreProvider>
    </AccountStoreProvider>
  );
};
