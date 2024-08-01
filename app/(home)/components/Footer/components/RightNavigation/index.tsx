import useAuthCheck from '@/hooks/useAuthCheck';
import rechargeSvga from '@/public/assets/svgas/recharge.svga';
import withdrawSvga from '@/public/assets/svgas/withdraw.svga';
import { onClickSound } from '@/utils/audioFile';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { isIOS } from 'react-device-detect';
import styles from './index.module.scss';

const CSVGA = dynamic(() => import('@/app/(home)/components/Footer/components/CSVGA/'), { ssr: false });

const RightNavigation: React.FC = () => {
  const { push } = useRouter();
  const { authCheck } = useAuthCheck();

  const redirectToRecharge = () => {
    if (isIOS) onClickSound('recharge');
    authCheck(() => push('/recharge'));
  };

  return (
    <div className={styles.rightNavigation}>
      <div className={styles.withdraw} onClick={() => authCheck(() => push('/withdraw'))}>
        <CSVGA src={withdrawSvga} className={styles.greenBtn} />
      </div>
      <div className={styles.other} onClick={redirectToRecharge}>
        <CSVGA src={rechargeSvga} className={styles.yellowBtn} />
      </div>
    </div>
  );
};

export default RightNavigation;
