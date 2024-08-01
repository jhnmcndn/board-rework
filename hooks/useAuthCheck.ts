import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useModalStore from '@/store/modals';

const useAuthCheck = () => {
  const { openLoginOptions } = useModalStore();
  const accountInfo = useAccountStore((state) => state.accountInfo);
  const isLoggedIn = !!accountInfo.id;

  const authCheck = (callback: () => void) => {
    if (isLoggedIn) callback();
    else openLoginOptions();
  };

  return { authCheck, isLoggedIn };
};

export default useAuthCheck;
