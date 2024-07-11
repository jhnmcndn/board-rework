import { getAccountInfo } from '@/api/gameApp';
import { getInit } from '@/api/platformApp';
import { SERVER } from '@/constants/app';
import { useUserInfoStore } from '@/store/accountInfo';
import { useInitStore } from '@/store/init';
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
import HeaderButtons from './HeaderButtons';
import HeaderTitle from './HeaderTitle';
import styles from './index.module.scss';

const Header = () => {
  const { data } = useQuery({
    queryKey: ['accountInfo'],
    queryFn: getAccountInfo,
  });

  const { data: initData, isLoading: initIsLoading } = useQuery({
    queryKey: ['init'],
    queryFn: getInit,
  });

  const navigate = useNavigate();
  const userData = useUserInfoStore((state) => state.userInfo);
  const theme = useThemeStore((state) => state.theme);
  const setInit = useInitStore((state) => state.setInit);
  const [expBar, setExpBar] = useState(0);
  const xpBar = (userData?.codeTotal / (userData?.codeTotal + (data?.nextLevelIntegral || 0))) * 100 || 0;

  useEffect(() => {
    setExpBar(xpBar);
  }, [expBar, userData, data]);

  const goToVip = () => {
    navigate({ to: '/personal-info' });
  };

  const goToPromotion = () => {
    navigate({ to: '/promotion-agent' });
  };
  const goToRecharge = () => {
    navigate({ to: '/recharge' });
  };

  if (initData && !initIsLoading) {
    setInit(initData);
  }

  const onCopy = () => {
    navigator.clipboard.writeText(userData?.id || '未登录');
    // setCopyUserNick(true);
    // AlertDelay();
    // popSound();
  };

  return (
    <div className={styles.header}>
      <div className={styles.vipPart}>
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
              <span>{userData?.id || '未登录'}</span>
              {isLoggedIn() && <span className={styles.vip}>VIP{userData?.vip || ''}</span>}
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
              {SERVER !== '8803' ? (
                <div className={styles.btnWrapper}>
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
                <div className={styles.btnWrapper}>
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
                      alt="gold-button-login"
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
              position="relative"
              accountNow={userData?.accountNow || '0.00'}
              top={0}
              left={isMobile ? '0.15rem' : '0'}
            />
          </div>
        </div>
      </div>

      <HeaderTitle />
      <HeaderButtons />
    </div>
  );
};

export default Header;
