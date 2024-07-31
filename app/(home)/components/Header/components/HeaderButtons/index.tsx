import useImages from '@/hooks/useImages';
import useModalStore from '@/store/modals';
import Image from 'next/image';
import styles from './index.module.scss';

const HeaderButtons = () => {
  const { images } = useImages();
  const { openLoginOptions } = useModalStore();

  return (
    <div className={styles.headerButtons}>
      <Image
        src={images.calendar_image}
        alt='Calendar'
        width={99}
        height={87}
        onClick={() => {
          // onClickSound('pop')
          openLoginOptions();
        }}
      />
      <Image
        src={images.promote_image}
        alt='Promote'
        width={110}
        height={110}
        // onClick={() => {
        //   handClick({});
        // }}
      />
      <Image
        src={images.task_image}
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
        <Image src={images.settings_icon} alt='Settings' width={55} height={55} />
        <span className={styles.settingText}>设置</span>
      </div>
    </div>
  );
};

export default HeaderButtons;
