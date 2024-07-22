'use client';

import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { serverConfig } from '@/server';
import useModalStore from '@/store/modals';
import { AudioType, onClickSound } from '@/utils/audioFile';
import { useRouter } from 'next/navigation';
import { isIOS } from 'react-device-detect';
import LeftNavigation from './components/LeftNavigation';
import RightNavigation from './components/RightNavigation';
import styles from './index.module.scss';

export type HandleClickParams = {
  fn?: (params?: any) => void;
  params?: any;
  isActivity?: boolean;
};

const Footer = () => {
  const router = useRouter();
  const accountInfo = useAccountStore((state) => state.accountInfo);
  const openAuth = useModalStore((state) => state.openAuth);
  const isLoggedIn = Boolean(accountInfo.id);

  const handleNavigation = (path: string, soundKey?: string) => {
    if (isIOS && soundKey) {
      onClickSound(soundKey as AudioType);
    }
    if (isLoggedIn) {
      router.push(path);
    } else {
      openAuth();
    }
  };

  const gotoWithdraw = () => {
    if (isIOS) {
      onClickSound('withdraw');
    }
    if (!isLoggedIn) {
      //THIS ROUTER.PUSH TO WITHDRAW PAGE IS TEMPORARY. WILL DELETE AFTER WITHDRAWAL PAGE DEVELOPMENT
      router.push('/withdraw');
      // dispatch(setShowBindWithdrawModal(true));
    } else {
      router.push('/withdraw');
      // dispatch(setShowBindWithdrawModal(false));
    }
  };

  const handleActivity = (fn?: (params?: any) => void, params?: any) => fn && fn(params);

  const handleClick = ({ fn, params, isActivity = false }: HandleClickParams) => {
    if (isActivity || !isLoggedIn) {
      handleActivity(fn, params);
    } else {
      openAuth();
    }
  };

  return (
    <>
      {/* <UserAuthModal
        open={userAuthModal}
        onLog={() => setUserAuthModal(false)}
        backDrop={() => setUserAuthModal(false)}
        inputBox={() => setUserAuthModal(true)}
      />

      <MegaphoneModal
        open={omMegaphone}
        onClose={() => {
          setOmMegaphone(!omMegaphone);
        }}
        activesideTab={3}
      />

      <SafeBoxModal
        safeBoxOpen={safeBoxModalOpen}
        safeBoxClose={() => {
          setSafeBoxModalOpen(false);
        }}
      /> */}

      <div className={styles.footerContent}>
        <LeftNavigation handleNavigation={handleNavigation} handleClick={handleClick} />
        <RightNavigation handleNavigation={handleNavigation} handleClick={handleClick} gotoWithdraw={gotoWithdraw} />
      </div>
    </>
  );
};

export default Footer;
