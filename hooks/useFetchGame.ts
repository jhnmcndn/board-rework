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
    setIsGamesLoading(true);
    const response = await getGameInfoGroup(id);
    if (response && !('message' in response)) {
      setGameInfoGroup(response);
    }
    setIsGamesLoading(false);
  };

  const fetchGameInfo = async (params: { id: number; pid: number }, item?: RspGameType) => {
    let newParams = params;
    if (item && item.type === 3 && showPlatform) {
      newParams = { id: params.id, pid: activePlatform.id || -1 };
    }
    setIsGamesLoading(true);
    const response = await getGameInfos(newParams);
    if (response && !('message' in response)) {
      setGameInfos(response);
    }
    setIsGamesLoading(false);
  };

  const handleChange = (item: RspGameType) => {
    if (item.type === 4 || item.type === 3) {
      fetchGameInfoGroup(item.id || 0);
    }
    if (item.type === 2) {
      setShowPlatform(false);
    }
    fetchGameInfo({ id: item.id || 0, pid: -1 }, item);
    setActiveSideBarItem(item);
  };

  return { fetchGameInfoGroup, fetchGameInfo, handleChange };
};

export default useFetchGame;
