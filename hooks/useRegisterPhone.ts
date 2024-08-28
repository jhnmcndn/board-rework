import { getIp } from '@/api';
import { registerPhoneNumber, requestPhoneVerify } from '@/api/platform';
import useModalStore from '@/store/modals';
import { ErrorData, RootResponse } from '@/types/app';
import { getDeviceId, getDeviceInfo, getFromLocalStorage } from '@/utils/helpers';

type RegisterPayload = { phone: string; password: string; verifyCode: string };

const useRegisterPhone = () => {
  const deviceId = getDeviceId();
  const phoneModel = getDeviceInfo();
  const token = getFromLocalStorage('token');
  const inviterCode = getFromLocalStorage('channelCode', null) || '1001';
  const { openAlert } = useModalStore();

  const requestVerifyCode = async (phoneNumber: string) => {
    if (phoneNumber === '') {
      openAlert('请输入手机号码');
    } else {
      const verifyRes = await requestPhoneVerify({ phone: phoneNumber });
      if (verifyRes && verifyRes.code === 200) {
        if (verifyRes.data && !('message' in verifyRes.data)) {
          openAlert(verifyRes?.data?.msg);
        } else {
          openAlert(verifyRes?.data?.message);
        }
      } else {
        openAlert(verifyRes?.msg);
      }
    }
  };

  const registerPhone = async (data: RegisterPayload) => {
    const ip = await getIp();

    const res = (await registerPhoneNumber({
      mobile: data.phone,
      passwd: data.password,
      code: data.verifyCode,
      inviterCode,
      deviceId,
      ip,
      phoneModel,
    })) as Partial<RootResponse<ErrorData>> | RootResponse<any>;

    if (res && res.code === 200) {
      if (res.data && !('message' in res.data)) {
        openAlert(res?.data?.msg);
        return true;
      } else {
        openAlert(res?.data?.message);
      }
    } else {
      openAlert(res?.msg);
    }
  };

  return { requestVerifyCode, registerPhone };
};

export default useRegisterPhone;
