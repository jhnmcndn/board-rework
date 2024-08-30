import { create } from 'zustand';

interface ModalStore {
  alertContent: string;
  isAlertOpen: boolean;
  openAlert: (newContent: string | undefined) => void;
  closeAlert: () => void;
  isShareOpen: boolean;
  isLoginOptionsOpen: boolean;
  openLoginOptions: () => void;
  closeLoginOptions: () => void;
  isAnnouncementOpen: boolean;
  openAnnouncement: () => void;
  closeAnnouncement: () => void;
  isBindBankOpen: boolean;
  openBindBank: () => void;
  closeBindBank: () => void;
  isBindUSDTOpen: boolean;
  openBindUSDT: () => void;
  closeBindUSDT: () => void;
  isWithdrawSuccessOpen: boolean;
  openWithdrawSuccess: () => void;
  closeWithdrawSuccess: () => void;
  isVersionOpen: boolean;
  openVersion: () => void;
  closeVersion: () => void;
  isPassCodeOpen: boolean;
  openPassCode: () => void;
  closePassCode: () => void;
  isCommissionOpen: boolean;
  openCommission: () => void;
  closeCommission: () => void;
  openShare: () => void;
  closeShare: () => void;
  openSidebarAnnouncement: number;
  setSidebarAnnouncement: (openSidebarAnnouncement: number) => void;
  openContentAnnouncement: number;
  setContentAnnouncement: (openContentAnnouncement: number) => void;
}

export type ModalStoreActions = {};

const useModalStore = create<ModalStore & ModalStoreActions>((set) => ({
  isAlertOpen: false,
  isLoginOptionsOpen: false,
  alertContent: '',
  isAnnouncementOpen: false,
  isBindBankOpen: false,
  isBindUSDTOpen: false,
  isWithdrawSuccessOpen: false,
  isVersionOpen: false,
  isPassCodeOpen: false,
  isCommissionOpen: false,
  isShareOpen: false,
  openSidebarAnnouncement: 0,
  openContentAnnouncement: 0,
  openAlert: (alertContent?) => {
    set((state) => ({ ...state, isAlertOpen: true, alertContent: alertContent || '出了点问题' }));
  },
  closeAlert: () => set((state) => ({ ...state, isAlertOpen: false, alertContent: '' })),
  openLoginOptions: () => set((state) => ({ ...state, isLoginOptionsOpen: true })),
  closeLoginOptions: () => set((state) => ({ ...state, isLoginOptionsOpen: false })),
  openAnnouncement: () => set((state) => ({ ...state, isAnnouncementOpen: true })),
  closeAnnouncement: () => set((state) => ({ ...state, isAnnouncementOpen: false })),
  openBindBank: () => set((state) => ({ ...state, isBindBankOpen: true })),
  closeBindBank: () => set((state) => ({ ...state, isBindBankOpen: false })),
  openBindUSDT: () => set((state) => ({ ...state, isBindUSDTOpen: true })),
  closeBindUSDT: () => set((state) => ({ ...state, isBindUSDTOpen: false })),
  openWithdrawSuccess: () => set((state) => ({ ...state, isWithdrawSuccessOpen: true })),
  closeWithdrawSuccess: () => set((state) => ({ ...state, isWithdrawSuccessOpen: false })),
  openVersion: () => set((state) => ({ ...state, isVersionOpen: true })),
  closeVersion: () => set((state) => ({ ...state, isVersionOpen: false })),
  openPassCode: () => set((state) => ({ ...state, isPassCodeOpen: true })),
  closePassCode: () => set((state) => ({ ...state, isPassCodeOpen: false })),
  openCommission: () => set((state) => ({ ...state, isCommissionOpen: true })),
  closeCommission: () => set((state) => ({ ...state, isCommissionOpen: false })),
  openShare: () => set((state) => ({ ...state, isShareOpen: true })),
  closeShare: () => set((state) => ({ ...state, isShareOpen: false })),
  setSidebarAnnouncement: (openSidebarAnnouncement) => set(() => ({ openSidebarAnnouncement })),
  setContentAnnouncement: (openContentAnnouncement) => set(() => ({ openContentAnnouncement })),
}));

export default useModalStore;
