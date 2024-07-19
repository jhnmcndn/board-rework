import { getGameInfos, getGameTypes } from '@/api/game';
import { boxPassIsOpen, getMessageHomeNotices, getMessageOnSites, init } from '@/api/platform';
import { HomePage } from '@/app/(home)/components/';
import { getBindCardList } from "@/api/pay";

const Home = async () => {
  const initData = await init();
  const messageHomeNoticesData = await getMessageHomeNotices();
  const gameTypesData = await getGameTypes();
  const gameInfosData = await getGameInfos();
  const messageOnSites = await getMessageOnSites();
  const getBoxPassIsOpen = await boxPassIsOpen();
  const bindCardList = await getBindCardList();

  return (
    <HomePage
      init={initData}
      messageHomeNoticesData={messageHomeNoticesData}
      gameTypesData={gameTypesData}
      gameInfosData={gameInfosData}
      messageOnSites={messageOnSites}
      getBoxPassIsOpen={getBoxPassIsOpen}
      bindCardList={bindCardList}
    />
  );
};

export default Home;
