import MainContentList from './components/MainContentList';
import SideBar from './components/SideBar';
import styles from './index.module.scss';

const Main = () => {
  return (
    <main className={styles.mainWrapper}>
      <SideBar />
      <MainContentList />
    </main>
  );
};

export default Main;
