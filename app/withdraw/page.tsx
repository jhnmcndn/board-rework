'use server';

import { WithdrawPage } from '@/app/withdraw/components/WithdrawPage';
import { getBankList, getBindCardList } from '@/api/pay';
import { getCodeFlowList } from '@/api/platform';

const Withdraw = async () => {
  const bindCardList = await getBindCardList();
  const bankList = await getBankList();
  const codeFlowList = await getCodeFlowList();

  return <WithdrawPage bindCardList={bindCardList} bankList={bankList} codeFlowList={codeFlowList} />;
};

export default Withdraw;
