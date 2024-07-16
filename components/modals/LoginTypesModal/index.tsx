'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
// import { loginDevice } from '@/api/game/gamelist';
// import NECaptchaComponent from 'src/commons/Captcha/NECaptchaComponent';
import { getDeviceInfo } from '@/utils/helpers';
import { useStore } from '@/components/providers/StoreProvider';
import useModalStore from '@/store/modals';
import { images } from '@/utils/resources';
import ModalLayout from '../ModalLayout';
import styles from './index.module.scss';

// const LoginTypesModal = ({ setIsShowUserAuth }) => {
const LoginTypesModal = () => {
  const { openAlert, isLoginTypesOpen, closeLoginTypes } =  useModalStore();
  const { captchaId, actionSwitch } =  useStore(state => state.init);
  const isCaptchaEnabled = actionSwitch === '1' ? true : false;
  const [isCaptchaOpen, setIsCaptchaOpen] = useState(false);

  function getGuestLoginInfo() {
    const inviterCode = localStorage.getItem('channelCode');
    const machineId = localStorage.getItem('MachineId');
    const ip = localStorage.getItem('externalIP');
    const deviceModel = getDeviceInfo();
    const validate = isCaptchaEnabled ? captchaId : null;

    // loginDevice({ inviterCode, machineId, ip, deviceModel, validate }).then((res) => {
    //   setIsCaptchaOpen(false);
    //   if (res.data.code === 200) {
    //     dispatch(setShowOtherModalComp(true));
    //     dispatch(setShowAnnouncementModal(true));
    //     dispatch(setShowBindWithdrawModal(true));
    //     dispatch(setUserData(res.data.data));
    //     dispatch(setShowLoginModal(false));
    //     localStorage.setItem('loginNow', JSON.stringify(res.data.data));
    //     dispatch(setUserBalance(res.data.data?.accountNow));
    //   } else {
    //     alert(res.data.msg);
    //   }
    // });
  }

  // const handleCaptchaSuccess = (data) => {
  //   getGuestLoginInfo(data);
  // };

  // const handleCaptchaFailure = (err) => {
  //   openAlert({body: `NECaptcha verification failed:"  ${err}` })
  // };

  const modalContent = (
    <ModalLayout>
      <div className={styles.loginTypes}>
        <Image
          src={images.login_close}
          alt='close'
          height={44}
          width={44}
          quality={100}
          className={styles.loginTypes__close}
          onClick={() => closeLoginTypes()}
        />

        {/* {isCaptchaOpen && isCaptchaEnabled && (
          <NECaptchaComponent
            onSuccess={handleCaptchaSuccess}
            onFailure={handleCaptchaFailure}
            captchaId={captchaId}
            isCaptchaOpen={isCaptchaOpen}
            setIsCaptchaOpen={setIsCaptchaOpen}
          />
        )} */}

        <div className={styles.loginTypes__buttonsContainer}>
          <Image
            src={images.login_register_btn}
            alt='password-login-register'
            height={79}
            width={228}
            quality={100}
            // onClick={() => setIsShowUserAuth(true)}
          />
          <Image
            src={images.guest_login_btn}
            alt='guest-login'
            height={79}
            width={228}
            quality={100}
            onClick={() => {
              if (isCaptchaEnabled) setIsCaptchaOpen(true);
              else getGuestLoginInfo();
            }}
          />
          <Image
            src={images.guest_notice_btn}
            alt='guest-login-notice'
            height={79}
            width={228}
            quality={100}
            onClick={() => openAlert({body: '没有发现其他域名' })}
          />
        </div>
      </div>
    </ModalLayout>
  );

  if (isLoginTypesOpen) {
    const element = document.getElementById('modal-root') as HTMLDivElement;
    return createPortal(modalContent, element);
  }
};

export default LoginTypesModal;
