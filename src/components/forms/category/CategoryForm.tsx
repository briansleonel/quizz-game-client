"use client";

import { IQuestionCategory } from "@/types/questionCategory";
import { FormProvider, useForm } from "react-hook-form";
import InputLabel from "../input/InputLabel";
import ButtonPrimary from "@/components/button/ButtonPrimary";

export default function CategoryForm() {
    const formMethods = useForm<IQuestionCategory>();

    const onSubmit = formMethods.handleSubmit((formData) => {
        console.log(formData);
    });

    return (
        <FormProvider {...formMethods}>
            <form
                action=""
                onSubmit={onSubmit}
                className="max-w-lg w-full md:w-2/3 p-8"
            >
                <InputLabel
                    name="name"
                    label="Nombre de categoría"
                    type="text"
                />

                <ButtonPrimary text="Guardar" className="mt-10" />
            </form>
        </FormProvider>
    );
}
