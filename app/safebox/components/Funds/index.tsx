import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { BoxAccountResponse } from '@/types/app';
import Image from 'next/image';
import { FC } from 'react';
import styles from './index.module.scss';

type FundProps = { type: 'withdraw' | 'transfer'; boxAccount: BoxAccountResponse };

const Funds: FC<FundProps> = ({ type, boxAccount: res }) => {
  const theme = useAccountStore((state) => state.theme);
  const { accountNow, boxAccount } = res ?? {};

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <Image
            src={require(`@/assets/${theme}/safeBox/gameWalletIcon.png`)}
            alt='gameWalletIcon'
            height={100}
            width={100}
          />
          <span>钱包余额(元)</span>
          <span>{type === 'transfer' ? accountNow : boxAccount}</span>
        </div>
        <div className={styles.middle}>
          <Image
            src={require(
              `@/assets/${theme}/safeBox/${type === 'transfer' ? 'transferToIcon' : 'transferFromIcon'}.png`,
            )}
            alt='transferIcon'
            height={100}
            width={100}
          />
        </div>
        <div className={styles.iconContainer}>
          <Image
            src={require(`@/assets/${theme}/safeBox/GreenSumthing.png`)}
            alt='GreenSumthing'
            height={100}
            width={100}
          />
          <span>钱包余额(元)</span>
          <span>{type === 'withdraw' ? accountNow : boxAccount}</span>
        </div>
      </div>
      <div className={styles.inputContainer}>
        <div>转出金额</div>
        <div>
          <input type='text' placeholder='请输入转出金额' />
          <div>最大金额</div>
        </div>
        <div className={styles.submitBtn}>转入</div>
      </div>
    </div>
  );
};

export default Funds;
