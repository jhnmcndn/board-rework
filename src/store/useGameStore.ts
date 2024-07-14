import { Game, GameState } from '@/types/app';
import { create } from 'zustand';

export const activeSideBarItem = {
  id: 0,
  name: '',
  icon: '',
  type: 0,
};

export const initialGameState = {
  activeSideBarItem,
} satisfies Game;

export const useGameStore = create<GameState>()((set) => ({
  game: initialGameState,
  setActiveSideBarItem: (activeSideBarItem) =>
    set((state) => ({ game: { ...state.game, activeSideBarItem: activeSideBarItem } })),
}));
