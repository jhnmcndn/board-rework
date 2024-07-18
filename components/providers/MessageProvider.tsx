'use client';

import { createStore, Store } from '@/store/message';
import { createContext, ReactNode, useContext, useRef } from 'react';
import { useStore } from 'zustand';

export type MessageApi = ReturnType<typeof createStore>;
export type MessageProviderProps = Readonly<{ children: ReactNode }>;

export const MessageContext = createContext<MessageApi | undefined>(undefined);

export const MessageProvider = ({ children }: MessageProviderProps) => {
  const storeRef = useRef<MessageApi>();
  if (!storeRef.current) {
    storeRef.current = createStore();
  }
  return <MessageContext.Provider value={storeRef.current}>{children}</MessageContext.Provider>;
};

export const useMessageStore = <T,>(selector: (store: Store) => T): T => {
  const messageContext = useContext(MessageContext);
  if (!messageContext) throw new Error('useInitStore must be used within InitStoreProvider');
  return useStore(messageContext, selector);
};
