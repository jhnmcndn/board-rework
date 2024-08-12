import AlertModal from '@/components/modals/AlertModal';
import LoginTypesModal from '@/components/modals/LoginTypesModal';
import SettingsModal from './SettingsModal';

function ModalRoot() {
  // Only add common/global scope modals here,
  // import specific modals only on the component it is being used

  return (
    <>
      <AlertModal />
      <LoginTypesModal />
      <SettingsModal />
      <div id='modal-root' />
    </>
  );
}

export default ModalRoot;
