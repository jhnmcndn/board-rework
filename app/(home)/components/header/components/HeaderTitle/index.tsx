import headerLogo from '@/assets/blackGold/header/headerLogo.png';
import { serverConfig } from '@/server';
import styles from './index.module.scss';
import { useStore } from '@/components/providers/StoreProvider';
import Image from 'next/image';
import { useEffect } from 'react';

const HeaderTitle = () => {
  const init = useStore((state) => state.init);

  return (
    <div className={styles.headerTitle}>
      {/* @ts-ignore */}
      {serverConfig.server === '8803' ? (
        <Image src={headerLogo} alt='Header logo' />
      ) : (
        <span className={styles.name}>
          {serverConfig.title}
          {init.webUrl}
        </span>
      )}
    </div>
  );
};

export default HeaderTitle;
