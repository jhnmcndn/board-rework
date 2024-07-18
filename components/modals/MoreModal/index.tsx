import { useStore } from '@/components/providers/StoreProvider';
import { FC } from 'react';
import Morelist from './component/index';
import styles from './index.module.scss';

type MoreModalProps = {
  showMore: boolean;
  setOpenAnnounceModal: () => void;
  setSafeBoxModal: () => void;
  setShowMore: (value: boolean) => void;
};

export type MoreModal = FC<Readonly<MoreModalProps>>;
const MoreModal: MoreModal = ({ showMore, setOpenAnnounceModal, setSafeBoxModal, setShowMore }) => {
  const theme = useStore((state) => state.theme);

  return (
    <>
      {showMore && (
        <div className={styles.moreContainer}>
          <div className={styles.background} data-theme={theme}>
            <Morelist
              setOpenAnnounceModal={setOpenAnnounceModal}
              setShowMore={setShowMore}
              setSafeBoxModal={setSafeBoxModal}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MoreModal;
