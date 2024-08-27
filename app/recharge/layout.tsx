import OtherHeader from '@/components/OtherHeader';
import styles from './index.module.scss';

const RechargeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ height: '100%' }}>
      <OtherHeader showPurse />
      <div className={styles.recharge}>
        <div className={styles.recharge__body}>{children}</div>
      </div>
    </div>
  );
};

export default RechargeLayout;
