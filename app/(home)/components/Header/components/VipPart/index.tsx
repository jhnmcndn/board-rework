'use client';

import defaultIcon from '@/assets/blackGold/header/defaultIcon.png';
import loginBtnImage from '@/assets/commons/loginBtn.png';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { copyToClipboard } from '@/utils/helpers';
import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.scss';

const VipPart = () => {
  const accountInfo = useAccountStore((state) => state.accountInfo);
  const theme = useAccountStore((state) => state.theme);
  const codeTotal = accountInfo.codeTotal || 0;
  const nextLevelIntegral = accountInfo.nextLevelIntegral || 0;
  const expBar = (codeTotal / (codeTotal + nextLevelIntegral)) * 100;
  const isLoggedIn = accountInfo.id !== undefined;
  const copyImage = require(`@/assets/${theme}/header/copy.png`);

  return (
    <div className={styles.vipPart}>
      <Link href='/personal-info' className={styles.avatarContainer}>
        <Image src={defaultIcon} alt='Default icon' className={styles.avatarPhoto} />
      </Link>
      <div className={styles.userDetailsContainer}>
        <div className={styles.userDetails}>
          <div className={styles.userInfo}>
            <span>{accountInfo.id || '未登录'}</span>
            {isLoggedIn && <span className={styles.vip}>VIP{accountInfo?.vip || ''}</span>}
          </div>
          {isLoggedIn && (
            <div className={styles.copyIcon} onClick={() => copyToClipboard(accountInfo.id || '未登录')}>
              <Image src={copyImage} alt='Copy' width={60} height={60} />
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
                src={loginBtnImage}
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
