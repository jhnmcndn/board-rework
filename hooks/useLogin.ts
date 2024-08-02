import { getIp } from '@/api';
import { loginDevice } from '@/api/platform';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useModalStore from '@/store/modals';
import { generateMachineCode, getDeviceInfo, getFromLocalStorage } from '@/utils/helpers';

type LoginMethod = 'device' | 'user-pass' | 'captcha';

const useLogin = () => {
  const phoneModel = getDeviceInfo();
  const deviceId = generateMachineCode();
  const { openAlert, closeLoginOptions } = useModalStore();
  const inviterCode = getFromLocalStorage('channelCode');
  const { setAccountInfo, setAccountNow } = useAccountStore((state) => state);
  const validate = null;

  const login = async (loginMethod: LoginMethod = 'device') => {
    const ip = await getIp();
    loginDevice({ inviterCode, deviceId, ip, phoneModel, validate }).then((res) => {
      if (res && !('message' in res)) {
        // setShowAnnouncementModal(true);
        // setShowBindWithdrawModal(true);
        setAccountInfo(res);
        closeLoginOptions();
        setAccountNow({ balance: res.accountNow });
        res.token && localStorage.setItem('token', res.token);
      } else {
        openAlert({ body: res?.message });
      }
    });
  };

  return { login };
};

export default useLogin;
