'use client';

import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useClickOutSide from '@/hooks/useClickOutside';
import useImages from '@/hooks/useImages';
import useModalStore from '@/store/modals';
import { onClickSound } from '@/utils/audioFile';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useRef } from 'react';
import styles from './index.module.scss';

type MoreModalComponentProps = {
  setOpenAnnounceModal: () => void;
  setSafeBoxModal: () => void;
  setShowMore: (value: boolean) => void;
};

type MoreModalComponent = FC<Readonly<MoreModalComponentProps>>;

const MoreModal: MoreModalComponent = ({ setOpenAnnounceModal, setSafeBoxModal, setShowMore }) => {
  const { push } = useRouter();
  const { images } = useImages();
  const { openLoginOptions } = useModalStore();
  const { theme, accountInfo } = useAccountStore((state) => state);
  const isLoggedIn = !!accountInfo.id;
  const moreOptionsRef = useRef<HTMLDivElement>(null);
  const clickOutSide = useClickOutSide(moreOptionsRef);

  useEffect(() => {
    if (clickOutSide) {
      setShowMore(false);
    }
  }, [clickOutSide]);

  return (
    <div className={styles.container} ref={moreOptionsRef} data-theme={theme}>
      <ul className={styles.more__list}>
        <li
          className={styles.more__listItem}
          onClick={() => {
            setOpenAnnounceModal();
            onClickSound('pop');
          }}
        >
          <Image src={images.megaphone} alt='Megaphone Icon' />
          <span>公告</span>
        </li>

        <li className={styles.more__listItem} onClick={() => (isLoggedIn ? setSafeBoxModal() : openLoginOptions())}>
          <Image src={images.vault} alt='Vault Icon' />
          <span>保险箱</span>
        </li>

        <li
          className={styles.more__listItem}
          onClick={() => (isLoggedIn ? push('/personal-info') : openLoginOptions())}
        >
          <Image src={images.user} alt='User Icon' />
          <span>个人信息</span>
        </li>
      </ul>
    </div>
  );
};

export default MoreModal;
