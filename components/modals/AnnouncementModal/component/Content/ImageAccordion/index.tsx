import useAuthCheck from '@/hooks/useAuthCheck';
import useModalStore from '@/store/modals';
import React, { useState } from 'react';
import styles from './index.module.scss';

type ImageAccordionProps = {
  url: string;
  handleSwitch: () => void;
};

const ImageAccordion: React.FC<ImageAccordionProps> = ({ url, handleSwitch }) => {
  const { authCheck } = useAuthCheck();
  const { openSettings } = useModalStore();
  const [expand, useExpand] = useState<boolean>(false);

  const handleExpand = () => {
    if (url) window.open(url, '_blank');
    handleSwitch();
    authCheck(() => openSettings());
  };
  return (
    <>
      <div className={styles.imageAccordionContaier}>
        <div className={styles.header} onClick={handleExpand}></div>
      </div>
    </>
  );
};

export default ImageAccordion;
