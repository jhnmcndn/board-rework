import { useThemeStore } from '@/store/theme';
import styles from './index.module.scss';
import calendar from '/src/assets/blackGold/header/h5_icon.png';
import promote from '/src/assets/blackGold/header/promote.png';
import task from '/src/assets/blackGold/header/task.png';

const HeaderButtons = () => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <div className={styles.headerButtons}>
      <img
        src={calendar}
        alt="calendar"
        // onClick={() => {
        //   handleClick({ fn: setimgs, params: true });
        //   popSound();
        // }}
      />

      <img
        src={promote}
        alt="promote"
        // onClick={() => {
        //   handleClick({ fn: gotoPromotion });
        //   start2();
        // }}
      />
      <img
        // onClick={() => {
        //   popSound();
        //   dispatch(setShowOtherModalComp(true));
        //   setIsSettings(false);
        //   handleClick({ fn: setGTaskOpen, params: true });
        // }}
        src={task}
        alt="task"
      />
      <div
        className={styles.settingContainer}
        // onClick={() => {
        //   popSound();
        //   if (!isLoggedIn()) {
        //     dispatch(setShowLoginModal(true));
        //   } else {
        //     setLoad(true);
        //     getAccountInfo().then((res) => {
        //       setLoad(false);
        //       if (res.data.code === 401) {
        //         auth?.logout();
        //         logoutUser();
        //         dispatch(resetUserInfoState());
        //         dispatch(setShowLoginModal(true));
        //       } else {
        //         setIsSettings(true);
        //         dispatch(setShowSettings(true));
        //       }
        //     });
        //   }
        // }}
      >
        <img src={`/src/assets/${theme}/header/setting.png`} alt="setting" />
        <span className={styles.settingText}>设置</span>
      </div>
    </div>
  );
};

export default HeaderButtons;
