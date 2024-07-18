import rechargeSvga from '@/public/assets/svgas/recharge.svga';
import withdrawSvga from '@/public/assets/svgas/withdraw.svga';
import dynamic from 'next/dynamic';
import { HandleClickParams } from '../..';
import styles from './index.module.scss';

const CSVGA = dynamic(() => import('@/app/(home)/components/Footer/components/CSVGA/'), { ssr: false });

type RightNavigationProps = {
  handleClick: ({ fn, params, isActivity }: HandleClickParams) => void;
  handleNavigation: (path: string, soundKey?: string) => void;
  gotoWithdraw?: () => void;
};

const RightNavigation: React.FC<RightNavigationProps> = ({ handleClick, handleNavigation, gotoWithdraw }) => {
  return (
    <div className={styles.rightNavigation}>
      <div className={styles.withdraw} onClick={() => handleClick({ fn: gotoWithdraw })}>
        <CSVGA src={withdrawSvga} className={styles.greenBtn} />
      </div>
      <div className={styles.other} onClick={() => handleNavigation('/recharge', 'recharge')}>
        <CSVGA src={rechargeSvga} className={styles.yellowBtn} />
      </div>
    </div>
  );
};

export default RightNavigation;
