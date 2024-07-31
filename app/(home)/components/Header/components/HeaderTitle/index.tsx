import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useImages from '@/hooks/useImages';
import { serverConfig } from '@/server';
import Image from 'next/image';
import styles from './index.module.scss';

const HeaderTitle = () => {
  const { images } = useImages();
  const init = useAccountStore((state) => state.init);

  return (
    <div className={styles.headerTitle}>
      {/* @ts-ignore */}
      {serverConfig.server === '8803' ? (
        <Image src={images.header_logo} alt='Header logo' />
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
