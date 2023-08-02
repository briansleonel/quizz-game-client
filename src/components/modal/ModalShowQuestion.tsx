import { HTMLInputTypeAttribute, useState } from "react";
import Button from "../button/ButtonPrimary";
import { Eye } from "react-bootstrap-icons";
import ModalDialog from "./ModalDialog";
import { IQuestion } from "@/types/question";

export default function ModalShowQuestion({
    question,
}: {
    question: IQuestion;
}) {
    let [isOpen, setIsOpen] = useState(false);

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
                title=""
            >
                <div className="w-full flex flex-col gap-4">
                    <div>
                        <p className="block mb-1">Pregunta</p>
                        <SpanData>{question.question}</SpanData>
                    </div>

                    {question.options.map((e, i) => (
                        <div key={i}>
                            <p className="block mb-1">
                                {i === question.correct
                                    ? "Opción correcta"
                                    : `Opción ${i}`}
                            </p>
                            <SpanData>{e}</SpanData>
                        </div>
                    ))}

                    <div>
                        <p className="block mb-1">Categoría</p>
                        <SpanData>{question.category.name}</SpanData>
                    </div>
                </div>
            </ModalDialog>
        </>
    );
}

export function SpanData({ children }: { children: React.ReactNode }) {
    return (
        <span className="w-full block px-2 py-1 outline-none rounded-md text-gray-950 border border-gray-400 bg-zinc-50 drop-shadow">
            {children}
        </span>
    );
}

export function Input({
    name,
    type,
    disabled,
    value,
}: {
    type: HTMLInputTypeAttribute;
    name: string;
    disabled: boolean;
    value: string;
}) {
    return (
        <input
            className="w-full px-2 py-1 transition-colors ease-in-out duration-500 outline-none rounded-md text-gray-950 border border-gray-400 bg-zinc-100 focus:border-violet-900 drop-shadow"
            type={type}
            name={name}
            id={name}
            value={value}
            disabled={disabled}
        />
    );
}
