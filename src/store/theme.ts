import { ThemeState } from '@/types/app';
import { THEME } from '@/types/enums';
import { create } from 'zustand';

const initialTheme = THEME.BLACK_GOLD;

export const useThemeStore = create<ThemeState>()((set) => ({
  theme: initialTheme,
  setTheme: (theme) => set(() => ({ theme })),
}));
