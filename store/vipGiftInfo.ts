import { getVipGiftInfo } from '@/api/platform';
import { VIPGiftInfo } from '@/types/app';
import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

export const initialVipGiftInfoState = {
  levelBonusStatus: 0,
  weekBonusStatus: 0,
  vipSetList: [],
} satisfies VIPGiftInfo;

export type VIPGiftInfoState = {
  vipGiftInfo: VIPGiftInfo;
};

export type VIPGiftInfoAction = {
  setVipGiftInfo: (vipGiftInfo: VIPGiftInfo) => void;
  fetchVipGiftInfo: () => void;
};

export type VIPGiftInfoStore = VIPGiftInfoState & VIPGiftInfoAction;

export const createVipGiftInfoStore = () =>
  createStore<VIPGiftInfoStore>()(
    persist(
      (set) => ({
        vipGiftInfo: initialVipGiftInfoState,
        setVipGiftInfo: (vipGiftInfo) => set(() => ({ vipGiftInfo })),
        fetchVipGiftInfo: async () => {
          const vipGiftInfo = await getVipGiftInfo();
          if (!vipGiftInfo || 'message' in vipGiftInfo) return set(() => ({ vipGiftInfo: initialVipGiftInfoState }));
          return set(() => ({ vipGiftInfo }));
        },
      }),
      {
        name: 'vip-gift-info-store',
      },
    ),
  );
