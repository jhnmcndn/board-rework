'use client';

import { createStore, Store } from '@/store/game';
import { createContext, ReactNode, useContext, useRef } from 'react';
import { useStore as useZustandStore } from 'zustand';

export type GameApi = ReturnType<typeof createStore>;
export type GameProviderProps = Readonly<{ children: ReactNode }>;

export const GameContext = createContext<GameApi | undefined>(undefined);

export const GameProvider = ({ children }: GameProviderProps) => {
  const storeRef = useRef<GameApi>();
  if (!storeRef.current) {
    storeRef.current = createStore();
  }
  return <GameContext.Provider value={storeRef.current}>{children}</GameContext.Provider>;
};

export const useGameStore = <T,>(selector: (store: Store) => T): T => {
  const gameContext = useContext(GameContext);
  if (!gameContext) throw new Error('useInitStore must be used within InitStoreProvider');
  return useZustandStore(gameContext, selector);
};
