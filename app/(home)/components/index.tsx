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
  const setMessageOnSites = useMessageStore((state) => state.setMessageOnSites);
  const { theme, setInit, setBoxPassIsSet } = useAccountStore((state) => state);
  const { activeSideBarItem, setGameInfos, setAnnounceText, setSideBar, setActiveSideBarItem } = useGameStore(
    (state) => state,
  );

  useEffect(() => {
    setInit(init);

    if (messageHomeNoticesData && !('message' in messageHomeNoticesData)) {
      setAnnounceText(messageHomeNoticesData.otherData || '');
    }

    if (gameTypesData && !('message' in gameTypesData) && gameTypesData.rspGameTypes) {
      setSideBar(gameTypesData.rspGameTypes.filter((item) => item.id !== 6));
      // setActiveSideBarItem(gameTypesData.rspGameTypes.length > 0 ? gameTypesData?.rspGameTypes[0] : activeSideBarItem);
    }

    if (gameInfosData && !('message' in gameInfosData)) {
      setGameInfos(gameInfosData || []);
    }

    if (messageOnSites && !('message' in messageOnSites) && messageOnSites.length > 0) {
      setMessageOnSites(
        messageOnSites
          .toSorted((a, b) => {
            if (a.createTime && b.createTime) {
              return a.createTime > b.createTime ? 1 : -1;
            }
            return -1;
          })
          .map((item) => ({
            ...item,
            isRead: false,
          })),
      );
    }

    if (getBoxPassIsOpen && typeof getBoxPassIsOpen === 'boolean') {
      setBoxPassIsSet(getBoxPassIsOpen);
    }
  }, [init, messageHomeNoticesData, gameTypesData, gameInfosData, messageOnSites, getBoxPassIsOpen]);

  return (
    <div className='mainColor' data-theme={theme}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
