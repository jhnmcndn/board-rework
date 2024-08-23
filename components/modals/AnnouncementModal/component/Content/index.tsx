import { getActivityInfos } from '@/api/platform';
import useModalStore from '@/store/modals';
import { ActivityListState } from '@/types/app';
import React, { useEffect, useState } from 'react';
import ImageAccordion from './ImageAccordion'; // Corrected the import name
import styles from './index.module.scss';

const Content: React.FC = () => {
  const openContentAnnouncement = useModalStore((state) => state.openContentAnnouncement);
  const [activityList, setActivityList] = useState<ActivityListState | null>(null);
  const [switchTab, setSwitchTab] = useState<boolean>(false);

  const handleSwitch = () => {
    setSwitchTab((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getActivityInfos(openContentAnnouncement);
      const result = { id: openContentAnnouncement, list: data };
      setActivityList(result);
    };
    fetchData();
  }, [openContentAnnouncement]);

  return (
    <div className={styles.contentAnnoucement}>
      {openContentAnnouncement === activityList?.id && (
        <ul>
          {activityList?.list.map((item, index) => (
            <li key={index}>
              <ImageAccordion
                switched={switchTab}
                handleSwitch={handleSwitch}
                icon={item.icon ?? ''}
                content={item.content ?? ''}
                url={item.url}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Content;
