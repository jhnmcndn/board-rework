'use client';

import Accordion from '@/components/Accordion';
import NoData from '@/components/NoData';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { useMessageStore } from '@/components/Providers/MessageStoreProvider';

const MailList = () => {
  const messageOnSites = useMessageStore((state) => state.messageOnSites);
  const theme = useAccountStore((state) => state.theme);
  const envelopeIcon = require(`@/assets/${theme}/fragments/envelope.png`);

  return messageOnSites.length > 0 ? (
    messageOnSites
      .toSorted((a, b) => {
        if (a.createTime && b.createTime) return a.createTime > b.createTime ? 1 : -1;
        return -1;
      })
      .map((mail, index) => (
        <div key={index}>
          <Accordion title={mail.title || ''} content={mail.content || ''} delay={index} img={envelopeIcon} />
        </div>
      ))
  ) : (
    <NoData />
  );
};

export default MailList;
