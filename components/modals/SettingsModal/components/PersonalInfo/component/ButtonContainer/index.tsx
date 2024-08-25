import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import useModalStore from '@/store/modals';
import styles from './index.module.scss';

const ButtonContainer: React.FC = () => {
  const empty = {
    token: undefined,
    id: undefined,
    nickName: undefined,
    vip: 1,
    headImg: undefined,
    accountNow: undefined,
    accountCharge: undefined,
    codeNow: undefined,
    codeWill: undefined,
    codeTotal: 0,
    nextLevelIntegral: 0,
    status: undefined,
    inviterCode: undefined,
    registerType: undefined,
    phone: undefined,
    newAccount: undefined,
  };
  const { setAccountInfo } = useAccountStore((state) => state);
  const { openLoginOptions, closeSettings } = useModalStore();
  return (
    <div className={styles.buttonContainer}>
      <div className={styles.infoBtn}>
        <div
          className={styles.logoutBtn}
          onClick={() => {
            // handleLogoutButton()
            openLoginOptions();
            closeSettings();
            setAccountInfo(empty);
          }}
        >
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
