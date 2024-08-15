'use client';

import { getGameDataList } from '@/api/game';
import Dropdown from '@/components/Dropdown';
import { usePersonalInfoStore } from '@/components/Providers/PersonalInfoStoreProvider';
import Table from '@/components/Table';
import { GameCategoryList } from '@/types/app';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { FC, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';

const Betting: FC<
  Readonly<{
    gameCategoryList: GameCategoryList[];
  }>
> = ({ gameCategoryList }) => {
  const scrollWrapperRef = useRef<HTMLUListElement>(null);
  const [constraint, setConstraint] = useState({ left: 0, right: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [gameDataList, setGameDataList] = useState([]);
  const setBettingActiveTab = usePersonalInfoStore((s) => s.setBettingActiveTab);
  const setBettingFilter = usePersonalInfoStore((s) => s.setBettingFilter);
  const activeTab = usePersonalInfoStore((s) => s.betting.activeTab);
  const filter = usePersonalInfoStore((s) => s.betting.filter);
  const filterOptions = ['今天', '昨天', '一个月'];
  const filterDefaultValue = filter === 'today' ? '今天' : filter === 'yesterday' ? '昨天' : '一个月';
  const headers = ['派彩时间', '游戏-注单号', '投注金额', '盈利金额'];
  useEffect(() => {
    const scroll = () => {
      if (!scrollWrapperRef.current) return;
      const scrollWidth = scrollWrapperRef.current.scrollWidth;
      const clientWidth = scrollWrapperRef.current.clientWidth;
      setConstraint((prev) => ({ ...prev, left: -(scrollWidth - clientWidth) }));
    };
    const fetchInitialGameList = async () => {
      const gameDataList = await getGameDataList({
        gameCategory: gameCategoryList[activeTab].name,
        enumReqTime: filter,
      });
      setGameDataList(gameDataList);
    };
    scroll();
    fetchInitialGameList();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        <motion.ul
          className={styles.scrollWrapper}
          drag='x'
          dragConstraints={constraint}
          ref={scrollWrapperRef}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
        >
          {gameCategoryList.map((category, index) => (
            <li
              className={classNames(styles.list, {
                [styles.active]: activeTab === index,
              })}
              key={index}
              onClick={async () => {
                if (activeTab === index || isDragging) return;
                setBettingActiveTab(index);
                const gameDataList = await getGameDataList({ gameCategory: category.name, enumReqTime: filter });
                setGameDataList(gameDataList);
              }}
            >
              {category.des}
            </li>
          ))}
        </motion.ul>
      </div>
      <div className={styles.filterContainer}>
        <span>交易时间</span>
        <Dropdown defaultValue={filterDefaultValue} options={filterOptions} onSelect={setBettingFilter} />
      </div>
      <Table
        withHeader={{ headers }}
        content={gameDataList}
        withPullToRefresh={{
          isPullable: true,
          onRefresh: async () =>
            await getGameDataList({ gameCategory: gameCategoryList[activeTab].name, enumReqTime: filter }),
        }}
      />
    </div>
  );
};

export default Betting;
