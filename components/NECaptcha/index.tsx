import initNECaptcha from '@/scripts/yidun-captcha';
import useModalStore from '@/store/modals';
import { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react';
import styles from './index.module.scss';

type CaptchaError = { name: string; code: number; message: string };
export type CaptchaData = { validate: string };

type NECaptchaProps = {
  onSuccess: (validate: string) => void;
  captchaId?: string;
  isCaptchaOpen?: boolean;
  setIsCaptchaOpen: Dispatch<SetStateAction<boolean>>;
};

const NECaptcha: FC<NECaptchaProps> = ({ onSuccess, captchaId, isCaptchaOpen, setIsCaptchaOpen }) => {
  const captchaContainerRef = useRef(null);
  const { openAlert } = useModalStore();
  let captchaInstance: any = null;

  useEffect(() => {
    if (captchaId && isCaptchaOpen) {
      initNECaptcha(
        {
          captchaId: captchaId,
          element: '#captchaContainer',
          mode: 'embed',
          width: '3.25rem',
          apiVersion: 2,
          customStyles: {
            imagePanel: {
              borderRadius: 10,
            },
            controlBar: {
              textColor: '#8e91aa',
              borderColor: '#dfe1ea',
              borderColorMoving: '#dfe1ea',
              borderColorSuccess: '#dfe1ea',
              borderColorError: '#dfe1ea',
              background: '#f0f2f4',
              backgroundMoving: 'linear-gradient(270deg, rgba(55, 73, 233, 0.48) 0%, rgba(55, 73, 233, 0.08) 100%)',
              backgroundSuccess:
                'linear-gradient(270deg, rgba(35, 196, 148, 0.48) 14.18%, rgba(35, 196, 148, 0.08) 100%)',
              backgroundError: 'linear-gradient(270deg, rgba(215, 80, 80, 0.48) 0%, rgba(215, 80, 80, 0.08) 100%)',
              height: 40,
              borderRadius: 10,
              slideIcon: 'https://yidunfe.nos-jd.163yun.com/moving1669028036380.png',
              slideIconMoving: 'https://yidunfe.nos-jd.163yun.com/moving1669028036380.png',
              slideIconSuccess: 'https://yidunfe.nos-jd.163yun.com/success1669028036503.png',
              slideIconError: 'https://yidunfe.nos-jd.163yun.com/error1669028036362.png',
            },
          },
          onVerify: (err: CaptchaError, data: CaptchaData) => {
            if (err) openAlert(err.name);
            else onSuccess(data.validate);
          },
        },
        function onload(instance: any) {
          console.log('NECaptcha initialized:', instance);
          captchaInstance = instance;
        },
        function onerror(err: any) {
          console.error('NECaptcha initialization failed:', err);
        },
      );
    }

    return () => {
      setIsCaptchaOpen(false);
      if (captchaInstance) {
        captchaInstance.destroy();
        captchaInstance = null;
      }
    };
  }, [captchaId, isCaptchaOpen, setIsCaptchaOpen]);

  return (
    <div className={styles.captchaWrapper}>
      <div className={styles.backdrop} onClick={() => setIsCaptchaOpen(false)} />
      <div id='captchaContainer' ref={captchaContainerRef}></div>
    </div>
  );
};

export default NECaptcha;
