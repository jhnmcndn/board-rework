'use client';

import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useIsMounted from '@/hooks/useIsMounted';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FC } from 'react';
import ModalLayout from '../ModalLayout';
import styles from './index.module.scss';

type VersionModalProps = {
  show: boolean;
  setShow: (val: boolean) => void;
};

const VersionModal: FC<VersionModalProps> = ({ show, setShow }) => {
  const isMounted = useIsMounted();
  const init = useAccountStore((state) => state.init);

  const closeVersionModal = () => setShow(false);

  return (
    <AnimatePresence>
      {show && isMounted() && (
        <ModalLayout closeOnOutsideClick onClose={closeVersionModal} backdrop={0.5}>
          <div className={styles.versionMainContainer}>
            <span className={styles.notice}>有新版本，是否前往更新</span>
            <div className={styles.buttonsContainer}>
              <button className={styles.close} onClick={closeVersionModal}>
                取消
              </button>
              <Link className={styles.redirect} href={`http://${init.webUrl}`} target='_blank'>
                确定
              </Link>
            </div>
          </div>
        </ModalLayout>
      )}
    </AnimatePresence>
  );
};

export default VersionModal;
