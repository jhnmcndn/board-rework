'use client';

import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useImages from '@/hooks/useImages';
import { copyToClipboard } from '@/utils/helpers';
import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.scss';

const VipPart = () => {
  const { images } = useImages();
  const accountInfo = useAccountStore((state) => state.accountInfo);
  const codeTotal = accountInfo.codeTotal || 0;
  const nextLevelIntegral = accountInfo.nextLevelIntegral || 0;
  const expBar = (codeTotal / (codeTotal + nextLevelIntegral)) * 100;
  const isLoggedIn = accountInfo.id !== undefined;

  return (
    <div className={styles.vipPart}>
      <Link href='/personal-info' className={styles.avatarContainer}>
        <Image src={images.avatar_placeholder} alt='Default icon' className={styles.avatarPhoto} />
      </Link>
      <div className={styles.userDetailsContainer}>
        <div className={styles.userDetails}>
          <div className={styles.userInfo}>
            <span>{accountInfo.id || '未登录'}</span>
            {isLoggedIn && <span className={styles.vip}>VIP{accountInfo?.vip || ''}</span>}
          </div>
          {isLoggedIn && (
            <div className={styles.copyIcon} onClick={() => copyToClipboard(accountInfo.id || '未登录')}>
              <Image src={images.copy_icon} alt='Copy' width={60} height={60} />
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
                src={images.login_btn}
                alt='Login'
                width={310}
                height={80}
                onClick={() => {
                  // onClickSound('pop')
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
