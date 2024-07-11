import { getInit } from '@/api/platformApp';
import { initialInitState, useInitStore } from '@/store/init';
import { useQuery } from '@tanstack/react-query';
import HeaderButtons from './HeaderButtons';
import HeaderDetails from './HeaderDetails';
import HeaderTitle from './HeaderTitle';
import styles from './index.module.scss';
import VipPart from './VipPart';

const Header = () => {
  const { data: initData } = useQuery({
    queryKey: ['init'],
    queryFn: getInit,
    initialData: initialInitState,
  });

  const setInit = useInitStore((state) => state.setInit);
  setInit(initData);

  return (
    <div className={styles.header}>
      <VipPart />
      <HeaderDetails />
      <HeaderTitle />
      <HeaderButtons />
    </div>
  );
};

export default Header;
