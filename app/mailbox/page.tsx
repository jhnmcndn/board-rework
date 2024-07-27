import styles from '@/app/mailbox/index.module.scss';
import OtherHeader from '@/components/OtherHeader';
import MailListContainer from './MailListContainer';

const MailBox = () => {
  return (
    <div className={styles.container}>
      <OtherHeader headerTitle='邮箱' showPurse={false} />
      <div className={styles.contentWrapper}>
        <MailListContainer />
      </div>
    </div>
  );
};

export default MailBox;
