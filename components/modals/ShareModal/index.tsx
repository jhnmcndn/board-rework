'use client';

import copyIcon from '@/assets/blackGold/header/copy.png';
import ModalLayout from '@/components/modals/ModalLayout';
import { shareButtons } from '@/constants/app'; // Move share button config to a separate file
import useCopyToClipBoard from '@/hooks/useCopyToClipboard';
import useIsMounted from '@/hooks/useIsMounted';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FC, useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss';

type ShareModalProps = {
  show: boolean;
  setShow: (val: boolean) => void;
};

const ShareModal: FC<ShareModalProps> = ({ show, setShow }) => {
  const isMounted = useIsMounted();
  const { copyToClipboard } = useCopyToClipBoard();
  const [shareUrl, setShareUrl] = useState('www.example.com');

  useEffect(() => {
    setShareUrl(localStorage.getItem('shareUrl') || 'www.example.com');
  }, [show]);

  const closeShare = () => setShow(false);

  const modalContent = useMemo(
    () => (
      <AnimatePresence>
        {show && isMounted() && (
          <ModalLayout closeOnOutsideClick onClose={closeShare} backdrop={0.8}>
            <div className={styles.shareModal}>
              <div className={styles.shareModal__content}>
                <div className={styles.shareModal__copyContainer}>
                  <input type='text' value={shareUrl} readOnly />
                  <div className={styles.shareModal__copyBtn} onClick={() => copyToClipboard(shareUrl)}>
                    <Image src={copyIcon} alt='copy' width={10} height={10} />
                  </div>
                </div>
                <div className={styles.shareModal__linkContainer}>
                  {shareButtons.map(({ Button, Icon, name }) => (
                    <Button key={name} url={shareUrl}>
                      <Icon size={32} borderRadius={4} />
                    </Button>
                  ))}
                </div>
                <div className={styles.shareModal__btnContainer}>
                  <button onClick={closeShare}>领取佣金</button>
                </div>
              </div>
            </div>
          </ModalLayout>
        )}
      </AnimatePresence>
    ),
    [show, shareUrl, closeShare],
  );

  return modalContent;
};

export default ShareModal;
