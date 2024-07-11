import { useInit } from '@/actions/';
import Header from '@/components/Header';
import { useAppStore } from '@/store/useAppStore';
import { useEffect } from 'react';

const Home = () => {
  const { theme, setInit } = useAppStore();
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
