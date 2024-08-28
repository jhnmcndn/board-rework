import { getIp } from '@/api';
import { getRechargeUsdtList } from '@/api/pay';
import useModalStore from '@/store/modals';
import { PayTypeList, UsdtRechargeList } from '@/types/app';
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import styles from '../elements.module.scss';

type USDTDepositProps = {
  usdtData: PayTypeList;
};

const USDT: FC<USDTDepositProps> = ({ usdtData }) => {
  const { openAlert } = useModalStore();
  const [activeChannel, setActiveChannel] = useState(0);
  const [payChannelList, setPayChannelList] = useState<UsdtRechargeList[]>([]);
  const { tex1, tex2, tex3, tex4, tex5 } = usdtData;

  useEffect(() => {
    fetchUsdtList();
  }, []);

  const fetchUsdtList = async () => {
    const usdtChannels = await getRechargeUsdtList();
    if (usdtChannels && !('message' in usdtChannels)) {
      setPayChannelList(usdtChannels);
      setActiveChannel(usdtChannels[0].id);
    }
  };

  const changePaymentChannel = (channelId: number) => {
    setActiveChannel(channelId);
  };

  const handleUsdtRecharge = async () => {
    const ip = await getIp();
    // const { code, data, msg } = await requestUsdtRecharge({ channelId: activeChannel, amount, ip });
    // if (code === 200 && typeof data === 'string') window.open(data, '_blank');
    // else openAlert(msg || '充值失败，请重试或修改金额');
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
            {item.channelName || item.chainName || 'USDT'}
          </span>
        ))}
      </div>
      <div className={styles.deposit__usdtContent}>
        <div className={styles.deposit__usdtForm}>
          <form onSubmit={handleUsdtRecharge}></form>
          <button type='submit' className={styles.deposit__button}>
            <span>立即充值</span>
          </button>
        </div>
        <div className={styles.deposit__usdtInstructions}>
          <span>请仔细阅读充值步骤：</span>
          {[tex1, tex2, tex3, tex4, tex5]
            .filter((tex) => tex !== '')
            .map((text, index) => (
              <div key={index} className={styles.deposit__instruction}>
                {text.split('\n').map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            ))}
          <div>温馨提示：我司充值地址会不定期更新，请注意查看</div>
        </div>
      </div>
    </div>
  );
};

export default USDT;
