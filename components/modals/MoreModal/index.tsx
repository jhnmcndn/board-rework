'use client';

import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useAuthActions from '@/hooks/useAuthActions';
import useClickOutSide from '@/hooks/useClickOutside';
import useImages from '@/hooks/useImages';
import useModalStore from '@/store/modals';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useRef } from 'react';
import styles from './index.module.scss';
import ListContainer from './ListContainer';

type MoreModalComponentProps = {
  setOpenAnnounceModal: () => void;
  setSafeBoxModal: () => void;
  setShowMore: (value: boolean) => void;
};

type MoreModalComponent = FC<Readonly<MoreModalComponentProps>>;

const MoreModal: MoreModalComponent = ({ setOpenAnnounceModal, setSafeBoxModal, setShowMore }) => {
  const { push } = useRouter();
  const { images } = useImages();
  const { authCheck } = useAuthActions();
  const { theme } = useAccountStore((state) => state);
  const moreOptionsRef = useRef<HTMLDivElement>(null);
  const clickOutSide = useClickOutSide(moreOptionsRef);
  const { openPassCode } = useModalStore();

  useEffect(() => {
    if (clickOutSide) {
      setShowMore(false);
    }
  }, [clickOutSide]);

  return (
    <div className={styles.container} ref={moreOptionsRef} data-theme={theme}>
      <ul className={styles.more__list}>
        <ListContainer icon={images.megaphone} text='公告' onClick={() => setOpenAnnounceModal()} />
        <ListContainer icon={images.vault} text='保险箱' onClick={openPassCode} />
        <ListContainer icon={images.user} text='个人信息' onClick={() => authCheck(() => push('/personal-info'))} />
      </ul>
    </div>
  );
};

export default MoreModal;
