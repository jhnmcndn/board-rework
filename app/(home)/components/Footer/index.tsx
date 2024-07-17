'use client';
import { useStore } from '@/components/providers/StoreProvider';
import { serverConfig } from '@/server';
import { onClickSound } from '@/utils/audioFile';
import Link from 'next/link';
import React from 'react';
import { Svga } from 'react-svga';
import styles from './index.module.scss';
import { useMessageStore } from '@/components/providers/MessageProvider';
import Image from 'next/image';

const Footer = () => {
  const theme = useStore((state) => state.theme);
  const accountInfo = useStore((state) => state.accountInfo);
  const messageOnSites = useMessageStore((state) => state.messageOnSites);
  const getBoxPassIsOpen = useStore((state) => state.boxPassIsSet);

  // const withdrawSvga = require(`@/assets/${serverConfig.server}/withdraw.svga`);
  // const rechargeSvga = require(`@/assets/${serverConfig.server}/recharge.svga`);

  const isLoggedIn = accountInfo.id !== undefined;
  // const setMessageOnSites = useMessageStore((state) => state.setMessageOnSites);

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
            <div>
              <Link href='/customer-service'>
                <Image alt='' src={require(`@/assets/${theme}/footer/iconSupport.png`)} />
              </Link>
              <p className={styles.text}>客服</p>
            </div>
          </li>
          <li
            onClick={() => {
              // handleClick({ fn: gotoWashCode });
            }}
          >
            <div>
              <div>
                <Image alt='' src={require(`@/assets/${theme}/footer/iconChip.png`)} />
              </div>
              <p className={styles.text}>洗码</p>
            </div>
          </li>
          <li
          // onClick={() => {
          //   if (accountInfo?.id) setActiveSideLoggedIn(1);
          //   if (!accountInfo?.id) setActiveSideLoggedIn(3);
          //   // dispatch(setShowOtherModalComp(true));
          //   // giftSound();
          //   handleClick({ fn: setOmOpen, params: true, isActivity: true });
          // }}
          >
            <div>
              <Image alt='' src={require(`@/assets/${theme}/footer/iconGift.png`)} />
              <p className={styles.text}>活动</p>
            </div>
          </li>
          <li
            onClick={() => {
              // handleClick({ fn: gotoUserReceivedMail });
            }}
          >
            <div>
              {!isLoggedIn || (unreadMsgs?.length > 0 && <center className='alertIcon'></center>)}
              <Image alt='' src={require(`@/assets/${theme}/footer/iconMessage.png`)} />
              <p className={styles.text}>消息</p>
            </div>
          </li>

          <li
            onClick={() => {
              // setShowMore(!setShowMore);
            }}
          >
            <div>
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
              <p className={styles.text}>更多</p>
            </div>
          </li>
        </ul>

        <div className={styles.rightNavigation}>
          <div className={styles.buttons}>
            <div
              className={styles.withdraw}
              onClick={() => {
                // handleClick({ fn: gotoWithdraw });
              }}
            >
              {/* <Svga src={withdrawSvga} className={styles.greenBtn} /> */}
            </div>

            <div
              className={styles.other}
              onClick={() => {
                // handleClick({ fn: gotoRecharge });
              }}
            >
              {/* <Svga src={rechargeSvga} className={styles.yellowBtn} /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
