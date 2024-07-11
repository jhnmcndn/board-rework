import { create } from 'zustand';

interface AlertContent {
  body?: string | React.ReactNode;
  link?: string;
  notify?: string;
  onClose?: () => void;
}

interface AlertModalStore {
  isOpen: boolean;
  content: AlertContent;
  openAlert: (newContent: AlertContent) => void;
  closeAlert: () => void;
}

const useAlertModalStore = create<AlertModalStore>((set) => ({
  isOpen: false,
  content: {},
  openAlert: (content) => {
    set((state) => ({
      ...state,
      isOpen: true,
      content: { ...content },
    }));
  },
  closeAlert: () => set((state) => ({ ...state, isOpen: false, content: {} })),
}));

export default useAlertModalStore;
