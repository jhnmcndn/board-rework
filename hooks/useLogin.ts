import { getIp } from '@/api';
import { loginDevice, loginPhoneNumber } from '@/api/platform';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useModalStore from '@/store/modals';
import { AccountInfo, ErrorData, RootResponse } from '@/types/app';
import { generateDeviceId, getDeviceInfo, getFromLocalStorage } from '@/utils/helpers';

type LoginMethod = 'device' | 'phone' | 'user-pass' | 'captcha';
type LoginPayload = { id: string; password: string };

const useLogin = () => {
  const phoneModel = getDeviceInfo();
  const deviceId = generateDeviceId();
  const { openAlert, closeLoginOptions, closeLoginOrRegister, setSidebarAnnouncement, openAnnouncement } =
    useModalStore();
  const inviterCode = getFromLocalStorage('channelCode');
  const { setAccountInfo, setAccountNow } = useAccountStore((state) => state);
  const validate = null;

  const login = async (loginMethod: LoginMethod = 'device', data?: LoginPayload) => {
    const ip = await getIp();
    const defaultError = { msg: '网络错误' }; // Network Error
    let res: Partial<RootResponse<ErrorData>> | RootResponse<AccountInfo> = defaultError;

    if (loginMethod === 'phone') {
      res = await loginPhoneNumber({ mobile: data?.id!, passwd: data?.password!, deviceId, ip, validate });
    } else {
      res = await loginDevice({ inviterCode, deviceId, ip, phoneModel, validate });
    }

    if (res && res.code === 200) {
      if (res.data && !('message' in res.data)) {
        setAccountInfo(res.data);
        openAnnouncement();
        setSidebarAnnouncement(2);
        setAccountNow({ balance: res.data.accountNow });
        res.data.token && localStorage.setItem('token', res.data.token);
        closeLoginOrRegister();
        closeLoginOptions();
        return true;
      } else {
        openAlert({ body: res?.data?.message });
      }
    } else {
      openAlert({ body: res?.msg });
    }
  };

  return { login };
};

export default useLogin;
