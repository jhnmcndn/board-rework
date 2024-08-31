'use client';

import AlertModal from '@/components/modals/AlertModal';
import LoginOptionsModal from '@/components/modals/LoginOptionsModal';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import dynamic from 'next/dynamic';

const AnnouncementModal = dynamic(() => import('./AnnouncementModal'), { ssr: false });
const SuccessWithdrawModal = dynamic(() => import('./SuccessWithdrawModal'), { ssr: false });
const VaultPassCodeModal = dynamic(() => import('./VaultPassCodeModal'), { ssr: false });
const CommissionModal = dynamic(() => import('./CommissionModal'), { ssr: false });
const BindUSDTModal = dynamic(() => import('./BindUSDTModal'), { ssr: false });
const BindBankModal = dynamic(() => import('./BindBankModal'), { ssr: false });

const ModalRoot = () => {
  const theme = useAccountStore((state) => state.theme);
  // Only add common/global scope modals here,
  // import specific modals only on the component it is being used to limit rerenders

  return (
    <>
      <LoginOptionsModal />
      <BindBankModal />
      <BindUSDTModal />
      <SuccessWithdrawModal />
      <VaultPassCodeModal />
      <AnnouncementModal />
      <CommissionModal />
      <AlertModal />
    </>
  );
};

export default ModalRoot;
