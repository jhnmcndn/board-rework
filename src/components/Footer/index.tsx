import React, { useEffect, useState } from 'react';
// import { getAccountInfo } from 'src/api/game/gamelist';
// import { Folder_env, isLoggedIn, logoutUser } from 'src/utils/helpers';
// import SafeBoxModal from '@/components/Modal/Vault';
// import { useAuth } from '../Modal/LoginAuth';
// import MoreModal from '../Modal/MoreModal/index';
// import useModal from '../Modal/useModal/index';
// import { default as GiftBoxModal, default as MegaphoneModal } from '../OtherModalComponent';
// import UserAuthModal from '../UserAuthModal/UserAuthModal';
import styles from './index.module.scss';

import { getReceivedMessage } from '@/api/platformApp'; //
import { SERVER } from '@/constants/app'; //
import { useAccountStore } from '@/store/useAccountStore'; //
import { useAppStore } from '@/store/useAppStore'; //
import { isLoggedIn, onClickSound } from '@/utils/app'; //
import { Link, useNavigate } from '@tanstack/react-router'; //
import { Svga } from 'react-svga';

const Footer: React.FC = () => {
  const withdrawSvga = `src/assets/variants/${SERVER}/withdraw.svga`; //
  const rechargeSvga = `src/assets/variants/${SERVER}/recharge.svga`; //
  // const [showMore, setShowMore] = useModal();
  const navigate = useNavigate(); //
  const [omOpen, setOmOpen] = useState(false);
  const [omMegaphone, setOmMegaphone] = useState(false);
  const [userAuthModal, setUserAuthModal] = useState(false);
  const [unreadMsgs, setUnreadMsgs] = useState();
  const [activeSideLoggedIn, setActiveSideLoggedIn] = useState(3);
  // const auth = useAuth();

  const mails = useAccountStore((state) => state.mails);
  const userData = useAccountStore((state) => state.accountInfo);
  const theme = useAppStore((state) => state.theme);
  // const { showAnnouncementModal } = useSelector((state) => state.gameSettings);

  const [safeBoxModalOpen, setSafeBoxModalOpen] = useState(false);

  const isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

  const gotoWithdraw = () => {
    // navigate("/InternalSidebarPage", {
    //   state: { page: "withdraw", section: "selfwithdraw", sideActive: 1 },
    // });
    if (isIOS) {
      // wAudioFile.play();
      onClickSound('withdraw');
    }
    // const loginNow = JSON.parse(localStorage.getItem('loginNow'));
    // localStorage.setItem('withdrawModal', 'true');
    // if (!isLoggedIn()) {
    // dispatch(setShowBindWithdrawModal(true));
    // } else if (!Folder_env('8803')) {
    // dispatch(setShowBindWithdrawModal(true));
    // } else {
    // navigate('/withdraw');
    // dispatch(setShowBindWithdrawModal(false));
    // }
  };
  const start = () => {
    if (isIOS) {
      // cusAudioFile.play();
      onClickSound('customer');
    }
  };
  const gotoWashCode = () => {
    // navigate("/InternalClearPage", {
    //   state: { page: "washCode", sideActive: 1 },
    // });
    if (isIOS) {
      // ccAudioFile.play();
      onClickSound('cleanCode');
    }
    // navigate('/CodeWashing');
  };

  const gotoRecharge = () => {
    // navigate("/InternalSidebarPage", {
    //   state: { page: "recharge", section: "companyDeposit", sideActive: 1 },
    // });
    if (isIOS) {
      // rAudioFile.play();
      onClickSound('recharge');
    }
    // navigate('/recharge');
  };

  const gotoUserReceivedMail = () => {
    if (isIOS) {
      // mailAudioFile.play();
      onClickSound('message');
    }
    // navigate('/mailbox');
  };

  const handleClick = ({ fn, params, isActivity = false }) => {
    if (isActivity) {
      fn(params ? params : null);
    } else {
      if (!isLoggedIn()) {
        // dispatch(setShowLoginModal(true));
      } else {
        // getAccountInfo().then((res) => {
        //   if (res.data.code === 401) {
        //     auth?.logout();
        // logoutUser();
        // dispatch(resetUserInfoState());
        // dispatch(setShowLoginModal(true));
        //   } else {
        //     fn(params ? params : null);
        //   }
        // });
      }
    }
  };

  useEffect(() => {
    isLoggedIn() &&
      getReceivedMessage().then((res) => {
        // let transformedMails;
        // if (mails?.length === 0) {
        //   transformedMails = res.data?.data
        //     ?.sort((a, b) => (a.createTime > b.createTime ? 1 : -1))
        //     ?.map((mail, idx) => {
        //       return { ...mail, isRead: false };
        //     });
        //   dispatch(setMails(transformedMails));
        // }
      });
  }, []);

  // useEffect(() => {
  // mails?.length > 0 && setUnreadMsgs(mails?.filter((mail) => mail?.isRead === false));
  // }, [mails]);

  // useEffect(() => {
  //   showAnnouncementModal && setOmMegaphone(showAnnouncementModal);
  //   dispatch(setShowAnnouncementModal(false));
  // }, [showAnnouncementModal]);

  // useEffect(() => {
  // boxPassIsOpen().then((res) => {
  //   dispatch(setBoxPassIsSet(res.data?.data));
  // });
  // }, [userData]);

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
              <Link to="/customer-service">
                <img alt="" src={`src/assets/${theme}/footer/Icon-support.png`} />
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
                <img alt="" src={`src/assets/${theme}/footer/Icon-chip.png`} />
              </div>
              <p className={styles.text}>洗码</p>
            </div>
          </li>
          <li
            onClick={() => {
              if (userData?.id) setActiveSideLoggedIn(1);
              if (!userData?.id) setActiveSideLoggedIn(3);
              // dispatch(setShowOtherModalComp(true));
              // giftSound();
              handleClick({ fn: setOmOpen, params: true, isActivity: true });
            }}
          >
            <div>
              <img alt="" src={`src/assets/${theme}/footer/Icon-gift.png`} />
              <p className={styles.text}>活动</p>
            </div>
          </li>
          <li
            onClick={() => {
              // handleClick({ fn: gotoUserReceivedMail });
            }}
          >
            <div>
              {!isLoggedIn() || (unreadMsgs?.length > 0 && <center className="alertIcon"></center>)}
              <img alt="" src={`/src/assets/${theme}/footer/Icon-message.png`} />
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
              <img
                alt=""
                src={`src/assets/${theme}/footer/Icon-more.png`}
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
              <Svga src={withdrawSvga} className={styles.greenBtn} />
            </div>

            <div
              className={styles.other}
              onClick={() => {
                // handleClick({ fn: gotoRecharge });
              }}
            >
              <Svga src={rechargeSvga} className={styles.yellowBtn} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
