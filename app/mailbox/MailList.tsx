'use client';

import Accordion from '@/components/Accordion';
import NoData from '@/components/NoData';
import { useMessageStore } from '@/components/Providers/MessageStoreProvider';
import useImages from '@/hooks/useImages';
import { MessageOnSites } from '@/types/app';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const MailList = () => {
  const { images } = useImages();
  const messageOnSites: MessageOnSites[] = useMessageStore((state) => state.messageOnSites);
  const [displayedMessages, setDisplayedMessages] = useState<MessageOnSites[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const CHUNK_SIZE = 32;

  useEffect(() => {
    if (messageOnSites.length > 0) {
      const initialMessages = messageOnSites.slice(0, CHUNK_SIZE);
      setDisplayedMessages(initialMessages);
      setCurrentIndex(CHUNK_SIZE);
    }
  }, [messageOnSites]);

  const fetchMoreData = () => {
    const nextIndex = currentIndex + CHUNK_SIZE;
    const newMessages = messageOnSites.slice(currentIndex, nextIndex);
    setDisplayedMessages((prevMessages) => [...prevMessages, ...newMessages]);
    setCurrentIndex(nextIndex);
  };

  return (
    <div id='scrollableDiv' style={{ height: '90vh', overflow: 'auto' }}>
      <InfiniteScroll
        dataLength={displayedMessages.length}
        next={fetchMoreData}
        hasMore={currentIndex < messageOnSites.length}
        loader={<h4 style={{ textAlign: 'center', fontSize: '0.2rem' }}>Loading...</h4>}
        endMessage={<NoData />}
        scrollableTarget='scrollableDiv'
      >
        <>
          {displayedMessages.length > 0 &&
            displayedMessages
              .toSorted((a, b) => {
                if (a.createTime && b.createTime) return a.createTime > b.createTime ? 1 : -1;
                return -1;
              })
              .map((mail, index) => (
                <div key={index} style={index > 0 ? { marginTop: '0.1rem' } : {}}>
                  <Accordion message={mail} delay={index} img={images.envelope} />
                </div>
              ))}
        </>
      </InfiniteScroll>
    </div>
  );
};

export default MailList;
