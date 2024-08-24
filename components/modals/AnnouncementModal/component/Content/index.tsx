import { getActivityInfos } from '@/api/platform';
import useModalStore from '@/store/modals';
import { ActivityListState } from '@/types/app';
import { FC, useEffect, useState } from 'react';
import ImageAccordion from './ImageAccordion';
import styles from './index.module.scss';

const Content: FC = () => {
  const { openSidebarAnnouncement, openContentAnnouncement } = useModalStore();
  const [activityList, setActivityList] = useState<ActivityListState | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getActivityInfos(openContentAnnouncement);
      const result = { id: openContentAnnouncement, list: data };
      setActivityList(result);
    };
    fetchData();
  }, [openContentAnnouncement]);

  console.log();
  return (
    <div className={styles.contentAnnoucement}>
      {openSidebarAnnouncement === 0 && openContentAnnouncement === activityList?.id && (
        <ul>
          {activityList?.list.map((item, index) => (
            <li key={index}>
              <ImageAccordion icon={item?.icon as string} content={item?.content as string} url={item.url} />
            </li>
          ))}
        </ul>
      )}
      {/* {openSidebarAnnouncement === 1 && openContentAnnouncement === activityList?.id && (
        <ul>
          {activityList?.list.map((item, index) => (
            <li key={index}>
              <ImageAccordion icon={item?.icon as string} content={item?.content as string} url={item.url} />
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default Content;
