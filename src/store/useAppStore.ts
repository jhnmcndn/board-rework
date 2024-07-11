import type { Init } from '@/types/app';
import { THEME } from '@/types/enums';
import { create } from 'zustand';

export const initialInitState = {
  latestVersion: null,
  latestFore: null,
  downUrl: null,
  hasNew: false,
  updateText: null,
  customerUrl: '',
  customerUrl2: '',
  webUrl: '',
  starPic: '',
  heCai6: {
    reds: [],
    blue: [],
    green: [],
  },
  captchaId: '',
  actionSwitch: '',
  productId: '',
  firstRechargeUrl: '',
} satisfies Init;

interface AppStore {
  init: Init;
  theme: THEME;
  musicState: boolean;
  setInit: (init: Init) => void;
  setTheme: (theme: THEME) => void;
  setMusic: (music: boolean) => void;
}

export const useAppStore = create<AppStore>()((set) => ({
  init: initialInitState,
  theme: THEME.BLACK_GOLD,
  musicState: true,
  setInit: (init) => set((state) => ({ init: { ...state.init, ...init } })),
  setTheme: (theme) => set(() => ({ theme })),
  setMusic: (music) => set(() => ({ musicState: music })),
}));
