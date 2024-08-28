import useImages from '@/hooks/useImages';
import { sfx } from '@/utils/audioFile';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import styles from './index.module.scss';

const BackButton = () => {
  const { back } = useRouter();
  const {
    images: { backBtn },
  } = useImages();

  return (
    <div className={styles.backBtnContainer} data-click={sfx.popAudio} onClick={() => back()}>
      <Image src={backBtn} alt='Back' width={72} height={69} className={styles.backBtn} />
    </div>
  );
};
export default memo(BackButton);
