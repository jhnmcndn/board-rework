import { customerService } from '@/api/platform';
import styles from '@/app/customer-service/index.module.scss';
import OtherHeader from '@/components/OtherHeader';
import Sidebar from '@/components/Sidebar';
import MainContent from './components/MainContent';

const CustomerService = async () => {
  const csData = await customerService();
  const isCSDataEmpty = !csData || 'message' in csData || csData.length < 1;

  const setSidebarItems = () => {
    if (isCSDataEmpty) return ['在线客服', '常见问题'];
    return ['在线客服', 'POP客服', '常见问题'];
  };

  return (
    <main className={styles.cs}>
      <OtherHeader headerTitle='客户服务' />
      <div className={styles.wrapper}>
        <Sidebar sidebarItems={setSidebarItems()} />
        <MainContent hasCSData={!isCSDataEmpty} csData={csData} />
      </div>
    </main>
  );
};

export default CustomerService;
