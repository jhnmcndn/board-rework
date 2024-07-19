'use client';

import { AccountStore, createAccountStore } from '@/store/account';
import { createContext, ReactNode, useContext, useRef } from 'react';
import { useStore } from 'zustand';

export type AccountStoreApi = ReturnType<typeof createAccountStore>;
export type AccountStoreProviderProps = Readonly<{ children: ReactNode }>;

export const AccountStoreContext = createContext<AccountStoreApi | undefined>(undefined);

export const AccountStoreProvider = ({ children }: AccountStoreProviderProps) => {
  const accountStoreRef = useRef<AccountStoreApi>();
  if (!accountStoreRef.current) {
    accountStoreRef.current = createAccountStore();
  }
  return <AccountStoreContext.Provider value={accountStoreRef.current}>{children}</AccountStoreContext.Provider>;
};

export const useAccountStore = <T,>(selector: (store: AccountStore) => T): T => {
  const accountStoreContext = useContext(AccountStoreContext);
  if (!accountStoreContext) throw new Error('useAccountStore must be used within AccountStoreProvider');
  return useStore(accountStoreContext, selector);
};
