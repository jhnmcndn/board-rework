import { getMessageHomeNotices, init } from '@/api/platform';
import { HomePage } from '@/app/(home)/components/';

const Home = async () => {
  const initData = await init();
  // const messageHomeNoticesData = await getMessageHomeNotices();

  return <HomePage init={initData} />;
};

export default Home;
