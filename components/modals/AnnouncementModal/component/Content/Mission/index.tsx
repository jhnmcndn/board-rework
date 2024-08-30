import { getActivityQuestInfos } from '@/api/platform';
import Button from '@/components/Fragments/Button';
import useImages from '@/hooks/useImages';
import useModalStore from '@/store/modals';
import { ActivityQuestList } from '@/types/app';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import styles from './index.module.scss';

const Mission: FC = () => {
  const { openContentAnnouncement, openAlert } = useModalStore();
  const { images } = useImages();
  const [questInfos, setQuestInfos] = useState<ActivityQuestList[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getActivityQuestInfos(openContentAnnouncement);
      setQuestInfos(data);
    };
    fetchData();
  }, [openContentAnnouncement]);

  const handleClaimReward = (item: number) => {
    // openAlert();
  };

  return (
    <>
      <div className={styles.missionContainer}>
        {questInfos?.map((item, index) => (
          <div className={styles.item} key={index}>
            <section className={styles.container}>
              <Image src={item.icon} className={styles.icon} alt={'accordion'} height={40} width={40} />

              <div className={styles.details}>
                <div className={styles.titleContainer}>
                  <span>{item.title}</span>
                  <Image src={images.helpIcon} alt={'Help Icon'} height={13} width={13} />
                </div>

                <div className={styles.contentContainer}>
                  <span className={styles.contents}>{item.content}</span>
                </div>

                <div className={styles.taskBarContainer}>
                  <div className={styles.progressBar}>
                    {item.status}/{item.target}
                  </div>
                  <div className={styles.taskbar} style={{ width: (item.status / item.target) * 100 + '%' }} />
                </div>
              </div>

              <div className={styles.rewards}>
                <span>{`+${item.reward}.00`}</span>
                <span>现金</span>
              </div>

              <div className={styles.claimBtn}>
                {item?.status === 1 ? (
                  <Button className={styles.button} text='去完成' onClick={() => handleClaimReward(item?.id)} />
                ) : (
                  '12'
                )}
              </div>
            </section>
            {/* <section></section> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default Mission;
