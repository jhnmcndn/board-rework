import NavTab from '@/components/NavTab';
import { WashCodeRate } from '@/types/app';
import { FC } from 'react';

type RateListProps = {
  list: Omit<WashCodeRate, 'washCodeDescList'>[];
  activeTab: number;
  onSetActive: (index: number) => void;
};

const RateList: FC<RateListProps> = ({ list, activeTab, onSetActive }) => {
  return <NavTab list={list} activeTab={activeTab} onSetActive={onSetActive} />;
};
export default RateList;
