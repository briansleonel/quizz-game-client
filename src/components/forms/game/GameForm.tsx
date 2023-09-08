"use client";

import { MouseEvent, useEffect, useState } from "react";
import ListBoxCategory from "../list-box/ListBoxCategory";
import Label from "../question/Label";
import { IQuestionCategory } from "@/types/questionCategory";
import { InputText } from "../input/Input";
import { useFormInput } from "@/hooks/useFormInput";
import { toastInformation } from "@/libs/sonner/sonner.toast";
import ButtonTrivia from "@/components/trivia/ButtonTrivia";
import { useAppDispatch } from "@/store/hooks.redux";
import { gameResetQuiz, gameSetConfig } from "@/store/features/gameSlice";
import { useRouter } from "next/navigation";

const allCategories: IQuestionCategory = {
    _id: "random",
    name: "Aleatorio",
};

export default function GameForm() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    // Input Limit Questions
    const inputLimit = useFormInput("");

    // Select category
    const [selectedCategory, setSelectedCategory] = useState<IQuestionCategory>(
        { _id: "", name: "" }
    );

    function isNumber(value: string) {
        const regExp = /^[0-9]+$/;
        return regExp.test(value);
    }

    const onClickFindQuestions = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (isNumber(inputLimit.inputProps.value)) {
            const limit: number = Number(inputLimit.inputProps.value);

            if (limit >= 1 && limit <= 30) {
                if (selectedCategory._id !== "") {
                    dispatch(
                        gameSetConfig({
                            category: selectedCategory,
                            limit,
                        })
                    );
                    router.push("/game/start");
                } else {
                    toastInformation("Debe seleccionar una categoría");
                }
            } else {
                toastInformation("Debe ingresar una cantidad entre 1 y 30");
            }
        } else {
            toastInformation("Debe ingresar un número");
        }
    };

    /**
     * Hook que se encarga de reiniciar las variables del juego cada vez que se ingresa al componente
     */
    useEffect(() => {
        dispatch(gameResetQuiz());
    });

    return (
        <>
            <form
                action=""
                method="get"
                className="h-full flex flex-col justify-between rounded gap-6 bg-white text-neutral-900 p-4"
            >
                <div className="flex flex-col gap-4">
                    {/*<Label label="Cantidad de preguntas" name="limit">*/}
                    <InputText
                        type="text"
                        name="limit"
                        inputProps={inputLimit.inputProps}
                        className="text-neutral-900 rounded-sm text-xl font-semibold text-center drop-shadow-none placeholder:text-gray-400 placeholder:font-normal placeholder:text-lg"
                        placeholder="Cantidad de preguntas"
                    />
                    {/*</Label>*/}
                    <Label
                        label="Categoría"
                        name="category"
                        className="text-neutral-600 uppercase text-sm"
                    >
                        <ListBoxCategory
                            selected={selectedCategory}
                            setSelected={setSelectedCategory}
                            newOption={allCategories}
                            className="rounded-sm !text-base font-medium shadow-none py-1"
                        />
                    </Label>
                </div>

                <ButtonTrivia
                    onClickFn={onClickFindQuestions}
                    title="Iniciar trivia"
                    className="w-full !bg-neutral-900 text-white hover:!bg-neutral-950 font-medium !py-3"
                >
                    Iniciar
                </ButtonTrivia>
            </form>
        </>
    );
}
