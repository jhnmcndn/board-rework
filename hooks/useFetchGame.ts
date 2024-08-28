import { getGameInfoGroup, getGameInfos } from '@/api/game';
import { useGameStore } from '@/components/Providers/GameStoreProvider';
import { RspGameType } from '@/types/app';

const useFetchGame = () => {
  const {
    setActiveSideBarItem,
    showPlatform,
    activePlatform,
    setShowPlatform,
    setIsGamesLoading,
    setGameInfos,
    setGameInfoGroup,
  } = useGameStore((state) => state);

  const fetchGameInfoGroup = async (id: number) => {
    const response = await getGameInfoGroup(id);
    if (response && !('message' in response)) {
      setGameInfoGroup(response);
    }
  };

  const fetchGameInfo = async (params: { id: number; pid: number }, item?: RspGameType) => {
    let newParams = params;
    if (item && item.type === 3 && showPlatform) {
      newParams = { id: params.id, pid: activePlatform.id || -1 };
    }
    const response = await getGameInfos(newParams);
    if (response && !('message' in response)) {
      setGameInfos(response);
    }
  };
  const handleChange = async (item: RspGameType) => {
    setIsGamesLoading(true);

    if (item.type === 2) setShowPlatform(false);
    if (item.type === 4 || item.type === 3) await fetchGameInfoGroup(item.id || 0);

    await fetchGameInfo({ id: item.id || 0, pid: -1 }, item);

    setActiveSideBarItem(item);
    setIsGamesLoading(false);
  };

  return { fetchGameInfoGroup, fetchGameInfo, handleChange };
};

export default useFetchGame;
