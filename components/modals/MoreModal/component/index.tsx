import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { onClickSound } from '@/utils/audioFile';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import styles from './index.module.scss';

type MorelistProps = {
  setOpenAnnounceModal: () => void;
  setShowMore: (value: boolean) => void;
  setSafeBoxModal: () => void;
};

const Morelist: React.FC<MorelistProps> = ({ setOpenAnnounceModal, setShowMore, setSafeBoxModal }) => {
  const theme = useAccountStore((state) => state.theme);
  const accountInfo = useAccountStore((state) => state.accountInfo);
  const isLoggedIn = Boolean(accountInfo.id);
  const router = useRouter();

  const megaphoneIcon = require(`@/assets/${theme}/footer/megaphone.png`);
  const vaultIcon = require(`@/assets/${theme}/footer/vault.png`);
  const userIcon = require(`@/assets/${theme}/footer/user.png`);

  const handleNavigate = () => {
    router.push('/personal-info');
  };

  const closeShowMore = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowMore(false);
  };

  return (
    <>
      <div className={styles.listBackground} onClick={closeShowMore} />
      <div className={styles.listContainer} onClick={(e) => e.stopPropagation()}>
        <ul>
          <li
            onClick={() => {
              setOpenAnnounceModal();
              onClickSound('pop');
            }}
          >
            <div className={styles.moreImg}>
              <Image src={megaphoneIcon} alt='Megaphone Icon' />
              <span>公告</span>
            </div>
          </li>

          <li onClick={() => (!isLoggedIn ? setSafeBoxModal() : setOpenAnnounceModal)}>
            <div className={styles.moreImg} onClick={() => onClickSound('pop')}>
              <Image src={vaultIcon} alt='Vault Icon' />
              <span>保险箱</span>
            </div>
          </li>

          <li onClick={() => (!isLoggedIn ? handleNavigate() : setOpenAnnounceModal)}>
            <div className={styles.moreImg}>
              <Image src={userIcon} alt='User Icon' />
              <span>个人信息</span>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Morelist;
