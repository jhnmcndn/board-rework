import { isLoggedIn } from '@/utils/app';
import defaultIcon from '../../assets/blackGold/header/defaultIcon.png';

import { getAccountInfo } from '@/api/platformApp';
import { useThemeStore } from '@/store/theme';
import { useUserInfoStore } from '@/store/userInfo';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import register_btn from '../../assets/blackGold/header/btn3.png';
import login_btn from '../../assets/blackGold/header/btn3_2.png';
import button from '../../assets/blackGold/header/button2.png';
import styles from './index.module.scss';

const server = import.meta.env.VITE_APP_SERVER;

const Header = () => {
  const { data } = useQuery({
    queryKey: ['accountInfo'],
    queryFn: getAccountInfo,
  });

  const userData = useUserInfoStore((state) => state.userInfo);
  const theme = useThemeStore((state) => state.theme);
  const [expBar, setExpBar] = useState(0);
  const [appName, setAppName] = useState('');

  useEffect(() => {
    (async () => {
      const { APP_NAME } = await import(`@/servers/${server}`);
      setAppName(APP_NAME);
    })();
  });

  useEffect(() => {
    setExpBar(
      (userData?.codeTotal /
        (userData?.codeTotal + (data?.nextLevelIntegral || 0))) *
        100 || 0
    );
  }, [expBar, userData, data]);

  const onCopy = () => {
    navigator.clipboard.writeText(userData?.id ? userData?.id : '未登录');
    // setCopyUserNick(true);
    // AlertDelay();
    // popSound();
  };

  return (
    <div className={styles.header}>
      <div className={styles.vippart}>
        <div className={styles.avatarContainer}>
          <img
            src={defaultIcon}
            //   onClick={() => {
            //     handleClick({ fn: gotoVip });
            //     start();
            //   }}
            alt="defaultIcon"
            className={styles.avatarPhoto}
          />
        </div>

        <div className={styles.userDetailsContainer}>
          <div className={styles.userDetails}>
            <div className={styles.userInfo}>
              <span>{userData?.id ? userData?.id : '未登录'}</span>
              {isLoggedIn() && (
                <span className={styles.vip}>
                  VIP{userData?.vip ? userData?.vip : ''}
                </span>
              )}
            </div>
            {isLoggedIn() && (
              <div className={styles.copyIcon} onClick={onCopy}>
                <img
                  src={require(`../../assets/${theme}/header/copyIcon.png`)}
                  alt="copy"
                />
              </div>
            )}
          </div>
          {isLoggedIn() && (
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

          {!isLoggedIn() && (
            <>
              {server !== '8803' && (
                <div className={styles.btn_wrapper}>
                  <button
                    style={{ width: '80%' }}
                    className={styles.loginButton}
                  >
                    <img
                      onClick={() => {
                        // popSound();
                        // dispatch(setShowLoginModal(true));
                      }}
                      style={{ width: '100%' }}
                      src={button}
                      alt="gold-button"
                    />
                  </button>
                </div>
              )}
              {server === '8803' && (
                <div className={styles.btn_wrapper}>
                  <button className={styles.loginButton}>
                    <img
                      onClick={() => {
                        // popSound();
                        // dispatch(setShowLoginModal(true));
                        // dispatch(setSwitch(false));
                      }}
                      src={register_btn}
                      alt="gold-button-register"
                    />
                  </button>
                  <button className={styles.loginButton}>
                    <img
                      onClick={() => {
                        // popSound();
                        // dispatch(setShowLoginModal(true));
                        // dispatch(setSwitch(true));
                      }}
                      src={login_btn}
                      alt="gold-button- login"
                    />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
