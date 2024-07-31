import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import MoreModal from '@/components/modals/MoreModal';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { useMessageStore } from '@/components/Providers/MessageStoreProvider';
import useImages from '@/hooks/useImages';
import { MessageOnSites } from '@/types/app';
import { onClickSound } from '@/utils/audioFile';
import { HandleClickParams } from '../..';
import styles from './index.module.scss';

type LeftNavigationProps = {
  handleNavigation: (path: string, soundKey?: string) => void;
  handleClick: ({ fn, params, isActivity }: HandleClickParams) => void;
};

const LeftNavigation: React.FC<LeftNavigationProps> = ({ handleNavigation, handleClick }) => {
  const { images } = useImages();
  const [showMoreModal, setShowMoreModal] = useState(false);
  const accountInfo = useAccountStore((state) => state.accountInfo);
  const messageOnSites = useMessageStore((state) => state.messageOnSites);
  const isLoggedIn = Boolean(accountInfo.id);

  const [unreadMsgs, setUnreadMsgs] = useState<MessageOnSites[]>([]);
  const [omOpen, setOmOpen] = useState(false);
  const [activeSideLoggedIn, setActiveSideLoggedIn] = useState(3);
  const [isMegaphone, setMegaphone] = useState(false);
  const [safeBoxModalOpen, setSafeBoxModal] = useState(false);

  useEffect(() => {
    if (messageOnSites?.length > 0) {
      setUnreadMsgs(messageOnSites.filter((mail) => !mail.isRead));
    }
  }, [messageOnSites]);

  return (
    <>
      {/* <GiftBoxModal
        open={omOpen}
        onClose={() => {
          setOmOpen(!omOpen);
        }}
        activesideTab={activeSideLoggedIn}
        isSettings={false}
      /> */}

      <ul className={styles.leftNavigation}>
        <li>
          <Link href='/customer-service' className={styles.listContainer}>
            <Image src={images.support_icon} alt='Support Icon' />
            <span className={styles.text}>客服</span>
          </Link>
        </li>

        <li onClick={() => handleNavigation('/code-washing', 'cleanCode')}>
          <div className={styles.listContainer}>
            <Image src={images.chip_icon} alt='Chip Icon' />
            <span className={styles.text}>洗码</span>
          </div>
        </li>

        <li
          onClick={() => {
            accountInfo?.id ? setActiveSideLoggedIn(1) : setActiveSideLoggedIn(3);

            onClickSound('gift');
            handleClick({ fn: setOmOpen, params: true, isActivity: true });
          }}
        >
          <div className={styles.listContainer}>
            <Image src={images.gift_icon} alt='Gift Icon' />
            <span className={styles.text}>活动</span>
          </div>
        </li>

        {/* <li onClick={() => handleNavigation('/mailbox', 'message')}>
          <div className={styles.listContainer}>
            {(!isLoggedIn || unreadMsgs.length > 0) && <center className='alertIcon' />}
            <Image src={iconMessage} alt='Message Icon' />
            <span className={styles.text}>消息</span>
          </div>
        </li> */}

        {/* Replace the code above with the code below with auth added through handleNavigation */}

        <li>
          <Link href='/mailbox' className={styles.listContainer}>
            {(!isLoggedIn || unreadMsgs.length > 0) && <center className='alertIcon' />}
            <Image src={images.message_icon} alt='Message Icon' />
            <span className={styles.text}>消息</span>
          </Link>
        </li>

        <li
          onClick={() => {
            onClickSound('pop');
            setShowMoreModal(!showMoreModal);
          }}
        >
          <div className={styles.listContainer}>
            <Image src={images.more_icon} alt='More Icon' />
            <span className={styles.text}>更多</span>
          </div>
        </li>
      </ul>
      {showMoreModal && (
        <MoreModal
          setShowMore={setShowMoreModal}
          setOpenAnnounceModal={() => {
            setMegaphone(true);
            setShowMoreModal(false);
          }}
          setSafeBoxModal={() => {
            setShowMoreModal(false);
            setSafeBoxModal(true);
          }}
        />
      )}
    </>
  );
};

export default LeftNavigation;
