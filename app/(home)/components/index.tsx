'use client';

import Footer from '@/app/(home)/components/Footer';
import { Header } from '@/app/(home)/components/Header';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { useGameStore } from '@/components/Providers/GameStoreProvider';
import { useMessageStore } from '@/components/Providers/MessageStoreProvider';
import { ErrorData, GetGameTypes, Init, MessageHomeNotice, MessageOnSites, RspGameInfo } from '@/types/app';
import { FC, useEffect } from 'react';
import Main from './Main';

export type HomePageComponent = FC<
  Readonly<{
    init: Init;
    messageHomeNoticesData?: {
      data: ErrorData | MessageHomeNotice[] | undefined;
      otherData: string | undefined;
    };
    gameTypesData?: GetGameTypes | ErrorData;
    gameInfosData?: RspGameInfo[] | ErrorData;
    messageOnSites?: MessageOnSites[] | ErrorData;
    getBoxPassIsOpen?: boolean | ErrorData;
  }>
>;

export const HomePage: HomePageComponent = ({
  init,
  messageHomeNoticesData,
  gameTypesData,
  gameInfosData,
  messageOnSites,
  getBoxPassIsOpen,
}) => {
  const { setMessageOnSites } = useMessageStore((state) => state);
  const { theme, setInit, setBoxPassIsSet } = useAccountStore((state) => state);
  const { activeSideBarItem, setGameInfos, setAnnounceText, setSideBar, setActiveSideBarItem, gameInfos } =
    useGameStore((state) => state);

  useEffect(() => {
    setInit(init);

    if (messageHomeNoticesData && !('message' in messageHomeNoticesData)) {
      setAnnounceText(messageHomeNoticesData.otherData || '');
    }

    if (gameTypesData && !('message' in gameTypesData) && gameTypesData.rspGameTypes) {
      setSideBar(gameTypesData.rspGameTypes.filter((item) => item.id !== 6));
      setActiveSideBarItem(
        activeSideBarItem.id === 0 && gameTypesData.rspGameTypes.length > 0
          ? gameTypesData?.rspGameTypes[0]
          : activeSideBarItem,
      );
    }

    if (gameInfosData && !('message' in gameInfosData) && gameInfos.length === 0) {
      setGameInfos(gameInfosData || []);
    }

    if (messageOnSites && !('message' in messageOnSites) && messageOnSites.length > 0) {
      const updatedMessageOnSites = messageOnSites.map((message) => ({
        ...message,
        isRead: message.isRead ?? false,
      }));
      setMessageOnSites(updatedMessageOnSites);
    }

    if (localStorage.getItem('existing-messages')) {
      const existingMessages: MessageOnSites[] = JSON.parse(localStorage.getItem('existing-messages') || '[]');
      if (messageOnSites && !('message' in messageOnSites) && messageOnSites.length > existingMessages.length) {
        const mergedArray = messageOnSites.map((item1) => {
          const foundItem = existingMessages.find((item2) => item2.id === item1.id);
          return {
            ...item1,
            isRead: foundItem ? foundItem.isRead : false,
          };
        });
        setMessageOnSites(mergedArray);
      } else {
        setMessageOnSites(existingMessages);
      }
    }

    if (getBoxPassIsOpen && typeof getBoxPassIsOpen === 'boolean') {
      setBoxPassIsSet(getBoxPassIsOpen);
    }
  }, [init, messageHomeNoticesData, gameTypesData, gameInfosData, messageOnSites, getBoxPassIsOpen]);

  return (
    <div className='mainColor' data-theme={theme} id='root'>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
