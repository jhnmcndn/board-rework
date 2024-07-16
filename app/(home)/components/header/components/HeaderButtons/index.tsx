import calendarImage from '@/assets/blackGold/header/calendar.png';
import promoteImage from '@/assets/blackGold/header/promote.png';
import taskImage from '@/assets/blackGold/header/task.png';
import styles from './index.module.scss';
import { useStore } from '@/components/providers/StoreProvider';
import Image from 'next/image';
import useModalStore from '@/store/modals';

const HeaderButtons = () => {
  const { openLoginTypes, openAlert } = useModalStore();
  const theme = useStore((state) => state.theme);
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
          console.log('CLICKED')
          openLoginTypes();
          // openAlert({body: 'test'})
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
