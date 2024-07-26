'use client';

import Footer from '@/app/(home)/components/Footer';
import { Header } from '@/app/(home)/components/Header';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { useGameStore } from '@/components/Providers/GameStoreProvider';
import { useMessageStore } from '@/components/Providers/MessageStoreProvider';
import { initState } from '@/store/account';
import {
  BindCardList,
  ErrorData,
  GetGameTypes,
  Init,
  MessageHomeNotice,
  MessageOnSites,
  RootResponse,
  RspGameInfo,
} from '@/types/app';
import { FC, useEffect } from 'react';
import Main from './Main';

export type HomePageComponent = FC<
  Readonly<{
    init?: Init | ErrorData;
    messageHomeNoticesData?: Pick<RootResponse<MessageHomeNotice[] | ErrorData>, 'data' | 'otherData'>;
    gameTypesData?: GetGameTypes | ErrorData;
    gameInfosData?: RspGameInfo[] | ErrorData;
    messageOnSites?: MessageOnSites[] | ErrorData;
    getBoxPassIsOpen?: boolean | ErrorData;
    bindCardList?: BindCardList | ErrorData;
  }>
>;

export const HomePage: HomePageComponent = ({
  init,
  messageHomeNoticesData,
  gameTypesData,
  gameInfosData,
  messageOnSites,
  getBoxPassIsOpen,
  bindCardList,
}) => {
  const theme = useAccountStore((state) => state.theme);
  const setInit = useAccountStore((state) => state.setInit);
  const setAnnounceText = useGameStore((state) => state.setAnnounceText);
  const setSideBar = useGameStore((state) => state.setSideBar);
  const setActiveSideBarItem = useGameStore((state) => state.setActiveSideBarItem);
  const activeSideBarItem = useGameStore((state) => state.activeSideBarItem);
  const setGameInfos = useGameStore((state) => state.setGameInfos);
  const setMessageOnSites = useMessageStore((state) => state.setMessageOnSites);
  const setBoxPassIsSet = useAccountStore((state) => state.setBoxPassIsSet);
  const setBindCardList = useAccountStore((state) => state.setBindCardList);

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

    if (bindCardList && !('message' in bindCardList)) {
      setBindCardList(bindCardList);
    }
  }, [init, messageHomeNoticesData, gameTypesData, gameInfosData, messageOnSites, getBoxPassIsOpen, bindCardList]);

  return (
    <div className='mainColor' data-theme={theme}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
