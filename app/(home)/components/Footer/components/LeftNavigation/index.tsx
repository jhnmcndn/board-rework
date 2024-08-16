import { useRouter } from 'next-nprogress-bar';
import { useEffect, useState } from 'react';

import MoreModal from '@/components/modals/MoreModal';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { useMessageStore } from '@/components/Providers/MessageStoreProvider';
import useAuthCheck from '@/hooks/useAuthCheck';
import useImages from '@/hooks/useImages';
import useModalStore from '@/store/modals';
import { MessageOnSites } from '@/types/app';
import { sfx } from '@/utils/audioFile';
import styles from './index.module.scss';
import ListContainer from './ListContainer';

const LeftNavigation: React.FC = () => {
  const { push } = useRouter();
  const { images } = useImages();
  const { authCheck } = useAuthCheck();
  const [showMoreModal, setShowMoreModal] = useState(false);
  const accountInfo = useAccountStore((state) => state.accountInfo);
  const messageOnSites = useMessageStore((state) => state.messageOnSites);
  const { openAnnouncement, setSidebarAnnouncement } = useModalStore();
  const isLoggedIn = Boolean(accountInfo.id);

  const [unreadMsgs, setUnreadMsgs] = useState<MessageOnSites[]>([]);

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
      {showMoreModal && (
        <MoreModal
          setShowMore={setShowMoreModal}
          setOpenAnnounceModal={() => {
            setShowMoreModal(false);
          }}
          setSafeBoxModal={() => {
            setShowMoreModal(false);
          }}
        />
      )}
      <ul className={styles.leftNavigation}>
        <ListContainer icon={images.support} text='客服' onClick={() => handleNavigation('/customer-service')} />
        <ListContainer icon={images.chip} text='洗码' onClick={() => handleNavigation('/code-washing')} />
        <ListContainer
          dataClick={sfx.giftAudio}
          onClick={() => {
            openAnnouncement();
            setSidebarAnnouncement(0);
          }}
          icon={images.gift}
          text='活动'
        />
        <div>
          {(!isLoggedIn || unreadMsgs.length > 0) && <center className='alertIcon' />}
          <ListContainer
            dataClick={sfx.messageAudio}
            icon={images.message}
            text='消息'
            onClick={() => handleNavigation('/mailbox')}
          />
        </div>

        <ListContainer
          dataClick={sfx.popAudio}
          icon={images.more}
          text='更多'
          onClick={() => setShowMoreModal(!showMoreModal)}
        />
      </ul>
    </>
  );
};

export default LeftNavigation;
