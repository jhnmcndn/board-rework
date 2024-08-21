'use server';

import { WithdrawPage } from '@/app/withdraw/components/WithdrawPage';
import { getBankList, getBindCardList, getWithdrawRechargeDetail } from '@/api/pay';
import { getCodeFlowList } from '@/api/platform';

const Withdraw = async () => {
  const bindCardList = await getBindCardList();
  const bankList = await getBankList();
  const codeFlowList = await getCodeFlowList();
  const withdrawRecordList = await getWithdrawRechargeDetail({
    type: 'withdraw',
    pageNum: 1,
    pageSize: 50,
  });

  return (
    <WithdrawPage
      bindCardList={bindCardList}
      bankList={bankList}
      codeFlowList={codeFlowList}
      withdrawRecordList={withdrawRecordList}
    />
  );
};

export default Withdraw;
