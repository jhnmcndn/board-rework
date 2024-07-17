import { getGameInfos, getGameTypes } from '@/api/game';
import { getMessageHomeNotices, init } from '@/api/platform';
import { HomePage } from '@/app/(home)/components/';

const Home = async () => {
  const initData = await init();
  const messageHomeNoticesData = await getMessageHomeNotices();
  const gameTypesData = await getGameTypes();
  const gameInfosData = await getGameInfos({ section: 1, pid: -1 });

  return (
    <HomePage
      init={initData}
      messageHomeNoticesData={messageHomeNoticesData}
      gameTypesData={gameTypesData}
      gameInfosData={gameInfosData}
    />
  );
};

export default Home;
