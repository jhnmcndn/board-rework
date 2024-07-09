import { getGameTypes } from '@/api/gameApp';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
  const { data } = useQuery({
    queryKey: ['gameTypes'],
    queryFn: getGameTypes,
  });

  // To be deleted!
  console.log(data?.rspGameTypes);
  return JSON.stringify(data?.rspGameTypes);
};

export default Home;
