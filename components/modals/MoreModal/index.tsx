'use client';

import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useAuthCheck from '@/hooks/useAuthCheck';
import useClickOutSide from '@/hooks/useClickOutside';
import useImages from '@/hooks/useImages';
import { sfx } from '@/utils/audioFile';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useRef } from 'react';
import styles from './index.module.scss';
import useModalStore from '@/store/modals';

type MoreModalComponentProps = {
  setOpenAnnounceModal: () => void;
  setSafeBoxModal: () => void;
  setShowMore: (value: boolean) => void;
};

type MoreModalComponent = FC<Readonly<MoreModalComponentProps>>;

const MoreModal: MoreModalComponent = ({ setOpenAnnounceModal, setSafeBoxModal, setShowMore }) => {
  const { push } = useRouter();
  const { images } = useImages();
  const { authCheck } = useAuthCheck();
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
        <li
          data-click={sfx.popAudio}
          className={styles.more__listItem}
          onClick={() => {
            setOpenAnnounceModal();
          }}
        >
          <Image src={images.megaphone} alt='Megaphone Icon' />
          <span>公告</span>
        </li>

        {/*<li className={styles.more__listItem} onClick={() => authCheck(() => setSafeBoxModal())}>*/}
        {/*  <Image src={images.vault} alt='Vault Icon' />*/}
        {/*  <span>保险箱</span>*/}
        {/*</li>*/}

        <li className={styles.more__listItem} onClick={openPassCode}>
          <Image src={images.vault} alt='Vault Icon' />
          <span>保险箱</span>
        </li>

        <li className={styles.more__listItem} onClick={() => authCheck(() => push('/personal-info'))}>
          <Image src={images.user} alt='User Icon' />
          <span>个人信息</span>
        </li>
      </ul>
    </div>
  );
};

export default MoreModal;
