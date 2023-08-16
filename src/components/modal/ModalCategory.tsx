"use client";

import { useState } from "react";
import Button from "../button/ButtonPrimary";
import { PencilSquare, Plus } from "react-bootstrap-icons";
import ModalDialog from "./ModalDialog";
import { IQuestionCategory } from "@/types/questionCategory";
import { useFormInput } from "@/hooks/useFormInput";
import { InputText } from "../forms/input/Input";
import Label from "../forms/question/Label";
import { useCategory } from "@/hooks/useQuestionCategory";

export default function ModalCategory({
    category,
    edit,
}: {
    category?: IQuestionCategory;
    edit: boolean;
}) {
    const [isOpen, setIsOpen] = useState(false);

    const inputNameCategory = useFormInput(
        edit && category ? category.name : ""
    );

    const { handlerUpdateCategory, handlerAddCategory } = useCategory();

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (edit && category)
            await handlerUpdateCategory({
                _id: category._id,
                name: inputNameCategory.inputProps.value,
            }).then(() => closeAndClean());
        else
            await handlerAddCategory({
                _id: "",
                name: inputNameCategory.inputProps.value,
            }).then(() => closeAndClean());
    }

    function closeAndClean() {
        inputNameCategory.resetInput();
        closeModal();
    }

    return (
        <>
            {edit && category ? (
                <Button
                    type="button"
                    title="Editar"
                    onClick={openModal}
                    className="bg-yellow-500 hover:bg-yellow-400"
                >
                    <PencilSquare />
                </Button>
            ) : (
                <Button
                    className="flex items-center justify-center gap-2 text-sm bg-emerald-500 hover:bg-emerald-600 basis-full md:basis-1/6 lg:basis-1/12"
                    onClick={openModal}
                    title="Agregar nueva categoría"
                >
                    {" "}
                    <Plus className="w-5 h-5" /> <span>Nuevo</span>
                </Button>
            )}

            <ModalDialog
                closeModal={closeModal}
                isOpen={isOpen}
                title={`${edit ? "Editar" : "Agregar"} categoría`}
                className="md:max-w-sm lg:max-w-md"
            >
                <form
                    className="flex flex-col w-full gap-4"
                    action=""
                    onSubmit={onSubmit}
                >
                    <Label label="Nombre" name="name">
                        <InputText
                            name="name"
                            type="text"
                            inputProps={inputNameCategory.inputProps}
                        />
                    </Label>
                    <div className="flex flex-col gap-2 md:flex-row mt-6">
                        <Button
                            className="bg-red-600 hover:bg-red-500 text-sm w-full"
                            type="button"
                            onClick={closeModal}
                        >
                            Cancelar
                        </Button>

                        <Button className="text-sm w-full" type="submit">
                            Guardar {edit ? " cambios" : ""}
                        </Button>
                    </div>
                </form>
            </ModalDialog>
        </>
    );
}
