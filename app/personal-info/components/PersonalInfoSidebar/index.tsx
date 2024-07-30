'use client';

import { usePersonalInfoStore } from '@/components/Providers/PersonalInfoStoreProvider';
import Sidebar from '@/components/Sidebar';

const PersonalInfoSidebar = () => {
  const personalInfoTabs = ['VIP特权', 'VIP详情', '投注记录', '安全中心', '账户明细', '游戏余额'];
  const setActiveTab = usePersonalInfoStore((state) => state.setActiveTab);

  return <Sidebar sidebarItems={personalInfoTabs} dispatch={setActiveTab} />;
};

export default PersonalInfoSidebar;
