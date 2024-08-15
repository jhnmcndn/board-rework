import Table from '@/components/Table';
import styles from './index.module.scss';

const ClaimRecord = () => {
  return (
    <div className={styles.claimRecord}>
      <Table withHeader headers={['时间', '金额 ']} content={[]} />
    </div>
  );
};

export default ClaimRecord;
