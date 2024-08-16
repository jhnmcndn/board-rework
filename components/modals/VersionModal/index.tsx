'use client';

import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useIsMounted from '@/hooks/useIsMounted';
import useModalStore from '@/store/modals';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { createPortal } from 'react-dom';
import ModalLayout from '../ModalLayout';
import styles from './index.module.scss';

const VersionModal: React.FC = () => {
  const { closeVersion, isVersionOpen } = useModalStore();
  const init = useAccountStore((state) => state.init);
  const isMounted = useIsMounted();

  const modalContent = (
    <AnimatePresence>
      {isVersionOpen && (
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

  if (isMounted()) {
    const element = document.getElementById('modal-root') as HTMLDivElement;
    if (element) return createPortal(modalContent, element);
  }

  return null;
};

export default VersionModal;
