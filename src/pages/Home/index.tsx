import { useInit } from '@/actions/useInit';
import Header from '@/components/Header';
import { useInitStore } from '@/store/init';
import { useThemeStore } from '@/store/theme';
import { useEffect } from 'react';

const Home = () => {
  const theme = useThemeStore((state) => state.theme);
  const setInit = useInitStore((state) => state.setInit);
  const { data: initData } = useInit();

  useEffect(() => {
    setInit(initData);
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
