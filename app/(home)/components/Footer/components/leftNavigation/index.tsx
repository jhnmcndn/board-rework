import { useStore } from '@/components/providers/StoreProvider';
import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.scss';

import { useMessageStore } from '@/components/providers/MessageProvider';
import { MessageOnSites } from '@/types/app';
import { onClickSound } from '@/utils/audioFile';
import { useEffect, useState } from 'react';
import { HandleClickParams } from '../..';

type LeftNavigationProps = {
  handleNavigation: (path: string, soundKey?: string) => void;
  handleClick: ({ fn, params, isActivity }: HandleClickParams) => void;
};

const LeftNavigation: React.FC<LeftNavigationProps> = ({ handleNavigation, handleClick }) => {
  const theme = useStore((state) => state.theme);
  const accountInfo = useStore((state) => state.accountInfo);
  const messageOnSites = useMessageStore((state) => state.messageOnSites);
  const [unreadMsgs, setUnreadMsgs] = useState<MessageOnSites[]>([]);
  const isLoggedIn = Boolean(accountInfo.id);

  const [omOpen, setOmOpen] = useState(false);
  const [activeSideLoggedIn, setActiveSideLoggedIn] = useState(3);

  const iconSupport = require(`@/assets/${theme}/footer/iconSupport.png`);
  const iconChip = require(`@/assets/${theme}/footer/iconChip.png`);
  const iconGift = require(`@/assets/${theme}/footer/iconGift.png`);
  const iconMessage = require(`@/assets/${theme}/footer/iconMessage.png`);
  const iconMore = require(`@/assets/${theme}/footer/iconMore.png`);

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
            <Image src={iconSupport} alt='Support Icon' />
            <span className={styles.text}>客服</span>
          </Link>
        </li>
        <li onClick={() => handleNavigation('/code-washing', 'cleanCode')}>
          <div className={styles.listContainer}>
            <Image src={iconChip} alt='Chip Icon' />
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
            <Image src={iconGift} alt='Gift Icon' />
            <span className={styles.text}>活动</span>
          </div>
        </li>
        <li onClick={() => handleNavigation('/mailbox', 'message')}>
          <div className={styles.listContainer}>
            {(!isLoggedIn || unreadMsgs.length > 0) && <center className='alertIcon' />}
            <Image src={iconMessage} alt='Message Icon' />
            <span className={styles.text}>消息</span>
          </div>
        </li>
        <li onClick={() => onClickSound('pop')}>
          <div className={styles.listContainer}>
            <Image src={iconMore} alt='More Icon' />
            <span className={styles.text}>更多</span>
          </div>
        </li>
      </ul>
    </>
  );
};

export default LeftNavigation;
