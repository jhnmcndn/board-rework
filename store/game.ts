import { ActiveSideBarItem, GameInfoGroup, MessageHomeNotice, RspGameInfo, RspGameType } from '@/types/app';
import { createStore as createZustandStore } from 'zustand';

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

type State = {
  sideBar: RspGameType[];
  activeSideBarItem: ActiveSideBarItem;
  gameInfoGroup: GameInfoGroup[];
  messageHomeNotices: MessageHomeNotice[];
  announceText: string;
  gameInfos: RspGameInfo[];
  showPlatform: boolean;
  activePlatform: GameInfoGroup;
};

type Actions = {
  setSideBar: (sideBar: RspGameType[]) => void;
  setActiveSideBarItem: (activeSideBarItem: ActiveSideBarItem) => void;
  setGameInfoGroup: (gameInfoGroup: GameInfoGroup[]) => void;
  setMessageHomeNotices: (messageHomeNotices: MessageHomeNotice[]) => void;
  setAnnounceText: (announceText: string) => void;
  setGameInfos: (gameInfos: RspGameInfo[]) => void;
  setShowPlatform: (showPlatform: boolean) => void;
  setActivePlatform: (activePlatform: GameInfoGroup) => void;
};

export type Store = State & Actions;

export const createStore = () =>
  createZustandStore<Store>()((set) => ({
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
  }));
