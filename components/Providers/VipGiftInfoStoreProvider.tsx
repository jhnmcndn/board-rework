'use client';

import { createVipGiftInfoStore, VIPGiftInfoStore } from '@/store/vipGiftInfo';
import { createContext, ReactNode, useContext, useRef } from 'react';
import { useStore } from 'zustand';

export type VIPGiftInfoStoreApi = ReturnType<typeof createVipGiftInfoStore>;

export type VIPGiftInfoStoreProviderProps = Readonly<{ children: ReactNode }>;

export const VipGiftInfoStoreContext = createContext<VIPGiftInfoStoreApi | undefined>(undefined);

export const VipGiftInfoStoreProvider = ({ children }: VIPGiftInfoStoreProviderProps) => {
  const vipGiftInfoStoreRef = useRef<VIPGiftInfoStoreApi>();
  if (!vipGiftInfoStoreRef.current) {
    vipGiftInfoStoreRef.current = createVipGiftInfoStore();
  }
  return (
    <VipGiftInfoStoreContext.Provider value={vipGiftInfoStoreRef.current}>{children}</VipGiftInfoStoreContext.Provider>
  );
};

export const useVipGiftInfoStore = <T,>(selector: (store: VIPGiftInfoStore) => T): T => {
  const vipGiftInfoStoreContext = useContext(VipGiftInfoStoreContext);
  if (!vipGiftInfoStoreContext) throw new Error('useVipGiftInfoStore must be used within VipGiftInfoStoreProvider');
  return useStore(vipGiftInfoStoreContext, selector);
};
