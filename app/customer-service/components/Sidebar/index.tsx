'use client';

import { useCSStore } from '@/components/Providers/CSStoreProvider';
import Sidebar from '@/components/Sidebar';

const CSSidebar = () => {
  const { csData } = useCSStore((state) => state);
  return <Sidebar sidebarItems={csData.length ? ['在线客服', 'POP客服', '常见问题'] : ['在线客服', '常见问题']} />;
};

export default CSSidebar;
