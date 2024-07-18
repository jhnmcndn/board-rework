import { customerService } from '@/api/platform';
import styles from '@/app/customer-service/index.module.scss';
import OtherHeader from '@/components/OtherHeader';
import Sidebar from '@/components/Sidebar';
import MainContent from './components/MainContent';

const CustomerService = async () => {
  const customerServiceData = await customerService();

  const getSidebarItems = () => {
    if (!customerServiceData) return ['在线客服', '常见问题'];
    if ('message' in customerServiceData) return ['在线客服', '常见问题'];
    if (customerServiceData.length < 1) return ['在线客服', '常见问题'];
    return ['在线客服', 'POP客服', '常见问题'];
  };

  return (
    <main className={styles.cs}>
      <OtherHeader headerTitle='客户服务' />

      <div className={styles.wrapper}>
        <Sidebar sidebarItems={getSidebarItems()} />
        <MainContent customerServiceData={customerServiceData} />
      </div>
    </main>
  );
};

export default CustomerService;
