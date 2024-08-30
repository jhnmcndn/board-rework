'use client';

import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useIsMounted from '@/hooks/useIsMounted';
import useModalStore from '@/store/modals';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FC } from 'react';
import ModalLayout from '../ModalLayout';
import styles from './index.module.scss';

const VersionModal: FC = () => {
  const { closeVersion, isVersionOpen } = useModalStore();
  const init = useAccountStore((state) => state.init);
  const isMounted = useIsMounted();

  return (
    <AnimatePresence>
      {isVersionOpen && isMounted() && (
        <ModalLayout closeOnOutsideClick onClose={closeVersion} backdrop={0.5}>
          <div className={styles.versionMainContainer}>
            <span className={styles.notice}>有新版本，是否前往更新</span>
            <div className={styles.buttonsContainer}>
              <button className={styles.close} onClick={() => closeVersion()}>
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
