import useAuthCheck from '@/hooks/useAuthCheck';
import useImages from '@/hooks/useImages';
import useModalStore from '@/store/modals';
import { onClickSound } from '@/utils/audioFile';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';

const HeaderButtons = () => {
  const { push } = useRouter();
  const { images } = useImages();
  const { authCheck } = useAuthCheck();
  const { openSettings } = useModalStore();

  const handleSetting = () => {
    onClickSound('pop');
    authCheck(() => {
      openSettings();
    });
  };
  return (
    <>
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
        <div className={styles.settingContainer} onClick={handleSetting}>
          <Image src={images.settings} alt='Settings' width={55} height={55} />
          <span className={styles.settingText}>设置</span>
        </div>
      </div>
    </>
  );
};

export default HeaderButtons;
