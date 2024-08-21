import SearchField from '@/app/(home)/components/Main/components/SearchField';
import Table from '@/components/Table';
import { useState } from 'react';
import styles from './index.module.scss';

const PerformanceInquiry = () => {
  const [searchFieldData, setSearchFieldData] = useState('');
  return (
    <div className={styles.performanceInquiry}>
      <div className={styles.performanceInquiry__topContent}>
        <div className={styles.performanceInquiry__searchContainer}>
          <div className={styles.performanceInquiry__searchWrapper}>
            <SearchField
              searchFieldData={searchFieldData}
              setSearchFieldData={setSearchFieldData}
              placeholder='输入会员ID查看下级信息'
            />
          </div>
          <button>搜索 </button>
        </div>
      </div>
      <Table withHeader={{ headers: ['ID', '时间', '领取金额', '推广级别'] }} content={[]} />
    </div>
  );
};

export default PerformanceInquiry;
