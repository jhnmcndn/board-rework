import HeaderButtons from './HeaderButtons';
import HeaderDetails from './HeaderDetails';
import HeaderTitle from './HeaderTitle';
import styles from './index.module.scss';
import VipPart from './VipPart';

const Header = () => {
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
