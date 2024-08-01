import styles from '@/app/customer-service/index.module.scss';
import OtherHeader from '@/components/OtherHeader';
import MainContent from './components/MainContent';
import CSSidebar from './components/Sidebar';

const CustomerService = () => {
  return (
    <main className={styles.cs}>
      <OtherHeader headerTitle='客户服务' />
      <div className={styles.wrapper}>
        <CSSidebar />
        <MainContent />
      </div>
    </main>
  );
};

export default CustomerService;
