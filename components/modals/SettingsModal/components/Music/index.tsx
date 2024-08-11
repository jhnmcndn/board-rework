import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import Image from 'next/image';
import MusicComponent from './component/VolumeAdjuster';
import styles from './index.module.scss';

const Music: React.FC = () => {
  const { theme } = useAccountStore((state) => state);

  const musicIcon = require(`@/assets/${theme}/footer/musiCon.png`);
  return (
    <>
      <div className={styles.mainContainer} data-theme={theme}>
        <div className={styles.musicTitle}>
          <span className={styles.infoTitle}>音乐切换</span>
        </div>
        <div className={styles.volume}>
          <div className={styles.musicIcon}>
            <Image src={musicIcon} alt='Icon Music' />
            <span>音乐</span>
          </div>
          <div className={styles.switchContainer}>
            <MusicComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Music;
