import { CheckCircle, Eye, XCircle } from "react-bootstrap-icons";
import ModalDialog from "./ModalDialog";
import Button from "../button/ButtonPrimary";
import { useState } from "react";

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
    // Estado para controlar si se muestra o no la descripción disponible en la pregunta
    const [showDescription, setShowDescription] = useState(false);

    return (
        <>
            <ModalDialog
                closeModal={closeModal}
                isOpen={isOpen}
                title=""
                showBtnClose={false}
            >
                <div className="flex flex-col w-full items-center justify-center gap-6">
                    {/** ESTADO DE LA OPCION SELECCIONADA */}
                    <h3 className="uppercase text-2xl md:text-3xl font-light text-center">
                        ¡Respuesta{" "}
                        {question.isCorrect ? "correcta" : "incorrecta"}!
                    </h3>

                    {/** ICON DEL ESTADO DE LA RESPUESTA */}
                    <span className="w-1/5 h-fit">
                        {question.isCorrect ? (
                            <CheckCircle className="text-green-500 mx-auto w-full h-full" />
                        ) : (
                            <XCircle className="text-red-500 mx-auto w-full h-full" />
                        )}
                    </span>

                    {/** MOSTRAR RESPUESTA CORRECTA Y DESCRIPCIÓN */}
                    <div
                        className={`w-full border border-indigo-500 text-indigo-600 rounded-md p-2 text-sm`}
                    >
                        <div className="w-full flex justify-between items-center">
                            <p className="font-semibold uppercase">
                                <span className="font-normal">
                                    Respuesta correcta:{" "}
                                </span>
                                {question.correct}
                            </p>
                            {question.description && (
                                <Button
                                    className="!p-1 text-sm"
                                    title="Mostrar más..."
                                    onClick={() =>
                                        setShowDescription(!showDescription)
                                    }
                                >
                                    <Eye />
                                </Button>
                            )}
                        </div>
                        {question.description && showDescription && (
                            <p className="mt-2">{question.description}</p>
                        )}
                    </div>
                </div>
            </ModalDialog>
        </>
    );
}
