import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useModalStore from '@/store/modals';
import React from 'react';
import styles from './index.module.scss';

const Content: React.FC = () => {
  const activityTypes = useAccountStore((state) => state.activityTypes);
  const openContentAnnouncement = useModalStore((state) => state.openContentAnnouncement);

  // console.log(
  //   activityTypes?.map((item) => item.id === openContentAnnouncement),
  //   'asdasd123123',
  // );
  return (
    <>
      <div className={styles.contentAnnoucement}>
        {openContentAnnouncement === activityTypes?.id &&
          activityTypes.map((item) =>
            item.activityList?.map((items, index) => (
              <ul key={index} className={styles.contentItem}>
                <iframe src={items?.url} title='Activity' />
              </ul>
            )),
          )}
      </div>
    </>
  );
};

export default Content;
