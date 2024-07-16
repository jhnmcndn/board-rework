import { ActiveSideBarItem, GameInfoGroup, MessageHomeNotice, RspGameInfo, RspGameType } from '@/types/app';
import { createStore as createZustandStore } from 'zustand';

export const initialActiveSideBarItem = {
  id: 0,
  name: '',
  icon: '',
  type: 0,
};

type State = {
  sideBar: RspGameType[];
  activeSideBarItem: ActiveSideBarItem;
  gameInfoGroup: GameInfoGroup[];
  messageHomeNotices: MessageHomeNotice[];
  announceText: string;
  gameInfos: RspGameInfo[];
};

type Actions = {
  setSideBar: (sideBar: RspGameType[]) => void;
  setActiveSideBarItem: (activeSideBarItem: ActiveSideBarItem) => void;
  setGameInfoGroup: (gameInfoGroup: GameInfoGroup[]) => void;
  setMessageHomeNotices: (messageHomeNotices: MessageHomeNotice[]) => void;
  setAnnounceText: (announceText: string) => void;
  setGameInfos: (gameInfos: RspGameInfo[]) => void;
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
    setSideBar: (sideBar) => set(() => ({ sideBar })),
    setActiveSideBarItem: (activeSideBarItem) => set(() => ({ activeSideBarItem })),
    setGameInfoGroup: (gameInfoGroup) => set(() => ({ gameInfoGroup })),
    setMessageHomeNotices: (messageHomeNotices) => set(() => ({ messageHomeNotices })),
    setAnnounceText: (announceText) => set(() => ({ announceText })),
    setGameInfos: (gameInfos) => set(() => ({ gameInfos })),
  }));
