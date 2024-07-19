'use client';

import { createMessageStore, MessageStore } from '@/store/message';
import { createContext, ReactNode, useContext, useRef } from 'react';
import { useStore } from 'zustand';

export type MessageApi = ReturnType<typeof createMessageStore>;
export type MessageProviderProps = Readonly<{ children: ReactNode }>;

export const MessageContext = createContext<MessageApi | undefined>(undefined);

export const MessageProvider = ({ children }: MessageProviderProps) => {
  const storeRef = useRef<MessageApi>();
  if (!storeRef.current) {
    storeRef.current = createMessageStore();
  }
  return <MessageContext.Provider value={storeRef.current}>{children}</MessageContext.Provider>;
};

export const useMessageStore = <T,>(selector: (store: MessageStore) => T): T => {
  const messageContext = useContext(MessageContext);
  if (!messageContext) throw new Error('useInitStore must be used within MessageStoreProvider');
  return useStore(messageContext, selector);
};
