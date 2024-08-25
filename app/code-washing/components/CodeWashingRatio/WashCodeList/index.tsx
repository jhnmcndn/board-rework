import Table from '@/components/Table';
import { WashCodeRate } from '@/types/app';
import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './index.module.scss';

type WashCodeListProps = {
  list: WashCodeRate[];
};

const WashCodeList: FC<WashCodeListProps> = ({ list }) => {
  console.log(list);
  return (
    <Swiper spaceBetween={10} slidesPerView={1} className={styles.wrapper}>
      {list.map((item) => (
        <SwiperSlide key={item.id}>
          <WashTable washCodeDescList={item.washCodeDescList} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const WashTable: FC<Pick<WashCodeRate, 'washCodeDescList'>> = ({ washCodeDescList }) => {
  const headers = ['时间', '游戏分类', '打码量'];
  return <Table withHeader={{ headers }} content={washCodeDescList} />;
};

export default WashCodeList;
