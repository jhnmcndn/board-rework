'use client';

import NECaptcha from '@/components/NECaptcha';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useAuthActions from '@/hooks/useAuthActions';
import useImages from '@/hooks/useImages';
import useIsMounted from '@/hooks/useIsMounted';
import useModalStore from '@/store/modals';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalLayout from '../ModalLayout';
import styles from './index.module.scss';

const LoginOptionsModal = () => {
  const { images } = useImages();
  const isMounted = useIsMounted();
  const { login } = useAuthActions();
  const { openAlert, isLoginOptionsOpen, closeLoginOptions, openLoginOrRegister } = useModalStore();
  const { captchaId, actionSwitch } = useAccountStore((state) => state.init);
  const isCaptchaEnabled = actionSwitch === '1' ? true : false;
  const [isCaptchaOpen, setIsCaptchaOpen] = useState(false);

  const modalContent = (
    <AnimatePresence>
      {isLoginOptionsOpen && (
        <ModalLayout backdrop={0.6}>
          <div className={styles.loginTypes}>
            <Image
              src={images.loginClose}
              alt='close'
              height={44}
              width={44}
              quality={100}
              className={styles.loginTypes__close}
              onClick={() => closeLoginOptions()}
            />

            {isCaptchaOpen && (
              <NECaptcha
                captchaId={captchaId}
                isCaptchaOpen={isCaptchaOpen}
                setIsCaptchaOpen={setIsCaptchaOpen}
                onSuccess={(validate) => login('device', { validate })}
              />
            )}

            <div className={styles.loginTypes__buttonsContainer}>
              <Image
                src={images.loginRegisterBtn}
                alt='password-login-register'
                height={79}
                width={228}
                quality={100}
                onClick={() => openLoginOrRegister()}
              />
              <Image
                src={images.guestLoginBtn}
                alt='guest-login'
                height={79}
                width={228}
                quality={100}
                onClick={() => {
                  if (isCaptchaEnabled) setIsCaptchaOpen(true);
                  else login();
                }}
              />
              <Image
                src={images.guestNoticeBtn}
                alt='guest-login-notice'
                height={79}
                width={228}
                quality={100}
                onClick={() => openAlert({ body: '没有发现其他域名' })}
              />
            </div>
          </div>
        </ModalLayout>
      )}
    </AnimatePresence>
  );

  if (!isMounted()) return;

  const element = document.getElementById('modal-root') as HTMLDivElement;
  return createPortal(modalContent, element);
};

export default LoginOptionsModal;
