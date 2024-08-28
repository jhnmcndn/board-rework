'use client';

import AlertModal from '@/components/modals/AlertModal';
import LoginOptionsModal from '@/components/modals/LoginOptionsModal';
import { useAccountStore } from '@/components/Providers/AccountStoreProvider';
import dynamic from 'next/dynamic';

const SettingsModal = dynamic(() => import('./SettingsModal'), { ssr: false });
const VersionModal = dynamic(() => import('./VersionModal'), { ssr: false });
const LoginOrRegisterModal = dynamic(() => import('./LoginOrRegisterModal'), { ssr: false });
const AnnouncementModal = dynamic(() => import('./AnnouncementModal'), { ssr: false });
const SuccessWithdrawModal = dynamic(() => import('./SuccessWithdrawModal'), { ssr: false });
const VaultPassCodeModal = dynamic(() => import('./VaultPassCodeModal'), { ssr: false });
const CommissionModal = dynamic(() => import('./CommissionModal'), { ssr: false });
const BindUSDTModal = dynamic(() => import('./BindUSDTModal'), { ssr: false });
const BindBankModal = dynamic(() => import('./BindBankModal'), { ssr: false });
const ShareModal = dynamic(() => import('./ShareModal'), { ssr: false });

const ModalRoot = () => {
  const theme = useAccountStore((state) => state.theme);
  // Only add common/global scope modals here,
  // import specific modals only on the component it is being used

  return (
    <>
      <AlertModal />
      <LoginOptionsModal />
      <LoginOrRegisterModal />
      <SettingsModal />
      <BindBankModal />
      <BindUSDTModal />
      <SuccessWithdrawModal />
      <VersionModal />
      <VaultPassCodeModal />
      <AnnouncementModal />
      <CommissionModal />
      <ShareModal />
      <div id='modal-root' data-theme={theme} />
    </>
  );
};

export default ModalRoot;
