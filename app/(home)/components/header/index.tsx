import styles from './index.module.scss';
import { VipPart } from './components/VipPart';
import HeaderDetails from './components/HeaderDetails';

export const Header = () => {
  return (
    <div className={styles.header}>
      <VipPart />
      <HeaderDetails />
      {/* <HeaderTitle />
      <HeaderButtons /> */}
    </div>
  );
};
