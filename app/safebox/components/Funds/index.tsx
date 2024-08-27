'use client';

import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { BoxAccountResponse } from '@/types/app';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC, useState } from 'react';
import styles from './index.module.scss';

type FundProps = { type: 'withdraw' | 'transfer'; boxAccount: BoxAccountResponse };

const Funds: FC<FundProps> = ({ type, boxAccount: res }) => {
  const [val, setVal] = useState('');
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
        <div className={styles.textContainer}>
          <div className={styles.header}>转出金额</div>
          <div className={styles.maxContainer}>
            <input type='text' placeholder='请输入转出金额' value={val} onChange={(e) => setVal(e.target.value)} />
            <motion.div className={styles.maxBtn} whileTap={{ scale: 0.95 }}>
              最大金额
            </motion.div>
          </div>
        </div>
        <motion.div className={styles.submitBtn} whileTap={{ scale: 0.95 }}>
          {type === 'transfer' ? '转入' : '转出'}
        </motion.div>
      </div>
    </div>
  );
};

export default Funds;
