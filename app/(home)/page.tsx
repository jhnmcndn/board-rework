import { init } from '@/api/init';
import { HomePage } from '@/app/(home)/components/';

const Home = async () => {
  const data = await init();
  console.log(data);

  return <HomePage />;
};

export default Home;
