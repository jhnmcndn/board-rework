import useModalStore from '@/store/modals';

export default function useCopyToClipBoard() {
  const { openAlert } = useModalStore();

  const copyToClipboard = (text?: string) => {
    if (text) {
      window.navigator.clipboard.writeText(text);
      openAlert(`已复制: ${text}`);
    } else {
      openAlert(`复制错误`);
    }
  };

  return { copyToClipboard };
}
