'use client';

import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { FC } from 'react';
import Morelist from './component/index';
import styles from './index.module.scss';

type MoreModalComponentProps = {
  showMore: boolean;
  setOpenAnnounceModal: () => void;
  setSafeBoxModal: () => void;
  setShowMore: (value: boolean) => void;
};
export type MoreModalComponent = FC<Readonly<MoreModalComponentProps>>;

const MoreModal: MoreModalComponent = ({ showMore, setOpenAnnounceModal, setSafeBoxModal, setShowMore }) => {
  const theme = useAccountStore((state) => state.theme);

  return (
    <>
      {showMore && (
        <div className={styles.moreContainer}>
          <div className={styles.background} data-theme={theme}>
            <Morelist
              setOpenAnnounceModal={setOpenAnnounceModal}
              setShowMore={setShowMore}
              setSafeBoxModal={setSafeBoxModal}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MoreModal;
