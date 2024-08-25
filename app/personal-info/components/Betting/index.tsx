'use client';

import { getGameDataList } from '@/api/game';
import Dropdown from '@/components/Dropdown';
import NavTab from '@/components/NavTab';
import { usePersonalInfoStore } from '@/components/Providers/PersonalInfoStoreProvider';
import Table from '@/components/Table';
import { GameCategoryList } from '@/types/app';
import { FC, useEffect, useState } from 'react';
import styles from './index.module.scss';

const Betting: FC<
  Readonly<{
    gameCategoryList: GameCategoryList[];
  }>
> = ({ gameCategoryList }) => {
  const [gameDataList, setGameDataList] = useState([]);
  const setBettingActiveTab = usePersonalInfoStore((s) => s.setBettingActiveTab);
  const setBettingFilter = usePersonalInfoStore((s) => s.setBettingFilter);
  const activeTab = usePersonalInfoStore((s) => s.betting.activeTab) ?? 0;
  const filter = usePersonalInfoStore((s) => s.betting.filter);
  const filterOptions = ['今天', '昨天', '一个月'];
  const filterDefaultValue = filter === 'today' ? '今天' : filter === 'yesterday' ? '昨天' : '一个月';
  const headers = ['派彩时间', '游戏-注单号', '投注金额', '盈利金额'];

  const modifiedGameCategoryList = gameCategoryList.map((category, index) => ({
    ...category,
    name: category.des,
    des: category.name,
    id: index,
  }));

  useEffect(() => {
    const fetchInitialGameList = async () => {
      const gameDataList = await getGameDataList({
        gameCategory: modifiedGameCategoryList[activeTab].name,
        enumReqTime: filter,
      });
      setGameDataList(gameDataList);
    };
    fetchInitialGameList();
  }, []);

  const handleOnclickTab = async (index: number, data?: GameCategoryList) => {
    setBettingActiveTab(index);
    if (data) {
      const gameDataList = await getGameDataList({ gameCategory: data.name, enumReqTime: filter });
      setGameDataList(gameDataList);
    }
  };

  return (
    <div className={styles.container}>
      <NavTab list={modifiedGameCategoryList} onSetActive={handleOnclickTab} activeTab={activeTab} />
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
