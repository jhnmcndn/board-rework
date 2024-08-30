'use client';

import useIsMounted from '@/hooks/useIsMounted';
import { serverConfig } from '@/server';
import useModalStore from '@/store/modals';
import Image from 'next/image';
import { useEffect } from 'react';
import styles from './index.module.scss';

export default function AlertContainer() {
  const { alertContent, isAlertOpen, closeAlert } = useModalStore();
  const alertIcon = require(`@/public/assets/${serverConfig.server}/favicon.ico`);
  const isMounted = useIsMounted();

  useEffect(() => {
    setTimeout(() => {
      closeAlert();
    }, 2750);
  }, []);

  return (
    <>
      {isAlertOpen && isMounted() && (
        <div className={styles.alert__wrapper}>
          <div className={styles.alert__textContainer}>
            <div className={styles.alert__imageContainer}>
              <Image src={alertIcon} alt='alert' className={styles.alert__icon} />
            </div>
            {alertContent && <span className={styles.alert__message}>{alertContent}</span>}
          </div>
        </div>
      )}
    </>
  );
}
