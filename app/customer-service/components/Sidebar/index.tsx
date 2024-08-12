'use client';

import { useCSStore } from '@/components/Providers/CSStoreProvider';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';

const CSSidebar = () => {
  const { csData } = useCSStore((state) => state);
  const [activeSidebarItem, setActiveSidebarItem] = useState(0);
  const sidebarItems = csData.length ? ['在线客服', 'POP客服', '常见问题'] : ['在线客服', '常见问题'];
  return (
    <Sidebar
      sidebarItems={sidebarItems}
      activeSidebarItem={activeSidebarItem}
      setActiveSidebarItem={setActiveSidebarItem}
    />
  );
};

export default CSSidebar;
