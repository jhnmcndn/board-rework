import headerLogo from '@/assets/blackGold/header/headerLogo.png';
import { SERVER } from '@/constants/app';
import useAppName from '@/hooks/useAppName';
import { useAppStore } from '@/store/useAppStore';
import styles from './index.module.scss';

const HeaderTitle = () => {
  const init = useAppStore((state) => state.init);
  const { appName } = useAppName();

  return (
    <div className={styles.headerTitle}>
      {SERVER === '8803' ? (
        <img src={headerLogo} alt="logo" />
      ) : (
        <span className={styles.name}>
          {appName}
          {init.webUrl}
        </span>
      )}
    </div>
  );
};

export default HeaderTitle;
