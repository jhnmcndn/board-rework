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
  isLoginTypesOpen: boolean;
  openAlert: (newContent: AlertContent) => void;
  openLoginTypes: () =>  void;
  openAuth: () => void;
  closeAlert: () => void;
  closeLoginTypes: () =>  void;
  closeAuth: () => void;
  isAnnouncementOpen: boolean;
  isWithdrawSuccessModalOpen: boolean;
}

export type ModalStoreActions = {
  closeWithdrawSuccessModal: () => void;
}

const useModalStore = create<ModalStore & ModalStoreActions>((set) => ({
  isAlertOpen: false,
  isAuthOpen: false,
  isLoginTypesOpen: false,
  content: {},
  isAnnouncementOpen: false,
  isWithdrawSuccessModalOpen: false,
  openAlert: (content) => {
    set((state) => ({ ...state, isAlertOpen: true, content: { ...content } }));
  },
  closeAlert: () => set((state) => ({ ...state, isAlertOpen: false, content: {} })),
  openLoginTypes: () => set((state) => ({ ...state, isLoginTypesOpen: true })),
  closeLoginTypes: () => set((state) => ({ ...state, isLoginTypesOpen: false })),
  openAuth: () => set((state) => ({ ...state, isAuthOpen: true })),
  closeAuth: () => set((state) => ({ ...state, isAuthOpen: false })),
  openAnnouncement: () => set((state) => ({ ...state, isAnnouncementOpen: true })),
  closeAnnouncement: () => set((state) => ({ ...state, isAnnouncementOpen: false })),
  openWithdrawSuccessModal: () => set((state) => ({ ...state, isWithdrawSuccessModalOpen: true })),
  closeWithdrawSuccessModal: () => set((state) => ({ ...state, isWithdrawSuccessModalOpen: false })),
}));

export default useModalStore;
