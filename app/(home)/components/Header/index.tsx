import styles from './index.module.scss';
import VipPart from './components/VipPart';
import HeaderDetails from './components/HeaderDetails';
import HeaderTitle from './components/HeaderTitle';
import HeaderButtons from './components/HeaderButtons';

export const Header = () => {
  return (
    <div className={styles.header}>
      <VipPart />
      <HeaderDetails />
      <HeaderTitle />
      <HeaderButtons />
    </div>
  );
};
