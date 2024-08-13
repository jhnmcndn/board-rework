import ImgWithFallback from '@/components/ImgWithFallback';
import { useGameStore } from '@/components/Providers/GameStoreProvider';
import useImages from '@/hooks/useImages';
import { GameInfoGroup, RspGameInfo } from '@/types/app';
import classNames from 'classnames';
import { FC, memo } from 'react';
import styling from './index.module.scss';

export type CombinedGameInfo = RspGameInfo & GameInfoGroup;

type TProps = {
  item: CombinedGameInfo;
  handleOnClick: (item: CombinedGameInfo) => void;
  isLargeIcon?: boolean;
  styles: { [key: string]: string };
};

const MemoizedImgWithFallback = memo(ImgWithFallback);

const MemoizedIconHolder: FC<TProps> = memo(({ item, handleOnClick, isLargeIcon = false, styles }) => {
  const { images } = useImages();
  const { activeSideBarItem } = useGameStore((state) => state);

  return (
    <div
      key={item.id}
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
    </div>
  );
});

MemoizedIconHolder.displayName = 'MemoizedImgWithFallback';

export default MemoizedIconHolder;
