import { init } from '@/api/platform';
import { HomePage } from '@/app/(home)/components/';

const Home = async () => {
  const data = await init();

  return <HomePage init={data} />;
};

export default Home;
