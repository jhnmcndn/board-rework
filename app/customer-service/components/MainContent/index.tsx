'use client';

import Sidebar from '@/components/Sidebar';
import { CustomerService, Init, MessageCommonProblems } from '@/types/app';
import { FC, useState } from 'react';
import Chatbox from '../Chatbox';
import Faq from '../Faq';
import styles from './index.module.scss';

const MainContent: FC<
  Readonly<{
    init: Init;
    customerService: CustomerService[];
    messageCommonProblems: MessageCommonProblems[];
  }>
> = ({ init, customerService, messageCommonProblems }) => {
  const sidebarItems = customerService.length ? ['在线客服', 'POP客服', '常见问题'] : ['在线客服', '常见问题'];
  const [activeSidebarItem, setActiveSidebarItem] = useState(0);
  return (
    <main className={styles.container}>
      <Sidebar
        sidebarItems={sidebarItems}
        activeSidebarItem={activeSidebarItem}
        setActiveSidebarItem={setActiveSidebarItem}
      />
      <section className={styles.wrapper}>
        {activeSidebarItem === 0 && <Chatbox init={init} />}
        {activeSidebarItem === 1 && <Faq messageCommonProblems={messageCommonProblems} />}
      </section>
    </main>
  );
};

export default MainContent;
