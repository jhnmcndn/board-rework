import AlertModal from '@/components/modals/AlertModal';
import LoginTypesModal from '@/components/modals/LoginTypesModal';
import dynamic from 'next/dynamic';

const SettingsModal = dynamic(() => import('./SettingsModal'), { ssr: false });
const VersionModal = dynamic(() => import('./VersionModal'), { ssr: false });
const AnnouncementModal = dynamic(() => import('./AnnouncementModal'), { ssr: false });
const SuccessWithdrawModal = dynamic(() => import('./SuccessWithdrawModal'), { ssr: false });
const PassCodeModal = dynamic(() => import('./PassCodeModal'), { ssr: false });
const BindUSDTModal = dynamic(() => import('./BindUSDTModal'), { ssr: false });
const BindBankModal = dynamic(() => import('./BindBankModal'), { ssr: false });

function ModalRoot() {
  // Only add common/global scope modals here,
  // import specific modals only on the component it is being used

  return (
    <>
      <AlertModal />
      <LoginTypesModal />
      <SettingsModal />
      <BindBankModal />
      <BindUSDTModal />
      <SuccessWithdrawModal />
      <VersionModal />
      <PassCodeModal />
      <AnnouncementModal />
      <div id='modal-root' />
    </>
  );
}

export default ModalRoot;
