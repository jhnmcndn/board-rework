import { getGameInfos, getGameTypes } from '@/api/game';
import { boxPassIsOpen, getMessageHomeNotices, getMessageOnSites, init } from '@/api/platform';
import { HomePage } from '@/app/(home)/components/';
import LoadingScreen from '@/components/LoadingScreen';

const Home = async () => {
  const initData = await init();
  const messageHomeNoticesData = await getMessageHomeNotices();
  const gameTypesData = await getGameTypes();
  const gameInfosData = await getGameInfos();
  const messageOnSites = await getMessageOnSites();
  const getBoxPassIsOpen = await boxPassIsOpen();

  return (
    <>
      <LoadingScreen />
      <HomePage
        init={initData}
        messageHomeNoticesData={messageHomeNoticesData}
        gameTypesData={gameTypesData}
        gameInfosData={gameInfosData}
        messageOnSites={messageOnSites}
        getBoxPassIsOpen={getBoxPassIsOpen}
      />
    </>
  );
};

export default Home;
