import { getActivityQuestInfos } from '@/api/platform';
import useImages from '@/hooks/useImages';
import useModalStore from '@/store/modals';
import { ActivityQuestList } from '@/types/app';
import { FC, useEffect, useState } from 'react';
import styles from './index.module.scss';

const Mission: FC = () => {
  const { openContentAnnouncement } = useModalStore();
  const { images } = useImages();
  const [questInfos, setQuestInfos] = useState<ActivityQuestList[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getActivityQuestInfos(openContentAnnouncement);
      setQuestInfos(data);
    };
    fetchData();
  }, [openContentAnnouncement]);

  return (
    <>
      <div className={styles.missionContainer}>
        <ul style={{ border: '1px solid red' }}>{questInfos?.map((item, index) => <li key={index}></li>)}</ul>
      </div>
    </>
  );
};

export default Mission;
