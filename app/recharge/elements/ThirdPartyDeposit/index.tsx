import { getIp } from '@/api';
import { getPayChannelList, requestThirdPartyRecharge } from '@/api/pay';
import { RECHARGE_OPTION } from '@/constants/enums';
import useModalStore from '@/store/modals';
import { PayChannelList } from '@/types/app';
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import styles from '../elements.module.scss';

export type ThirdPartyDepositProps = {
  option: RECHARGE_OPTION;
};

const ThirdPartyDeposit: FC<ThirdPartyDepositProps> = ({ option }) => {
  const { openAlert } = useModalStore();
  const [amount, setAmount] = useState('0');
  const [activeChannel, setActiveChannel] = useState(0);
  const [payChannelList, setPayChannelList] = useState<PayChannelList[]>([]);
  const selectedChannel = payChannelList.filter((item) => item.id === activeChannel);
  const quickAmounts = selectedChannel[0]?.quickAmount?.split(',');

  useEffect(() => {
    fetchPayChannelList();
  }, [option]);

  const fetchPayChannelList = async () => {
    const payChannels = await getPayChannelList(option);
    if (payChannels && !('message' in payChannels)) {
      setPayChannelList(payChannels);
      setActiveChannel(payChannels[0].id);
    }
  };

  const changePaymentChannel = (channelId: number) => {
    setActiveChannel(channelId);
    setAmount('0');
  };

  const handleThirdPartyRecharge = async () => {
    const ip = await getIp();
    const { code, data, msg } = await requestThirdPartyRecharge({ channelId: activeChannel, amount, ip });
    if (code === 200 && typeof data === 'string') window.open(data, '_blank');
    else openAlert({ body: msg || '充值失败，请重试或修改金额' });
  };

  return (
    <div className={styles.deposit}>
      <div className={styles.deposit__header}>
        {payChannelList.map((item, idx) => (
          <span
            key={`${item.id}-${idx}`}
            className={classNames(styles.deposit__channel, {
              [styles['deposit__channel--active']]: item.id === activeChannel,
            })}
            onClick={() => changePaymentChannel(item.id)}
          >
            {item.name || '固定金额'}
          </span>
        ))}
      </div>
      <div className={styles.deposit__content}>
        <div className={styles.deposit__amountSelection}>
          {quickAmounts?.map((value, index) => (
            <span
              key={`${index}-${value}`}
              className={classNames(styles.deposit__amount, {
                [styles['deposit__amount--active']]: value === amount,
              })}
              onClick={() => setAmount(value)}
            >
              {value}
            </span>
          ))}
        </div>
        <button
          className={styles.deposit__button}
          onClick={() => {
            if (amount === '0') openAlert({ body: '请输入正确金额' });
            else if (activeChannel !== 0) handleThirdPartyRecharge();
          }}
        >
          <span>立即充值</span>
        </button>
      </div>
    </div>
  );
};

export default ThirdPartyDeposit;
