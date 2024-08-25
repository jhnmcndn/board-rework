import useAuthActions from '@/hooks/useAuthActions';
import { FC } from 'react';
import styles from './index.module.scss';

const ButtonContainer: FC = () => {
  const { logout } = useAuthActions();

  return (
    <div className={styles.buttonContainer}>
      <div className={styles.infoBtn}>
        <div className={styles.logoutBtn} onClick={logout}>
          账号切换
        </div>
      </div>
      <div className={styles.infoBtn}>
        <div
          className={styles.logoutBtn}
          onClick={() => {
            // lineSwitch()
          }}
        >
          切换线路
        </div>
      </div>
    </div>
  );
};

export default ButtonContainer;
