import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useModalStore from '@/store/modals';
import { getFromLocalStorage } from '@/utils/helpers';

const useAuthCheck = () => {
  const token = getFromLocalStorage('token');
  const { openLoginOptions } = useModalStore();
  const accountInfo = useAccountStore((state) => state.accountInfo);
  const isLoggedIn = !!accountInfo.id && !!token;

  const authCheck = (callback: () => void) => {
    if (isLoggedIn) callback();
    else openLoginOptions();
  };

  return { authCheck, isLoggedIn };
};

export default useAuthCheck;
