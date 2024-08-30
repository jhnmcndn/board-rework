'use client';

import { bankRecharge } from '@/api/pay';
import submitBtn from '@/assets/commons/button.png';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import { defaultPayTypeList } from '@/constants/defaultData';
import { RECHARGE_OPTION } from '@/constants/enums';
import useModalStore from '@/store/modals';
import { copyToClipboard, maskData, onlyAllowDigits } from '@/utils/helpers';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import styles from './index.module.scss';

const formSchema = z.object({
  remittanceAmount: z.string().min(1, '请输入正确金额'),
  remittanceName: z.string().min(1, '请输入正确金额'),
});

const DirectDeposit = () => {
  const { payTypeList, fetchRechargeBankList, rechargeBankList } = useAccountStore((s) => s);
  const openAlert = useModalStore((s) => s.openAlert);
  const directDepositData = payTypeList.find((payType) => payType.id === RECHARGE_OPTION.DIRECT) || defaultPayTypeList;
  const { tex1, tex2, tex3, tex4, tex5 } = directDepositData;
  const rechargeBankLabels = ['收款银行', '收款名称', '收款账户', '开户地点'];
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      remittanceAmount: '',
      remittanceName: '',
    },
    resolver: zodResolver(formSchema),
  });
  useEffect(() => {
    fetchRechargeBankList();
  }, []);
  return (
    <section className={styles.container}>
      <div className={styles.rechargeWrapper}>
        <form
          onSubmit={form.handleSubmit(
            (data) => {
              bankRecharge({
                bankBaseId: rechargeBankList[0]?.id,
                ip: localStorage.getItem('externalIp') || '',
                rechargeMoney: data.remittanceAmount,
                rechargeUserName: data.remittanceName,
              });
            },
            (e) => {
              const alertMsg = e.remittanceAmount?.message || e.remittanceName?.message || '';
              openAlert(alertMsg);
            },
          )}
        >
          <div className={styles.input}>
            <label htmlFor='remittanceAmount'>汇款金额:</label>
            <input
              type='text'
              placeholder='可充值区间 0 - 0 元'
              id='remittanceAmount'
              onKeyDown={onlyAllowDigits}
              {...form.register('remittanceAmount')}
            />
          </div>
          <div className={styles.input}>
            <label htmlFor='remittanceName'>汇款姓名:</label>
            <input type='text' placeholder='请输入汇款姓名' id='remittanceName' {...form.register('remittanceName')} />
          </div>
          <button className={styles.submit} type='submit'>
            <Image src={submitBtn} alt='Submit button' width={278} height={90} />
            <span>立即充值</span>
          </button>
        </form>
        <div className={styles.rechargeBankDetails}>
          {rechargeBankLabels.map((label, index) => (
            <div key={index}>
              <span>
                {label}: {maskData(rechargeBankList[0]?.id)}
              </span>
              <button
                onClick={() => {
                  if (!rechargeBankList.length) return;
                  copyToClipboard(rechargeBankList[0].id);
                }}
              >
                复制
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.instructions}>
        {[tex1, tex2, tex3, tex4, tex5]
          .filter((text) => text !== '')
          .map((text) => text.split('\n').map((t, index) => <p key={index}>{t}</p>))}
      </div>
    </section>
  );
};

export default DirectDeposit;
