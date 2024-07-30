'use client';

import Privilege from '@/app/personal-info/components/Privilege';
import styles from '@/app/personal-info/index.module.scss';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { usePersonalInfoStore } from '@/components/Providers/PersonalInfoStoreProvider';

const PersonalInfoTabContent = () => {
  const activeTab = usePersonalInfoStore((state) => state.activeTab);

  if (activeTab === 0) return <Privilege />;
};

const PersonalInfoContent = () => {
  const theme = useAccountStore((state) => state.theme);

  return (
    <div className={styles.content} data-theme={theme}>
      <PersonalInfoTabContent />
    </div>
  );
};

export default PersonalInfoContent;
