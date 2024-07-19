import headerLogo from '@/assets/blackGold/header/headerLogo.png';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { serverConfig } from '@/server';
import Image from 'next/image';
import styles from './index.module.scss';

const HeaderTitle = () => {
  const init = useAccountStore((state) => state.init);

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
