import ImgWithFallback from '@/components/ImgWithFallback';
import { useGameStore } from '@/components/Providers/GameStoreProvider';
import useImages from '@/hooks/useImages';
import { GameInfoGroup, RspGameInfo } from '@/types/app';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { FC, memo } from 'react';
import styling from './index.module.scss';

export type CombinedGameInfo = RspGameInfo & GameInfoGroup;

type TProps = {
  item: CombinedGameInfo;
  handleOnClick: (item: CombinedGameInfo) => void;
  isLargeIcon?: boolean;
  styles: { [key: string]: string };
  idx: number;
};

const MemoizedImgWithFallback = memo(ImgWithFallback);

const MemoizedIconHolder: FC<TProps> = memo(({ idx, item, handleOnClick, isLargeIcon = false, styles }) => {
  const { images } = useImages();
  const { activeSideBarItem } = useGameStore((state) => state);
  const delayDuration = isLargeIcon ? 0.1 : 0.02;

  return (
    <motion.div
      key={item.id}
      initial={{ x: '90vw' }}
      animate={{
        x: 0,
        transition: {
          x: {
            type: 'spring',
            duration: 0.8,
            bounce: 0.2,
            delay: 0.04 + idx * delayDuration,
          },
        },
      }}
      className={classNames(styles.iconHolder, {
        [styles.isMaintenance]: item.maintain,
        [styles['iconHolder--pointer']]: isLargeIcon,
      })}
      onClick={() => isLargeIcon && handleOnClick(item)}
    >
      {item.maintain && (
        <div className={styles.isMaintain}>
          <div>正在维修</div>
        </div>
      )}

      {!isLargeIcon && <div className={styling.clickArea} onClick={() => handleOnClick(item)} />}

      <MemoizedImgWithFallback
        src={(activeSideBarItem.type === 3 && isLargeIcon ? item.cardIcon : item.icon) || ''}
        fallback={images.fallback}
        loadingIcon={images.loading}
        alt={item.icon || item.cardIcon || ''}
      />
    </motion.div>
  );
});

MemoizedIconHolder.displayName = 'MemoizedImgWithFallback';

export default MemoizedIconHolder;
