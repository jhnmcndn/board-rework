import LoginTypesModal from '@/components/modals/LoginTypesModal';
import AlertModal from '@/components/modals/AlertModal';

function ModalRoot() {
    // Only add common/global scope modals here,
    // import specific modals only on the component it is being used
    
    return (
            <>
                <AlertModal />
                <LoginTypesModal />
                <div id='modal-root' />
            </>
        ) 
}

export default ModalRoot;