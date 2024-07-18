'use client';

import { useMessageStore } from '@/components/providers/MessageProvider';
import { useStore } from '@/components/providers/StoreProvider';
import rechargeSvga from '@/public/assets/svgas/recharge.svga';
import withdrawSvga from '@/public/assets/svgas/withdraw.svga';
import { serverConfig } from '@/server';
import useModalStore from '@/store/modals';
import { MessageOnSites } from '@/types/app';
import { AudioType, onClickSound } from '@/utils/audioFile';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isIOS } from 'react-device-detect';
import styles from './index.module.scss';

const CSVGA = dynamic(() => import('@/app/(home)/components/Footer/components/CSVGA/'), { ssr: false });

type Fn = (params?: any) => void;

type HandleClickParams = {
  fn: Fn;
  params?: any;
  isActivity?: boolean;
};

const Footer = () => {
  const router = useRouter();
  const theme = useStore((state) => state.theme);
  const accountInfo = useStore((state) => state.accountInfo);
  const messageOnSites = useMessageStore((state) => state.messageOnSites);
  const [unreadMsgs, setUnreadMsgs] = useState<MessageOnSites[]>([]);
  const openAuth = useModalStore((state) => state.openAuth);
  const [activeSideLoggedIn, setActiveSideLoggedIn] = useState(3);
  const [omOpen, setOmOpen] = useState(false);
  const isLoggedIn = accountInfo.id !== undefined;

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
    // const loginNow = JSON.parse(localStorage.getItem('loginNow'));
    // localStorage.setItem('withdrawModal', 'true');
    if (!isLoggedIn || String(serverConfig.server) !== '8803') {
      // dispatch(setShowBindWithdrawModal(true));
    } else {
      router.push('/withdraw');
      // dispatch(setShowBindWithdrawModal(false));
    }
  };

  const handleActivity = (fn: Fn, params?: any) => fn(params);

  const handleClick = ({ fn, params, isActivity = false }: HandleClickParams) => {
    if (isActivity || !isLoggedIn) {
      handleActivity(fn, params);
    } else {
      openAuth();
    }
  };

  useEffect(() => {
    if (messageOnSites?.length > 0) {
      setUnreadMsgs(messageOnSites?.filter((mail) => mail?.isRead === false));
    }
  }, [messageOnSites]);

  // useEffect(() => {
  //   if (showAnnouncementModal) {
  //     setOmMegaphone(showAnnouncementModal);
  //     dispatch(setShowAnnouncementModal(false));
  //   }
  // }, [showAnnouncementModal]);

  return (
    <>
      {/* <UserAuthModal
        open={userAuthModal}
        onLog={() => setUserAuthModal(false)}
        backDrop={() => setUserAuthModal(false)}
        inputBox={() => setUserAuthModal(true)}
      />

      <GiftBoxModal
        open={omOpen}
        onClose={() => {
          setOmOpen(!omOpen);
        }}
        activesideTab={activeSideLoggedIn}
        isSettings={false}
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
        <ul className={styles.leftNavigation}>
          <li>
            <Link href='/customer-service' className={styles.listContainer}>
              <Image alt='' src={require(`@/assets/${theme}/footer/iconSupport.png`)} />
              <span className={styles.text}>客服</span>
            </Link>
          </li>
          <li onClick={() => handleNavigation('/code-washing', 'cleanCode')}>
            <div className={styles.listContainer}>
              <Image alt='' src={require(`@/assets/${theme}/footer/iconChip.png`)} />
              <span className={styles.text}>洗码</span>
            </div>
          </li>
          <li
            onClick={() => {
              if (accountInfo?.id) setActiveSideLoggedIn(1);
              if (!accountInfo?.id) setActiveSideLoggedIn(3);
              // dispatch(setShowOtherModalComp(true));
              onClickSound('gift');
              handleClick({ fn: setOmOpen, params: true, isActivity: true });
            }}
          >
            <div className={styles.listContainer}>
              <Image alt='' src={require(`@/assets/${theme}/footer/iconGift.png`)} />
              <span className={styles.text}>活动</span>
            </div>
          </li>
          <li onClick={() => handleNavigation('/mailbox', 'message')}>
            <div className={styles.listContainer}>
              {!isLoggedIn || (unreadMsgs?.length > 0 && <center className='alertIcon' />)}
              <Image alt='' src={require(`@/assets/${theme}/footer/iconMessage.png`)} />
              <span className={styles.text}>消息</span>
            </div>
          </li>

          <li
            onClick={() => {
              // setShowMore(!setShowMore);
            }}
          >
            <div className={styles.listContainer}>
              {/* <MoreModal
                showMore={showMore}
                setShowMore={setShowMore}
                setOpenAnnounceModal={() => {
                  setOmMegaphone(true);
                  setShowMore(false);
                }}
                setSafeBoxModal={() => {
                  setShowMore(false);
                  setSafeBoxModalOpen(true);
                }}
              /> */}
              <Image
                alt=''
                src={require(`@/assets/${theme}/footer/iconMore.png`)}
                onClick={() => {
                  onClickSound('pop');
                  // setShowMore(!setShowMore);
                }}
              />
              <span className={styles.text}>更多</span>
            </div>
          </li>
        </ul>

        <div className={styles.rightNavigation}>
          <div className={styles.buttons}>
            <div className={styles.withdraw} onClick={() => handleClick({ fn: gotoWithdraw })}>
              <CSVGA src={withdrawSvga} className={styles.greenBtn} />
            </div>

            <div className={styles.other} onClick={() => handleNavigation('/recharge', 'recharge')}>
              <CSVGA src={rechargeSvga} className={styles.yellowBtn} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
