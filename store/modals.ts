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
  isWithdrawSuccessModalOpen: boolean;
  isSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  isBindBankOpen: boolean;
  openBindBank: () => void;
  closeBindBank: () => void;
}

export type ModalStoreActions = {
  closeWithdrawSuccessModal: () => void;
};

const useModalStore = create<ModalStore & ModalStoreActions>((set) => ({
  isAlertOpen: false,
  isLoginOptionsOpen: false,
  content: {},
  isAnnouncementOpen: false,
  isWithdrawSuccessModalOpen: false,
  isSettingsOpen: false,
  isBindBankOpen: false,
  openAlert: (content) => {
    set((state) => ({ ...state, isAlertOpen: true, content: { ...content } }));
  },
  closeAlert: () => set((state) => ({ ...state, isAlertOpen: false, content: {} })),
  openLoginOptions: () => set((state) => ({ ...state, isLoginOptionsOpen: true })),
  closeLoginOptions: () => set((state) => ({ ...state, isLoginOptionsOpen: false })),
  openAnnouncement: () => set((state) => ({ ...state, isAnnouncementOpen: true })),
  closeAnnouncement: () => set((state) => ({ ...state, isAnnouncementOpen: false })),
  openWithdrawSuccessModal: () => set((state) => ({ ...state, isWithdrawSuccessModalOpen: true })),
  closeWithdrawSuccessModal: () => set((state) => ({ ...state, isWithdrawSuccessModalOpen: false })),
  openSettings: () => set((state) => ({ ...state, isSettingsOpen: true })),
  closeSettings: () => set((state) => ({ ...state, isSettingsOpen: false })),
  openBindBank: () => set((state) => ({ ...state, isBindBankOpen: true })),
  closeBindBank: () => set((state) => ({ ...state, isBindBankOpen: false })),
}));

export default useModalStore;
