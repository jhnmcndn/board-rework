import { SERVER } from '@/constants/app';
import { useUserInfoStore } from '@/store/accountInfo';
import { useThemeStore } from '@/store/theme';
import { isLoggedIn } from '@/utils/app';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import register_btn from '/src/assets/blackGold/header/btn3.png';
import login_btn from '/src/assets/blackGold/header/btn3_2.png';
import button from '/src/assets/blackGold/header/button2.png';
import defaultIcon from '/src/assets/blackGold/header/defaultIcon.png';

const VipPart = () => {
  const navigate = useNavigate();
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const theme = useThemeStore((state) => state.theme);
  const [expBar, setExpBar] = useState(0);
  const xpBar = (userInfo?.codeTotal / (userInfo?.codeTotal + (userInfo?.nextLevelIntegral || 0))) * 100 || 0;

  useEffect(() => {
    setExpBar(xpBar);
  }, [expBar, userInfo, userInfo]);

  const goToVip = () => {
    navigate({ to: '/personal-info' });
  };

  const goToPromotion = () => {
    navigate({ to: '/promotion-agent' });
  };
  const goToRecharge = () => {
    navigate({ to: '/recharge' });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(userInfo?.id || '未登录');
    // setCopyUserNick(true);
    // AlertDelay();
    // popSound();
  };

  return (
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
            <span>{userInfo?.id || '未登录'}</span>
            {isLoggedIn() && <span className={styles.vip}>VIP{userInfo?.vip || ''}</span>}
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
  );
};

export default VipPart;
