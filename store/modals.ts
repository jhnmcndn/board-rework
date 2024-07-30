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
  isAuthOpen: boolean;
  isLoginOptionsOpen: boolean;
  openAlert: (newContent: AlertContent) => void;
  openLoginOptions: () => void;
  openAuth: () => void;
  closeAlert: () => void;
  closeLoginTypes: () => void;
  closeAuth: () => void;
  isAnnouncementOpen: boolean;
  isWithdrawSuccessModalOpen: boolean;
}

export type ModalStoreActions = {
  closeWithdrawSuccessModal: () => void;
};

const useModalStore = create<ModalStore & ModalStoreActions>((set) => ({
  isAlertOpen: false,
  isAuthOpen: false,
  isLoginOptionsOpen: false,
  content: {},
  isAnnouncementOpen: false,
  isWithdrawSuccessModalOpen: false,
  openAlert: (content) => {
    set((state) => ({ ...state, isAlertOpen: true, content: { ...content } }));
  },
  closeAlert: () => set((state) => ({ ...state, isAlertOpen: false, content: {} })),
  openLoginOptions: () => set((state) => ({ ...state, isLoginOptionsOpen: true })),
  closeLoginTypes: () => set((state) => ({ ...state, isLoginOptionsOpen: false })),
  openAuth: () => set((state) => ({ ...state, isAuthOpen: true })),
  closeAuth: () => set((state) => ({ ...state, isAuthOpen: false })),
  openAnnouncement: () => set((state) => ({ ...state, isAnnouncementOpen: true })),
  closeAnnouncement: () => set((state) => ({ ...state, isAnnouncementOpen: false })),
  openWithdrawSuccessModal: () => set((state) => ({ ...state, isWithdrawSuccessModalOpen: true })),
  closeWithdrawSuccessModal: () => set((state) => ({ ...state, isWithdrawSuccessModalOpen: false })),
}));

export default useModalStore;
