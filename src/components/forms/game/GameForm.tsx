"use client";

import { MouseEvent, useState } from "react";
import ListBoxCategory from "../list-box/ListBoxCategory";
import Label from "../question/Label";
import { IQuestionCategory } from "@/types/questionCategory";
import { InputText } from "../input/Input";
import { useFormInput } from "@/hooks/useFormInput";
import { toastInformation } from "@/libs/sonner/sonner.toast";
import ButtonTrivia from "@/components/trivia/ButtonTrivia";
import { useAppDispatch } from "@/store/hooks.redux";
import { gameSetConfig } from "@/store/features/gameSlice";

const allCategories: IQuestionCategory = {
    _id: "all",
    name: "Aleatorio",
};

export default function GameForm() {
    const dispatch = useAppDispatch();

    // Input Limit Questions
    const inputLimit = useFormInput("1");

    // Select category
    const [selectedCategory, setSelectedCategory] = useState<IQuestionCategory>(
        { _id: "", name: "" }
    );

    const onClickFindQuestions = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const limit: number = Number(inputLimit.inputProps.value);

        if (limit >= 1 && limit <= 30) {
            if (selectedCategory._id !== "") {
                dispatch(
                    gameSetConfig({
                        category: selectedCategory,
                        limit,
                    })
                );
            } else {
                toastInformation("Debe seleccionar una categoría");
            }
        } else {
            toastInformation("Debe ingresar una cantidad entre 1 y 30");
        }
    };

    return (
        <>
            <form
                action=""
                method="get"
                className="h-full flex flex-col justify-between gap-10"
            >
                <div className="flex flex-col gap-4">
                    <Label label="Cantidad de preguntas" name="limit">
                        <InputText
                            type="number"
                            name="limit"
                            inputProps={inputLimit.inputProps}
                            className="text-neutral-900"
                        />
                    </Label>
                    <Label label="Categoría" name="category">
                        <ListBoxCategory
                            selected={selectedCategory}
                            setSelected={setSelectedCategory}
                            newOption={allCategories}
                        />
                    </Label>
                </div>

                <ButtonTrivia
                    onClickFn={onClickFindQuestions}
                    title="Iniciar trivia"
                    className="mx-auto"
                >
                    Iniciar
                </ButtonTrivia>
            </form>
        </>
    );
}
