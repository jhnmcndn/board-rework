import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import styles from './index.module.scss';
const Music: React.FC = () => {
  const { theme } = useAccountStore((state) => state);

  const musicIcon = require(`@/assets/${theme}/footer/musiCon.png`);
  return (
    <>
      <div className={styles.MusicContainer} data-theme={theme}>
        Music
        {/* <div className={styles.pBasicInfo}>
          <span className={styles.infoTitle}>音乐切换</span>
        </div>
        <div className={styles.musicInfo}>
          <div className={styles.sMusciIcon}>
            <Image src={musicIcon} alt='Music Icon' />
            <span>音乐</span>
          </div>
          <div className={styles.sMusicLabel} data-theme={theme}> */}
        {/* <Music /> */}
        {/* </div>
        </div> */}
      </div>
    </>
  );
};

export default Music;
