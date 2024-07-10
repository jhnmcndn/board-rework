import { getAccountInfo } from '@/api/gameApp';
import { useUserInfoStore } from '@/store/accountInfo';
import { useThemeStore } from '@/store/theme';
import { isLoggedIn } from '@/utils/app';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import register_btn from '../../assets/blackGold/header/btn3.png';
import login_btn from '../../assets/blackGold/header/btn3_2.png';
import button from '../../assets/blackGold/header/button2.png';
import defaultIcon from '../../assets/blackGold/header/defaultIcon.png';
import CoinPurse from '../CoinPurse';
import styles from './index.module.scss';

const server = import.meta.env.VITE_APP_SERVER;

const Header = () => {
  const { data } = useQuery({
    queryKey: ['accountInfo'],
    queryFn: getAccountInfo,
  });

  const navigate = useNavigate();
  const userData = useUserInfoStore((state) => state.userInfo);
  const theme = useThemeStore((state) => state.theme);
  const [expBar, setExpBar] = useState(0);
  const [, setAppName] = useState('');

  useEffect(() => {
    const handleAsyncImport = async () => {
      const { APP_NAME } = await import(`@/servers/${server}`);
      setAppName(APP_NAME);
    };
    handleAsyncImport();
  }, []);

  useEffect(() => {
    setExpBar((userData?.codeTotal / (userData?.codeTotal + (data?.nextLevelIntegral || 0))) * 100 || 0);
  }, [expBar, userData, data]);

  const gotoVip = () => {
    navigate({ to: '/personal-info' });
  };

  const gotoPromotion = () => {
    navigate({ to: '/promotion-agent' });
  };
  const gotoRecharge = () => {
    navigate({ to: '/recharge' });
  };

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
              {isLoggedIn() && <span className={styles.vip}>VIP{userData?.vip ? userData?.vip : ''}</span>}
            </div>
            {isLoggedIn() && (
              <div className={styles.copyIcon} onClick={onCopy}>
                <img src={`/src/assets/${theme}/header/copyIcon.png`} alt="copy" />
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
              {server !== '8803' ? (
                <div className={styles.btn_wrapper}>
                  <button className={styles.loginButton}>
                    <img
                      onClick={() => {
                        // popSound();
                        // dispatch(setShowLoginModal(true));
                      }}
                      src={button}
                      alt="gold-button"
                    />
                  </button>
                </div>
              ) : (
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

      <div className={styles.headerDetails}>
        <div className={styles.coinPurseWrapper}>
          <div className={styles.coinPurseContainer}>
            <CoinPurse
              posi="relative"
              accountNow={userData?.accountNow ? userData?.accountNow : '0.00'}
              top={0}
              left={isMobile ? '0.15rem' : '0'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
