import { useInit } from '@/actions/';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Main from '@/components/Main';
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
      <Main />
      <Footer />
    </div>
  );
};

export default Home;
