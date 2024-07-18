'use client';

import { AccountStore, createAccountStore } from '@/store/account';
import { createContext, ReactNode, useContext, useRef } from 'react';
import { useStore } from 'zustand';

export type AccountStoreApi = ReturnType<typeof createAccountStore>;
export type AccountStoreProviderProps = Readonly<{ children: ReactNode }>;

export const AccountStoreContext = createContext<AccountStoreApi | undefined>(undefined);

export const AccountStoreProvider = ({ children }: AccountStoreProviderProps) => {
  const storeRef = useRef<AccountStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createAccountStore();
  }
  return <AccountStoreContext.Provider value={storeRef.current}>{children}</AccountStoreContext.Provider>;
};

export const useAccountStore = <T,>(selector: (store: AccountStore) => T): T => {
  const storeContext = useContext(AccountStoreContext);
  if (!storeContext) throw new Error('useInitStore must be used within InitStoreProvider');
  return useStore(storeContext, selector);
};
