'use client';

import { createPersonalInfoStore, PersonalInfoStore } from '@/store/personalInfo';
import { createContext, ReactNode, useContext, useRef } from 'react';
import { useStore } from 'zustand';

export type PersonalInfoStoreApi = ReturnType<typeof createPersonalInfoStore>;
export type PersonalInfoStoreProviderProps = Readonly<{ children: ReactNode }>;

export const PersonalInfoStoreContext = createContext<PersonalInfoStoreApi | undefined>(undefined);

export const PersonalInfoStoreProvider = ({ children }: PersonalInfoStoreProviderProps) => {
  const personalInfoStoreRef = useRef<PersonalInfoStoreApi>();
  if (!personalInfoStoreRef.current) {
    personalInfoStoreRef.current = createPersonalInfoStore();
  }
  return (
    <PersonalInfoStoreContext.Provider value={personalInfoStoreRef.current}>
      {children}
    </PersonalInfoStoreContext.Provider>
  );
};

export const usePersonalInfoStore = <T,>(selector: (store: PersonalInfoStore) => T): T => {
  const personalInfoStoreContext = useContext(PersonalInfoStoreContext);
  if (!personalInfoStoreContext) throw new Error('usePersonalInfoStore must be used within PersonalInfoStoreProvider');
  return useStore(personalInfoStoreContext, selector);
};
