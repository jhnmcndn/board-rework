'use client';

import { useStore } from '@/components/providers/StoreProvider';
import { Header } from '@/app/(home)/components/Header';
import { FC, useEffect } from 'react';
import { ErrorData, GetGameTypes, Init, MessageHomeNotice, RootResponse, RspGameInfo } from '@/types/app';
import { initState } from '@/store';
import Main from './Main';
import { useGameStore } from '@/components/providers/GameProvider';

export type HomePageComponent = FC<
  Readonly<{
    init?: Init | ErrorData;
    messageHomeNoticesData?: Pick<RootResponse<MessageHomeNotice[] | ErrorData>, 'data' | 'otherData'>;
    gameTypesData?: GetGameTypes | ErrorData;
    gameInfosData?: RspGameInfo[] | ErrorData;
  }>
>;

export const HomePage: HomePageComponent = ({ init, messageHomeNoticesData, gameTypesData, gameInfosData }) => {
  const theme = useStore((state) => state.theme);
  const setInit = useStore((state) => state.setInit);
  const setAnnounceText = useGameStore((state) => state.setAnnounceText);
  const setSideBar = useGameStore((state) => state.setSideBar);
  const setActiveSideBarItem = useGameStore((state) => state.setActiveSideBarItem);
  const activeSideBarItem = useGameStore((state) => state.activeSideBarItem);
  const setGameInfos = useGameStore((state) => state.setGameInfos);

  useEffect(() => {
    if (init && !('message' in init)) {
      setInit(init || initState);
    }

    if (messageHomeNoticesData && !('message' in messageHomeNoticesData)) {
      setAnnounceText(messageHomeNoticesData.otherData || '');
    }

    if (gameTypesData && !('message' in gameTypesData)) {
      if (!gameTypesData.rspGameTypes) {
        return;
      }
      setSideBar(gameTypesData.rspGameTypes.filter((item) => item.id !== 6));
      setActiveSideBarItem(gameTypesData.rspGameTypes.length > 0 ? gameTypesData?.rspGameTypes[0] : activeSideBarItem);
    }

    if (gameInfosData && !('message' in gameInfosData)) {
      setGameInfos(gameInfosData || []);
    }
  }, [init, messageHomeNoticesData, gameTypesData, gameInfosData]);

  return (
    <div className='mainColor' data-theme={theme}>
      <Header />
      <Main />
      {/* <Footer /> */}
    </div>
  );
};
