import { CheckCircle, XCircle } from "react-bootstrap-icons";
import ModalDialog from "./ModalDialog";

interface Props {
    closeModal: () => void;
    isOpen: boolean;
    question: { isCorrect: boolean; correct: string; description: string };
}

export default function ModalGameInformation({
    closeModal,
    isOpen,
    question,
}: Props) {
    return (
        <>
            <ModalDialog closeModal={closeModal} isOpen={isOpen} title="">
                <div className="flex flex-col w-full items-center gap-4">
                    <h3 className="uppercase text-3xl font-light">
                        ¡Respuesta{" "}
                        {question.isCorrect ? "correcta" : "incorrecta"}!
                    </h3>
                    <span className="w-1/4 md:w-1/5 h-fit">
                        {question.isCorrect ? (
                            <CheckCircle className="text-green-500 mx-auto w-full h-full" />
                        ) : (
                            <XCircle className="text-red-500 mx-auto w-full h-full" />
                        )}
                    </span>
                </div>
            </ModalDialog>
        </>
    );
}
