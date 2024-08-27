import useModalStore from '@/store/modals';
import { FC, useState } from 'react';
import styles from '../elements.module.scss';

export type ThirdPartyDepositProps = {
  type: 'AliPay' | 'QQPay' | 'WeChat';
};

const ThirdPartyDeposit: FC<ThirdPartyDepositProps> = ({ type }) => {
  const { openAlert } = useModalStore();
  const [amount, setAmount] = useState(0);

  return (
    <div className={styles.deposit}>
      <div className={styles.deposit__header}>
        <span>固定金额</span>
      </div>
      <div className={styles.deposit__content}>
        <div className={styles.deposit__amountSelection}>
          {/* {selectedItem?.quickAmount?.split(',')?.map((value, index) => {
              return (
                <ValueItem
                  key={index}
                  amount={value}
                  selectedValueItem={selectedValueItem}
                  setSelectedValueItem={setSelectedValueItem}
                />
              );
            })} */}
        </div>
        <button
          className={styles.deposit__button}
          onClick={() => {
            // if (!selectedValueItem) {
            //   openAlert({ body: '请输入正确金额' });
            // } else {
            //   if (selectedItem?.id !== undefined) {
            //     onlineRechargeHandler();
            //   }
            // }
          }}
        >
          <span>立即充值</span>
        </button>
      </div>
    </div>
  );
};

export default ThirdPartyDeposit;
