import useAuthActions from '@/hooks/useAuthActions';
import rechargeSvga from '@/public/assets/svgas/recharge.svga';
import withdrawSvga from '@/public/assets/svgas/withdraw.svga';
import { sfx } from '@/utils/audioFile';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import styles from './index.module.scss';

const CSVGA = dynamic(() => import('@/app/(home)/components/Footer/components/CSVGA/'), { ssr: false });

const RightNavigation: FC = () => {
  const { push } = useRouter();
  const { authCheck } = useAuthActions();

  return (
    <div className={styles.rightNavigation}>
      <div className={styles.withdraw} onClick={() => authCheck(() => push('/withdraw'))}>
        <CSVGA src={withdrawSvga} className={styles.greenBtn} />
      </div>
      <div data-click={sfx.popAudio} className={styles.other} onClick={() => authCheck(() => push('/recharge'))}>
        <CSVGA src={rechargeSvga} className={styles.yellowBtn} />
      </div>
    </div>
  );
};

export default RightNavigation;
