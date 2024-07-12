import calendar from '@/assets/blackGold/header/h5Icon.png';
import promote from '@/assets/blackGold/header/promote.png';
import task from '@/assets/blackGold/header/task.png';
import { useAppStore } from '@/store/useAppStore';
import { onClickSound } from '@/utils/app';
import styles from './index.module.scss';

const HeaderButtons = () => {
  const theme = useAppStore((state) => state.theme);

  return (
    <div className={styles.headerButtons}>
      <img
        src={calendar}
        alt="calendar"
        onClick={() => {
          // handleClick({ fn: setimgs, params: true });
          onClickSound('pop');
        }}
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
        onClick={() => {
          onClickSound('pop');
          // dispatch(setShowOtherModalComp(true));
          // setIsSettings(false);
          // handleClick({ fn: setGTaskOpen, params: true });
        }}
        src={task}
        alt="task"
      />
      <div
        className={styles.settingContainer}
        onClick={() => {
          onClickSound('pop');
          // if (!isLoggedIn()) {
          //   dispatch(setShowLoginModal(true));
          // } else {
          //   setLoad(true);
          //   getAccountInfo().then((res) => {
          //     setLoad(false);
          //     if (res.data.code === 401) {
          //       auth?.logout();
          //       logoutUser();
          //       dispatch(resetUserInfoState());
          //       dispatch(setShowLoginModal(true));
          //     } else {
          //       setIsSettings(true);
          //       dispatch(setShowSettings(true));
          //     }
          //   });
          // }
        }}
      >
        <img src={`/src/assets/${theme}/header/setting.png`} alt="setting" />
        <span className={styles.settingText}>设置</span>
      </div>
    </div>
  );
};

export default HeaderButtons;
