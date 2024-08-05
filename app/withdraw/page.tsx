'use server'

import { WithdrawPage } from "@/app/withdraw/components/WithdrawPage";
import { getBindCardList, getBankList } from '@/api/pay';

const Withdraw = async () => {
  const bindCardList = await getBindCardList();
  const bankList = await getBankList();

  return (
    <WithdrawPage
      bindCardList={bindCardList}
      bankList={bankList}
    />
  )
};

export default Withdraw;
