'use client';
import styles from '@/app/mailbox/index.module.scss';
import Accordion from '@/components/Accordion';
import NoData from '@/components/NoData';
import { useMessageStore } from '@/components/Providers/MessageStoreProvider';
import useImages from '@/hooks/useImages';
import { MessageOnSites } from '@/types/app';

const MailList = () => {
  const { images } = useImages();
  const messageOnSites: MessageOnSites[] = useMessageStore((state) => state.messageOnSites);

  return (
    <>
      {messageOnSites.length === 0 && <NoData />}
      {messageOnSites.length > 0 &&
        messageOnSites
          .toSorted((a, b) => {
            if (a.createTime && b.createTime) return a.createTime > b.createTime ? 1 : -1;
            return -1;
          })
          .map((mail, index) => (
            <div key={index} className={styles.mailItem}>
              <Accordion message={mail} delay={index} img={images.envelope} />
            </div>
          ))}
    </>
  );
};

export default MailList;
