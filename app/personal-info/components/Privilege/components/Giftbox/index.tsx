import styles from '@/app/personal-info/components/Privilege/components/Giftbox/index.module.scss';
import { determineColor } from '@/app/personal-info/utils/determineColor';
import classNames from 'classnames';
import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';

export type GiftboxComponent = FC<
  Readonly<{
    giftboxColor: 'blue' | 'orange' | 'pink';
    img: StaticImageData;
    title: string;
    yenCount: string;
    info: string;
  }>
>;

const Giftbox: GiftboxComponent = ({ giftboxColor, img, title, yenCount, info }) => {
  const isActive = info === '未领取';

  return (
    <div className={styles.giftboxWrapper}>
      <div className={styles.header} style={{ background: determineColor(giftboxColor) }}>
        <Image src={img} alt='Giftbox' />
        <span className={styles.headerTitle}>{title}</span>
      </div>
      <div className={styles.body} style={{ background: determineColor(giftboxColor) }}>
        <div className={styles.yenCount}>{yenCount}</div>
        <div
          className={classNames(styles.receiveBtn, {
            [styles.active]: isActive,
          })}
        >
          {info}
        </div>
      </div>
    </div>
  );
};

export default Giftbox;
