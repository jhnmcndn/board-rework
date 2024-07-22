'use client'

import { useAccountStore } from "@/components/Providers/AccountStoreProvider";

const Withdraw = () => {
  const bindCardList = useAccountStore((state) => state.bindCardList);

  return <div>CAFF</div>;
};

export default Withdraw;
