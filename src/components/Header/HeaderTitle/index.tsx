import { SERVER } from '@/constants/app';
import useAppName from '@/hooks/useAppName';
import { useInitStore } from '@/store/init';
import styles from './index.module.scss';
import HeaderLogo from '/src/assets/blackGold/header/header_logo.png';

const HeaderTitle = () => {
  const init = useInitStore((state) => state.init);
  const { appName } = useAppName();

  console.log(init, 'qweqweqwe');

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
