import AlertModal from '@/components/modals/AlertModal';
import BindBankModal from '@/components/modals/BindBankModal';
import BindUSDTModal from '@/components/modals/BindUSDTModal';
import LoginTypesModal from '@/components/modals/LoginTypesModal';
import PassCodeModal from '@/components/modals/PassCodeModal';
import SuccessWithdrawModal from '@/components/modals/SuccessWIthdrawModal';
import AnnoucementModal from './AnnouncementModal';
import SettingsModal from './SettingsModal';
import VersionModal from './VersionModal';

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
      <AnnoucementModal />
      <div id='modal-root' />
    </>
  );
}

export default ModalRoot;
