import { create } from 'zustand';

interface AlertContent {
  body?: string | React.ReactNode;
  link?: string;
  notify?: string;
  onClose?: () => void;
}

interface ModalStore {
  content: AlertContent;
  isAlertOpen: boolean;
  isLoginOptionsOpen: boolean;
  openAlert: (newContent: AlertContent) => void;
  openLoginOptions: () => void;
  closeAlert: () => void;
  closeLoginOptions: () => void;
  isAnnouncementOpen: boolean;
  isSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  isBindBankOpen: boolean;
  openBindBank: () => void;
  closeBindBank: () => void;
  isBindUSDTOpen: boolean;
  openBindUSDT: () => void;
  closeBindUSDT: () => void;
  isWithdrawSuccessOpen: boolean;
  openWithdrawSuccess: () => void;
  closeWithdrawSuccess: () => void;
}

export type ModalStoreActions = {};

const useModalStore = create<ModalStore & ModalStoreActions>((set) => ({
  isAlertOpen: false,
  isLoginOptionsOpen: false,
  content: {},
  isAnnouncementOpen: false,
  isSettingsOpen: false,
  isBindBankOpen: false,
  isBindUSDTOpen: false,
  isWithdrawSuccessOpen: false,
  openAlert: (content) => {
    set((state) => ({ ...state, isAlertOpen: true, content: { ...content } }));
  },
  closeAlert: () => set((state) => ({ ...state, isAlertOpen: false, content: {} })),
  openLoginOptions: () => set((state) => ({ ...state, isLoginOptionsOpen: true })),
  closeLoginOptions: () => set((state) => ({ ...state, isLoginOptionsOpen: false })),
  openAnnouncement: () => set((state) => ({ ...state, isAnnouncementOpen: true })),
  closeAnnouncement: () => set((state) => ({ ...state, isAnnouncementOpen: false })),
  openSettings: () => set((state) => ({ ...state, isSettingsOpen: true })),
  closeSettings: () => set((state) => ({ ...state, isSettingsOpen: false })),
  openBindBank: () => set((state) => ({ ...state, isBindBankOpen: true })),
  closeBindBank: () => set((state) => ({ ...state, isBindBankOpen: false })),
  openBindUSDT: () => set((state) => ({ ...state, isBindUSDTOpen: true })),
  closeBindUSDT: () => set((state) => ({ ...state, isBindUSDTOpen: false })),
  openWithdrawSuccess: () => set((state) => ({ ...state, isWithdrawSuccessOpen: true })),
  closeWithdrawSuccess: () => set((state) => ({ ...state, isWithdrawSuccessOpen: false })),
}));

export default useModalStore;
