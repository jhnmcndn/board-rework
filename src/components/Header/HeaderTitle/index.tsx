import { useInitStore } from '@/store/init';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import HeaderLogo from '/src/assets/blackGold/header/header_logo.png';
const server = import.meta.env.VITE_APP_SERVER;

const HeaderTitle = () => {
  const init = useInitStore((state) => state.init);
  const [appName, setAppName] = useState('');

  useEffect(() => {
    const handleAsyncImport = async () => {
      const { APP_NAME } = await import(`@/servers/${server}`);
      setAppName(APP_NAME);
    };
    handleAsyncImport();
  }, []);

  return (
    <div className={styles.headerTitle} style={{ justifyContent: 'center' }}>
      {server === '8803' ? (
        <img src={HeaderLogo} alt="logo" style={{ width: '1rem' }} />
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
