import { init } from '@/api/platformApp';
import Header from '@/components/Header';
import { useInitStore } from '@/store/init';
import { useThemeStore } from '@/store/theme';
import { API_ENDPOINT } from '@/types/enums';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const Home = () => {
  const theme = useThemeStore((state) => state.theme);
  const setInit = useInitStore((state) => state.setInit);

  // API calls
  const { data: initData } = useQuery({
    queryKey: [API_ENDPOINT.INIT],
    queryFn: init,
  });

  useEffect(() => {
    if (initData) {
      setInit(initData);
    }
  }, [initData]);

  return (
    <div className={'main-color'} data-theme={theme}>
      <Header />
      {/* <Main /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
