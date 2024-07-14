import { GameState } from '@/types/app';
import { create } from 'zustand';

export const initialActiveSideBarItem = {
  id: 0,
  name: '',
  icon: '',
  type: 0,
};

export const useGameStore = create<GameState>()((set) => ({
  activeSideBarItem: initialActiveSideBarItem,
  gameInfoGroup: [],
  setActiveSideBarItem: (activeSideBarItem) => set(() => ({ activeSideBarItem })),
}));
