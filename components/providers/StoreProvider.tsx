'use client';

import { createStore, Store } from '@/store';
import { createContext, ReactNode, useContext, useRef } from 'react';
import { useStore as useZustandStore } from 'zustand';

export type StoreApi = ReturnType<typeof createStore>;
export type StoreProviderProps = Readonly<{ children: ReactNode }>;

export const StoreContext = createContext<StoreApi | undefined>(undefined);

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const storeRef = useRef<StoreApi>();
  if (!storeRef.current) {
    storeRef.current = createStore();
  }
  return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
};

export const useStore = <T,>(selector: (store: Store) => T): T => {
  const storeContext = useContext(StoreContext);
  if (!storeContext) throw new Error('useInitStore must be used within InitStoreProvider');
  return useZustandStore(storeContext, selector);
};
