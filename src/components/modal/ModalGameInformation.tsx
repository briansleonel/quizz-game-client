import ModalDialog from "./ModalDialog";

interface Props {
    closeModal: () => void;
    isOpen: boolean;
}

export default function ModalGameInformation({ closeModal, isOpen }: Props) {
    return (
        <>
            <ModalDialog closeModal={closeModal} isOpen={isOpen} title="">
                Mostrando estado
            </ModalDialog>
        </>
    );
}
