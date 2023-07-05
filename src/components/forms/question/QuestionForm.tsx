"use client";

import { IQuestion } from "@/types/question";
import { FormProvider, useForm } from "react-hook-form";
import InputLabel from "../input/InputLabel";
import { DropdownCategory } from "../Dropdown/DropdownCategory/DropdownCategory";
import TextArea from "../input/TextArea";
import Button from "@/components/button/ButtonPrimary";
import { toast } from "react-toastify";

export default function QuestionForm() {
    const formMethods = useForm<IQuestion>();

    const onSubmit = formMethods.handleSubmit(
        (formData) => {
            console.log(formData);
        },
        (err) => {
            if (err.category) toast.info("Seleccione una categoría");
            if (err) toast.info("Revise los campos");
        }
    );
    return (
        <FormProvider {...formMethods}>
            <form
                action=""
                className="max-w-lg w-full md:w-2/3 p-8"
                onSubmit={onSubmit}
            >
                <InputLabel name="question" label="Pregunta" type="text" />
                <InputLabel
                    name="correct"
                    label="Respuesta correcta"
                    type="text"
                    className="mt-4"
                />
                <InputLabel
                    name="a"
                    label="Opción A"
                    type="text"
                    className="mt-4"
                />
                <InputLabel
                    name="b"
                    label="Opción B"
                    type="text"
                    className="mt-4"
                />
                <InputLabel
                    name="c"
                    label="Opción C"
                    type="text"
                    className="mt-4"
                />
                <DropdownCategory className="mt-4" />
                <TextArea
                    name="description"
                    label="Descripción"
                    className="mt-4"
                />

                <Button text="Guardar" className="mt-10" />
            </form>
        </FormProvider>
    );
}
