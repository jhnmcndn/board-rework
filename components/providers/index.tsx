import { AccountStoreProvider } from '@/components/providers/AccountStoreProvider';
import { CSStoreProvider } from '@/components/providers/CustomerServiceProvider';
import { GameProvider } from '@/components/providers/GameProvider';
import { MessageProvider } from '@/components/providers/MessageProvider';
import { ReactNode } from 'react';

export type GlobalProviderProps = Readonly<{ children: ReactNode }>;

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  return (
    <AccountStoreProvider>
      <GameProvider>
        <MessageProvider>
          <CSStoreProvider>{children}</CSStoreProvider>
        </MessageProvider>
      </GameProvider>
    </AccountStoreProvider>
  );
};
