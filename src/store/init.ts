import type { Init, InitState } from '@/types/app';
import { create } from 'zustand';

const initialInitState = {
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

export const useInitStore = create<InitState>()((set) => ({
  init: initialInitState,
  setInit: (init) => set((state) => ({ init: { ...state.init, ...init } })),
}));
