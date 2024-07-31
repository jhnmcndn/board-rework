'use client';

import Accordion from '@/components/Accordion';
import NoData from '@/components/NoData';
import { useMessageStore } from '@/components/Providers/MessageStoreProvider';
import useImages from '@/hooks/useImages';

const MailList = () => {
  const { images } = useImages();
  const messageOnSites = useMessageStore((state) => state.messageOnSites);

  return messageOnSites.length > 0 ? (
    messageOnSites
      .toSorted((a, b) => {
        if (a.createTime && b.createTime) return a.createTime > b.createTime ? 1 : -1;
        return -1;
      })
      .map((mail, index) => (
        <div key={index}>
          <Accordion title={mail.title || ''} content={mail.content || ''} delay={index} img={images.envelope_icon} />
        </div>
      ))
  ) : (
    <NoData />
  );
};

export default MailList;
