import { getGameTypes } from '@/api/gameApp';
import Header from '@/components/Header';
import { useThemeStore } from '@/store/theme';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
  const { data } = useQuery({
    queryKey: ['gameTypes'],
    queryFn: getGameTypes,
  });
  const theme = useThemeStore((state) => state.theme);

  // To be deleted!
  console.log(data?.rspGameTypes);
  return (
    <div className={'main-color'} data-theme={theme}>
      <Header />
      {/* <Main /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
