import { create } from 'zustand';

interface AlertContent {
  body?: string | React.ReactNode;
  link?: string;
  notify?: string;
  onClose?: () => void;
}

interface ModalStore {
  isAlertOpen: boolean;
  isAuthOpen: boolean;
  content: AlertContent;
  openAuth: () => void;
  openAlert: (newContent: AlertContent) => void;
  closeAuth: () => void;
  closeAlert: () => void;
  isAnnouncementOpen: boolean;
}

const useModalStore = create<ModalStore>((set) => ({
  isAlertOpen: false,
  isAuthOpen: false,
  content: {},
  isAnnouncementOpen: false,
  openAlert: (content) => {
    set((state) => ({ ...state, isAlertOpen: true, content: { ...content } }));
  },
  closeAlert: () => set((state) => ({ ...state, isAlertOpen: false, content: {} })),
  openAuth: () => set((state) => ({ ...state, isAuthOpen: true })),
  closeAuth: () => set((state) => ({ ...state, isAuthOpen: false })),
  openAnnouncement: () => set((state) => ({ ...state, isAnnouncementOpen: true })),
  closeAnnouncement: () => set((state) => ({ ...state, isAnnouncementOpen: false })),
}));

export default useModalStore;
