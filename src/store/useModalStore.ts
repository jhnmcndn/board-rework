import { create } from 'zustand';

interface AlertContent {
  body?: string | React.ReactNode;
  link?: string;
  notify?: string;
  onClose?: () => void;
}

interface ModalStore {
  isAuthOpen: boolean;
  isOpen: boolean;
  content: AlertContent;
  openAuth: () => void;
  openAlert: (newContent: AlertContent) => void;
  closeAuth: () => void;
  closeAlert: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isAuthOpen: false,
  isOpen: false,
  content: {},
  openAlert: (content) => {
    set((state) => ({ ...state, isOpen: true, content: { ...content } }));
  },
  closeAlert: () => set((state) => ({ ...state, isOpen: false, content: {} })),
  openAuth: () => set((state) => ({ ...state, isAuthOpen: true })),
  closeAuth: () => set((state) => ({ ...state, isAuthOpen: false })),
}));

export default useModalStore;
