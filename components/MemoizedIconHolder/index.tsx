import ImgWithFallback from '@/components/ImgWithFallback';
import { useGameStore } from '@/components/Providers/GameStoreProvider';
import useImages from '@/hooks/useImages';
import { GameInfoGroup, RspGameInfo } from '@/types/app';
import classNames from 'classnames';
import { FC, memo } from 'react';

export type CombinedGameInfo = RspGameInfo & GameInfoGroup;

type TProps = {
  item: CombinedGameInfo;
  handleOnClick: (item: CombinedGameInfo) => void;
  styles: { [key: string]: string };
};

const MemoizedImgWithFallback = memo(ImgWithFallback);

const MemoizedIconHolder: FC<TProps> = memo(({ item, handleOnClick, styles }) => {
  const { images } = useImages();
  const { activeSideBarItem } = useGameStore((state) => state);

  return (
    <div
      key={item.id}
      className={classNames(styles.iconHolder, {
        [styles.isMaintenance]: item.maintain,
      })}
      onClick={() => handleOnClick(item)}
    >
      {item.maintain && (
        <div className={styles.isMaintain}>
          <div>正在维修</div>
        </div>
      )}

      <MemoizedImgWithFallback
        src={(activeSideBarItem.type === 3 ? item.cardIcon : item.icon) || ''}
        fallback={images.fallback}
        loadingIcon={images.loading}
        alt={item.icon || item.cardIcon || ''}
      />
    </div>
  );
});

MemoizedIconHolder.displayName = 'MemoizedImgWithFallback';

export default MemoizedIconHolder;
