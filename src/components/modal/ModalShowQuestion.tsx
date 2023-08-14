import { useState } from "react";
import Button from "../button/ButtonPrimary";
import {
    ArrowReturnLeft,
    Check2,
    Eye,
    PencilSquare,
    Trash3Fill,
} from "react-bootstrap-icons";
import ModalDialog from "./ModalDialog";
import { IQuestionId } from "@/types/question";

export default function ModalShowQuestion({
    question,
    handleDelete,
    handleEdit,
}: {
    question: IQuestionId;
    handleDelete: (id: string) => void;
    handleEdit: (id: string) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
            <Button
                type="button"
                title="Mostrar"
                onClick={openModal}
                className="bg-indigo-500 hover:bg-indigo-600"
            >
                <Eye />
            </Button>

            <ModalDialog
                closeModal={closeModal}
                isOpen={isOpen}
                title="Pregunta"
                className="md:max-w-sm lg:max-w-md"
            >
                <div className="w-full flex flex-col gap-4 text-gray-950">
                    <div>
                        <p className="block mb-1 font-light">Pregunta:</p>
                        <SpanData>{question.question}</SpanData>
                    </div>
                    <div>
                        <p className="block mb-1 font-light">Opciones:</p>
                        <div className="flex flex-col gap-2">
                            {question.options.map((e, i) => (
                                <SpanData
                                    key={i}
                                    className={
                                        question.correct === i
                                            ? "border-green-500 flex justify-between items-center"
                                            : "border-gray-400 block"
                                    }
                                >
                                    {e}{" "}
                                    {question.correct === i ? (
                                        <Check2 className="text-green-500 text-xl" />
                                    ) : (
                                        ""
                                    )}
                                </SpanData>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="block mb-1 font-light">Categoría</p>
                        <SpanData>
                            {question.category.name.toUpperCase()}
                        </SpanData>
                    </div>

                    <div className="flex flex-col-reverse md:flex-row gap-2 mt-4">
                        <Button
                            className="bg-red-600 hover:bg-red-500 flex justify-center items-center gap-2 w-full text-sm"
                            title="Eliminar"
                            onClick={() => handleDelete(question._id)}
                        >
                            <Trash3Fill />
                            <span>Eliminar</span>
                        </Button>
                        <Button
                            className="bg-yellow-500 hover:bg-yellow-400 flex justify-center items-center gap-2 w-full text-sm"
                            title="Editar"
                            onClick={() => handleEdit(question._id)}
                        >
                            <PencilSquare />
                            <span>Editar</span>
                        </Button>
                        <Button
                            className=" flex justify-center items-center gap-2 w-full text-sm"
                            title="Volver atrás"
                            onClick={() => closeModal()}
                        >
                            <ArrowReturnLeft />
                            <span>Volver</span>
                        </Button>
                    </div>
                </div>
            </ModalDialog>
        </>
    );
}

export function SpanData({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <span
            className={`block font-normal px-2 py-1 rounded text-gray-950 border border-gray-400 bg-zinc-50 ${
                className ? className : ""
            }`}
        >
            {children}
        </span>
    );
}
