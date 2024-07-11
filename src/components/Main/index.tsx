import SideBar from './components/SideBar';
import styles from './index.module.scss';

const Main = () => {
  return (
    <main className={styles.mainWrapper}>
      <SideBar />
    </main>
  );
};

export default Main;
