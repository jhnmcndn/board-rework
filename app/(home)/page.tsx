import { getGameInfos, getGameTypes } from '@/api/game';
import { boxPassIsOpen, getMessageHomeNotices, getMessageOnSites, init } from '@/api/platform';
import { HomePage } from '@/app/(home)/components/';

const Home = async () => {
  const initData = await init();
  const messageHomeNoticesData = await getMessageHomeNotices();
  const gameTypesData = await getGameTypes();
  const gameInfosData = await getGameInfos();
  const messageOnSites = await getMessageOnSites();
  const getBoxPassIsOpen = await boxPassIsOpen();

  return (
    <HomePage
      init={initData}
      messageHomeNoticesData={messageHomeNoticesData}
      gameTypesData={gameTypesData}
      gameInfosData={gameInfosData}
      messageOnSites={messageOnSites}
      getBoxPassIsOpen={getBoxPassIsOpen}
    />
  );
};

export default Home;
