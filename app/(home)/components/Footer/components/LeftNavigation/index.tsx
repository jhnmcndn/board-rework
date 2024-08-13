import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import MoreModal from '@/components/modals/MoreModal';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { useMessageStore } from '@/components/Providers/MessageStoreProvider';
import useAuthCheck from '@/hooks/useAuthCheck';
import useImages from '@/hooks/useImages';
import { MessageOnSites } from '@/types/app';
import { sfx } from '@/utils/audioFile';
import styles from './index.module.scss';

const LeftNavigation: React.FC = () => {
  const { push } = useRouter();
  const { images } = useImages();
  const { authCheck } = useAuthCheck();
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

  const handleNavigation = (route: string) => {
    authCheck(() => push(route));
  };

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
            <Image src={images.support} alt='Support Icon' />
            <span className={styles.text}>客服</span>
          </Link>
        </li>

        <li data-click={sfx.cleanCodeAudio} onClick={() => handleNavigation('/code-washing')}>
          <div className={styles.listContainer}>
            <Image src={images.chip} alt='Chip Icon' />
            <span className={styles.text}>洗码</span>
          </div>
        </li>

        <li
          data-click={sfx.giftAudio}
          onClick={() => {
            accountInfo?.id ? setActiveSideLoggedIn(1) : setActiveSideLoggedIn(3);
            // handleClick({ fn: setOmOpen, params: true, isActivity: true });
          }}
        >
          <div className={styles.listContainer}>
            <Image src={images.gift} alt='Gift Icon' />
            <span className={styles.text}>活动</span>
          </div>
        </li>

        <li data-click={sfx.messageAudio} onClick={() => handleNavigation('/mailbox')}>
          <div className={styles.listContainer}>
            {(!isLoggedIn || unreadMsgs.length > 0) && <center className='alertIcon' />}
            <Image src={images.message} alt='Message Icon' />
            <span className={styles.text}>消息</span>
          </div>
        </li>

        <li
          data-click={sfx.popAudio}
          onClick={() => {
            setShowMoreModal(!showMoreModal);
          }}
        >
          <div className={styles.listContainer}>
            <Image src={images.more} alt='More Icon' />
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
