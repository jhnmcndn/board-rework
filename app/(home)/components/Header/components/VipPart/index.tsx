'use client';

import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useAuthActions from '@/hooks/useAuthActions';
import useImages from '@/hooks/useImages';
import useModalStore from '@/store/modals';
import { sfx } from '@/utils/audioFile';
import { copyToClipboard } from '@/utils/helpers';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';

const VipPart = () => {
  const { push } = useRouter();
  const { images } = useImages();
  const { authCheck } = useAuthActions();
  const { openLoginOptions } = useModalStore();
  const accountInfo = useAccountStore((state) => state.accountInfo);
  const codeTotal = accountInfo.codeTotal || 0;
  const nextLevelIntegral = accountInfo.nextLevelIntegral || 0;
  const expBar = (codeTotal / (codeTotal + nextLevelIntegral)) * 100;
  const isLoggedIn = accountInfo.id !== undefined;

  return (
    <div className={styles.vipPart}>
      <div onClick={() => authCheck(() => push('/personal-info'))} className={styles.avatarContainer}>
        <Image
          src={accountInfo.headImg || images.avatarPlaceholder}
          alt='Default icon'
          fill
          sizes='20vw'
          className={styles.avatarPhoto}
        />
      </div>
      <div className={styles.userDetailsContainer}>
        <div className={styles.userDetails}>
          <div className={styles.userInfo}>
            <span>{accountInfo.id || '未登录'}</span>
            {isLoggedIn && <span className={styles.vip}>VIP{accountInfo?.vip || ''}</span>}
          </div>
          {isLoggedIn && (
            <div className={styles.copyIcon} onClick={() => copyToClipboard(accountInfo.id || '未登录')}>
              <Image src={images.copy} alt='Copy' width={60} height={60} />
            </div>
          )}
        </div>
        {isLoggedIn && (
          <div className={styles.vipBar}>
            <div className={styles.vipBarBorder}>
              <div
                className={styles.vipBarExp}
                style={{
                  width: expBar ? `${expBar}%` : '0%',
                }}
              />
            </div>
          </div>
        )}
        {!isLoggedIn && (
          <div className={styles.btnWrapper}>
            <button className={styles.loginButton}>
              <Image
                src={images.loginBtn}
                alt='Login'
                width={310}
                height={80}
                data-click={sfx.popAudio}
                onClick={() => {
                  openLoginOptions();
                }}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VipPart;
