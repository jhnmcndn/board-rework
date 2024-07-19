import calendarImage from '@/assets/blackGold/header/calendar.png';
import promoteImage from '@/assets/blackGold/header/promote.png';
import taskImage from '@/assets/blackGold/header/task.png';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useModalStore from '@/store/modals';
import Image from 'next/image';
import styles from './index.module.scss';

const HeaderButtons = () => {
  const { openLoginTypes } = useModalStore();
  const theme = useAccountStore((state) => state.theme);
  const settingImage = require(`@/assets/${theme}/header/setting.png`);

  return (
    <div className={styles.headerButtons}>
      <Image
        src={calendarImage}
        alt='Calendar'
        width={99}
        height={87}
        onClick={() => {
          // onClickSound('pop')
          openLoginTypes();
        }}
      />
      <Image
        src={promoteImage}
        alt='Promote'
        width={110}
        height={110}
        // onClick={() => {
        //   handClick({});
        // }}
      />
      <Image
        src={taskImage}
        alt='Task'
        width={110}
        height={110}
        onClick={() => {
          // onClickSound('pop')
        }}
      />
      <div
        className={styles.settingContainer}
        onClick={() => {
          //   onClickSound('pop');
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
        {/* <img src={`/src/assets/${theme}/header/setting.png`} alt='setting' /> */}
        <Image src={settingImage} alt='Settings' width={55} height={55} />
        <span className={styles.settingText}>设置</span>
      </div>
    </div>
  );
};

export default HeaderButtons;
