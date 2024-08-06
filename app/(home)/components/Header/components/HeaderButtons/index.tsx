import SettingsModal from '@/components/modals/SettingsModal';
import useAuthCheck from '@/hooks/useAuthCheck';
import useImages from '@/hooks/useImages';
import useModalStore from '@/store/modals';
import { onClickSound } from '@/utils/audioFile';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './index.module.scss';

const HeaderButtons = () => {
  const { push } = useRouter();
  const { images } = useImages();
  const { authCheck } = useAuthCheck();
  const { openSettings } = useModalStore();
  const [isSettings, setIsSetttings] = useState(false);

  return (
    <>
      {isSettings && (
        <SettingsModal

        // activesideTab={4}
        // activeSection={'personalInfo'}
        />
      )}

      <div className={styles.headerButtons}>
        <Image
          src={images.calendar}
          alt='Calendar'
          width={99}
          height={87}
          onClick={() => authCheck(() => console.log('// TODO OPEN CALENDAR MODAL'))}
        />
        <Image
          src={images.promote}
          alt='Promote'
          width={110}
          height={110}
          onClick={() => authCheck(() => push('/promotion-agent'))}
        />
        <Image
          src={images.task}
          alt='Task'
          width={110}
          height={110}
          onClick={() => authCheck(() => console.log('// TODO OPEN TASKS MODAL'))}
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
            authCheck(() => {
              setIsSetttings(true);
              openSettings();
            });
          }}
        >
          {/* <img src={`/src/assets/${theme}/header/setting.png`} alt='setting' /> */}
          <Image src={images.settings} alt='Settings' width={55} height={55} />
          <span className={styles.settingText}>设置</span>
        </div>
      </div>
    </>
  );
};

export default HeaderButtons;
