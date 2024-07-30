import PersonalInfoContent from '@/app/personal-info/components/PersonalInfoContent';
import PersonalInfoSidebar from '@/app/personal-info/components/PersonalInfoSidebar';
import styles from '@/app/personal-info/index.module.scss';
import OtherHeader from '@/components/OtherHeader';
import { Fragment } from 'react';

const PersonalInfo = () => {
  return (
    <Fragment>
      <OtherHeader headerTitle='个人中心' />
      <main className={styles.container}>
        <PersonalInfoSidebar />
        <section className={styles.wrapper}>
          <PersonalInfoContent />
        </section>
      </main>
    </Fragment>
  );
};

export default PersonalInfo;
