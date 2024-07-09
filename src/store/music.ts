import { Music, MusicState } from '@/types/app';
import { create } from 'zustand';

const initialPlayState = {
  music: true,
  pop: true,
} satisfies Music;

export const useMusicStore = create<MusicState>()((set) => ({
  playState: initialPlayState,
  setMusic: (play) =>
    set((state) => ({ playState: { ...state.playState, music: play } })),
  setPop: (play) =>
    set((state) => ({ playState: { ...state.playState, pop: play } })),
}));
