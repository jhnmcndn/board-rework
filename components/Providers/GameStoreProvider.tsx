'use client';

import { createGameStore, GameStore } from '@/store/game';
import { createContext, ReactNode, useContext, useRef } from 'react';
import { useStore } from 'zustand';

export type GameStoreApi = ReturnType<typeof createGameStore>;
export type GameStoreProviderProps = Readonly<{ children: ReactNode }>;

export const GameStoreContext = createContext<GameStoreApi | undefined>(undefined);

export const GameStoreProvider = ({ children }: GameStoreProviderProps) => {
  const gameStoreRef = useRef<GameStoreApi>();
  if (!gameStoreRef.current) {
    gameStoreRef.current = createGameStore();
  }
  return <GameStoreContext.Provider value={gameStoreRef.current}>{children}</GameStoreContext.Provider>;
};

export const useGameStore = <T,>(selector: (store: GameStore) => T): T => {
  const gameStoreContext = useContext(GameStoreContext);
  if (!gameStoreContext) throw new Error('useGameStore must be used within GameStoreProvider');
  return useStore(gameStoreContext, selector);
};
