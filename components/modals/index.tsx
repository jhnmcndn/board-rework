import AlertModal from '@/components/modals/AlertModal';
import LoginTypesModal from '@/components/modals/LoginTypesModal';
import SettingsModal from './SettingsModal';
import BindBankModal from '@/components/modals/BindBankModal';
import BindUSDTModal from '@/components/modals/BindUSDTModal';

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
      <div id='modal-root' />
    </>
  );
}

export default ModalRoot;
