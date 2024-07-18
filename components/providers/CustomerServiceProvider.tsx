'use client';

import { createCSStore, CSStore } from '@/store/customerService';
import { createContext, ReactNode, useContext, useRef } from 'react';
import { useStore } from 'zustand';

export type CSStoreApi = ReturnType<typeof createCSStore>;
export type CSStoreProviderProps = Readonly<{ children: ReactNode }>;

export const CSStoreContext = createContext<CSStoreApi | undefined>(undefined);

export const CSStoreProvider = ({ children }: CSStoreProviderProps) => {
  const storeRef = useRef<CSStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createCSStore();
  }
  return <CSStoreContext.Provider value={storeRef.current}>{children}</CSStoreContext.Provider>;
};

export const useCSStore = <T,>(selector: (store: CSStore) => T): T => {
  const storeContext = useContext(CSStoreContext);
  if (!storeContext) throw new Error('useInitStore must be used within InitStoreProvider');
  return useStore(storeContext, selector);
};
