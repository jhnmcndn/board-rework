import { ActiveSideBarItem, GameInfoGroup, MessageHomeNotice, RspGameInfo, RspGameType } from '@/types/app';
import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

export const initialActiveSideBarItem = {
  id: 0,
  name: '',
  icon: '',
  type: 0,
};

export const initialActivePlatform = {
  cardIcon: '',
  icon: '',
  id: -1,
  name: '',
  rspGameInfos: [],
};

type GameState = {
  sideBar: RspGameType[];
  activeSideBarItem: ActiveSideBarItem;
  gameInfoGroup: GameInfoGroup[];
  messageHomeNotices: MessageHomeNotice[];
  announceText: string;
  gameInfos: RspGameInfo[];
  showPlatform: boolean;
  activePlatform: GameInfoGroup;
};

type GameActions = {
  setSideBar: (sideBar: RspGameType[]) => void;
  setActiveSideBarItem: (activeSideBarItem: ActiveSideBarItem) => void;
  setGameInfoGroup: (gameInfoGroup: GameInfoGroup[]) => void;
  setMessageHomeNotices: (messageHomeNotices: MessageHomeNotice[]) => void;
  setAnnounceText: (announceText: string) => void;
  setGameInfos: (gameInfos: RspGameInfo[]) => void;
  setShowPlatform: (showPlatform: boolean) => void;
  setActivePlatform: (activePlatform: GameInfoGroup) => void;
};

export type GameStore = GameState & GameActions;

export const createGameStore = () =>
  createStore<GameStore>()(
    persist(
      (set) => ({
        sideBar: [],
        activeSideBarItem: initialActiveSideBarItem,
        gameInfoGroup: [],
        messageHomeNotices: [],
        announceText: '',
        gameInfos: [],
        showPlatform: false,
        activePlatform: initialActivePlatform,
        setSideBar: (sideBar) => set(() => ({ sideBar })),
        setActiveSideBarItem: (activeSideBarItem) => set(() => ({ activeSideBarItem })),
        setGameInfoGroup: (gameInfoGroup) => set(() => ({ gameInfoGroup })),
        setMessageHomeNotices: (messageHomeNotices) => set(() => ({ messageHomeNotices })),
        setAnnounceText: (announceText) => set(() => ({ announceText })),
        setGameInfos: (gameInfos) => set(() => ({ gameInfos })),
        setShowPlatform: (showPlatform) => set(() => ({ showPlatform })),
        setActivePlatform: (activePlatform) => set(() => ({ activePlatform })),
      }),
      {
        name: 'game-store',
      },
    ),
  );
