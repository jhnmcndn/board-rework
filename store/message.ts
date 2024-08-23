import { MessageOnSites } from '@/types/app';
import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

export const initialMessageOnSites = [];

type MessageState = {
  messageOnSites: MessageOnSites[];
};

type MessageActions = {
  setMessageOnSites: (messageOnSites: MessageOnSites[]) => void;
};

export type MessageStore = MessageState & MessageActions;

export const createMessageStore = () =>
  createStore<MessageStore>()(
    persist(
      (set) => ({
        messageOnSites: initialMessageOnSites,
        setMessageOnSites: (messageOnSites) =>
          set((state) => {
            const filteredMessageOnSites = messageOnSites.toSorted((a, b) => {
              if (a.createTime && b.createTime) {
                return a.createTime > b.createTime ? 1 : -1;
              }
              return -1;
            });
            return { ...state, messageOnSites: [...filteredMessageOnSites] };
          }),
      }),
      {
        name: 'message-store',
      },
    ),
  );
