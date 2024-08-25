import Table from '@/components/Table';
import { WashCodeRate } from '@/types/app';
import { FC, useEffect, useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import styles from './index.module.scss';

type WashCodeListProps = {
  list: WashCodeRate[];
  activeTab: number;
  onSetActive: (index: number) => void;
  onRefresh: () => Promise<void>;
};
const WashCodeList: FC<WashCodeListProps> = ({ list, activeTab = 0, onRefresh, onSetActive }) => {
  const swiperRef = useRef<SwiperRef>(null);

  useEffect(() => {
    swiperRef.current?.swiper.slideTo(activeTab);
  }, [activeTab]);

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      className={styles.wrapper}
      ref={swiperRef}
      onActiveIndexChange={({ activeIndex }) => onSetActive(activeIndex)}
    >
      {list.map((item) => (
        <SwiperSlide key={item.id}>
          <WashTable washCodeDescList={item.washCodeDescList} onRefresh={onRefresh} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

type WashTableProps = Pick<WashCodeRate, 'washCodeDescList'> & Pick<WashCodeListProps, 'onRefresh'>;
const WashTable: FC<WashTableProps> = ({ washCodeDescList, onRefresh }) => {
  const headers = ['时间', '游戏分类', '打码量'];
  return (
    <Table
      withHeader={{ headers }}
      content={washCodeDescList || []}
      withPullToRefresh={{
        isPullable: true,
        onRefresh: onRefresh,
      }}
    />
  );
};

export default WashCodeList;
