'use client';

import { useStore } from '@/components/providers/StoreProvider';
import { Header } from '@/app/(home)/components/Header';
import { FC, useEffect } from 'react';
import {
  ErrorData,
  GetGameTypes,
  Init,
  MessageHomeNotice,
  MessageOnSites,
  RootResponse,
  RspGameInfo,
} from '@/types/app';
import { initState } from '@/store';
import Main from './Main';
import { useGameStore } from '@/components/providers/GameProvider';
import Footer from '@/app/(home)/components/Footer';
import { useMessageStore } from '@/components/providers/MessageProvider';

export type HomePageComponent = FC<
  Readonly<{
    init?: Init | ErrorData;
    messageHomeNoticesData?: Pick<RootResponse<MessageHomeNotice[] | ErrorData>, 'data' | 'otherData'>;
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
  const theme = useStore((state) => state.theme);
  const setInit = useStore((state) => state.setInit);
  const setAnnounceText = useGameStore((state) => state.setAnnounceText);
  const setSideBar = useGameStore((state) => state.setSideBar);
  const setActiveSideBarItem = useGameStore((state) => state.setActiveSideBarItem);
  const activeSideBarItem = useGameStore((state) => state.activeSideBarItem);
  const setGameInfos = useGameStore((state) => state.setGameInfos);
  const setMessageOnSites = useMessageStore((state) => state.setMessageOnSites);
  const setBoxPassIsSet = useStore((state) => state.setBoxPassIsSet);

  useEffect(() => {
    if (init && !('message' in init)) {
      setInit(init || initState);
    }

    if (messageHomeNoticesData && !('message' in messageHomeNoticesData)) {
      setAnnounceText(messageHomeNoticesData.otherData || '');
    }

    if (gameTypesData && !('message' in gameTypesData) && gameTypesData.rspGameTypes) {
      setSideBar(gameTypesData.rspGameTypes.filter((item) => item.id !== 6));
      setActiveSideBarItem(gameTypesData.rspGameTypes.length > 0 ? gameTypesData?.rspGameTypes[0] : activeSideBarItem);
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
