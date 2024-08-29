import { getRechargeUsdtList, rechargeUsdt } from '@/api/pay';
import Input from '@/components/Input';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { RECHARGE_OPTION } from '@/constants/enums';
import { rechargeUsdtSchema } from '@/constants/validateSchema';
import useCopyToClipBoard from '@/hooks/useCopyToClipboard';
import useValidate from '@/hooks/useFormValidate';
import useModalStore from '@/store/modals';
import { UsdtRechargeList } from '@/types/app';
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import styles from '../elements.module.scss';

const USDT: FC = () => {
  const { openAlert } = useModalStore();
  const { copyToClipboard } = useCopyToClipBoard();
  const [activeChannel, setActiveChannel] = useState(0);
  const { payTypeList } = useAccountStore((state) => state);
  const [usdtChannels, setUsdtChannelList] = useState<UsdtRechargeList[]>([]);
  const activeData = usdtChannels.find((ch) => ch.id === activeChannel);
  const usdtData = payTypeList.filter((item) => item.id === RECHARGE_OPTION.USDT)[0];
  const { tex1, tex2, tex3, tex4, tex5 } = usdtData;
  const defaultValues = { transactionId: '', rechargeAmount: '' };

  const { values, errors, handleSubmit, registerField, watch } = useValidate({
    defaultValues,
    schema: rechargeUsdtSchema,
  });

  useEffect(() => {
    fetchUsdtList();
  }, []);

  useEffect(() => {
    const errorInstance = errors('transactionId') || errors('rechargeAmount');
    if (errorInstance) {
      openAlert(errorInstance);
    }
  }, [errors]);

  const fetchUsdtList = async () => {
    const payChannels = await getRechargeUsdtList();
    if (payChannels && !('message' in payChannels)) {
      setUsdtChannelList(payChannels);
      setActiveChannel(payChannels[0].id);
    }
  };

  const handleUsdtRecharge = async () => {
    const res = await rechargeUsdt({
      id: `${activeChannel}`,
      transactionId: values('transactionId'),
      rechargeNumber: values('rechargeAmount'),
    });
    if (res.code === 200) openAlert(res.msg || '充值请求成功');
    else openAlert(res.msg || '充值失败，请重试或修改金额');
  };

  return (
    <div className={styles.deposit}>
      <div className={styles.deposit__header}>
        {usdtChannels.map((item, idx) => (
          <span
            key={`${item.id}-${idx}`}
            className={classNames(styles.deposit__channel, {
              [styles['deposit__channel--active']]: item.id === activeChannel,
            })}
            onClick={() => setActiveChannel(item.id)}
          >
            {item.channelName || item.chainName || 'USDT'}
          </span>
        ))}
      </div>
      <div className={styles.deposit__usdtContent}>
        <div className={styles.deposit__usdtForm}>
          <form onSubmit={handleSubmit(handleUsdtRecharge)}>
            <div>
              <span>链名称:</span>
              <Input
                type='text'
                placeholder='公司所有游戏主播即将暂停'
                value={activeData?.chainName}
                className={styles.deposit__input}
              />
            </div>
            <div>
              <span>汇款金额:</span>
              <Input
                type='text'
                placeholder='请输入汇款姓名'
                value={activeData?.rechargeAddress}
                clipBoardCopy={() => copyToClipboard(activeData?.rechargeAddress)}
                className={styles.deposit__input}
              />
            </div>
            <div>
              <span>交易ID:</span>
              <Input
                placeholder='请输入交易ID'
                maxLength={30}
                {...registerField('transactionId')}
                className={styles.deposit__input}
              />
            </div>
            <div>
              <span>充值数量:</span>
              <Input
                number
                placeholder='请输入充值USDT数量'
                maxLength={20}
                {...registerField('rechargeAmount')}
                className={styles.deposit__input}
              />
            </div>
            <span>
              最终充值到账金额为: {(+(watch('rechargeAmount') || 0) * +(activeData?.exchangeRate || 1)).toFixed(2)} (
              {+watch('rechargeAmount') || 0} USDT * 当前汇率 {activeData?.exchangeRate}元)
            </span>
            <button type='submit' className={styles.deposit__button}>
              <span>立即充值</span>
            </button>
          </form>
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
