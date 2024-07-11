import { SERVER } from '@/constants/app';
import useAppName from '@/hooks/useAppName';
import { useAppStore } from '@/store/useAppStore';
import styles from './index.module.scss';
import HeaderLogo from '/src/assets/blackGold/header/header_logo.png';

const HeaderTitle = () => {
  const init = useAppStore((state) => state.init);
  const { appName } = useAppName();

  return (
    <div className={styles.headerTitle}>
      {SERVER === '8803' ? (
        <img src={HeaderLogo} alt="logo" />
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
