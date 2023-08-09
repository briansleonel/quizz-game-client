"use client";

import { IQuestion } from "@/types/question";
import { InputText } from "../input/Input";
import Button from "@/components/button/ButtonPrimary";
import { TextArea } from "../input/TextArea";
import OptionsButtonGroup from "./OptionsButtonGroup";
import ListBoxCategory from "../list-box/ListBoxCategory";
import InputOption from "./InputOption";
import Label from "./Label";
import useQuestionForm from "@/hooks/useQuestionForm";
import { useRouter } from "next/navigation";
import { SubTitle } from "@/components/layout/Title";

export default function QuestionForm({ question }: { question?: IQuestion }) {
    const router = useRouter();
    const { category, handlers, inputs, options } = useQuestionForm(question);

    /**
     * Evento para volver al dashboard principal de preguntas
     */
    const goToDashboardQuestion = () => {
        router.push("/dashboard/question");
    };

    return (
        <form
            className="w-full flex flex-col gap-4 mx-auto"
            method="POST"
            onSubmit={(e) => handlers.onSubmit(e, goToDashboardQuestion)}
        >
            <SubTitle className="">Pregunta</SubTitle>
            <Label label="Pregunta" name="question">
                <InputText
                    type="text"
                    name="question"
                    inputProps={inputs.inputQuestion.inputProps}
                />
            </Label>

            {/** INPUT OPTIONS */}
            <Label
                label={`${options.editOption ? "Editar" : "Nueva"} opción`}
                name="option"
            >
                <InputOption
                    editOption={options.editOption}
                    handleAdd={handlers.handleAddOption}
                    handleCancelEdit={handlers.handleCancelEditOption}
                    inputProps={inputs.inputOptions.inputProps}
                />
            </Label>

            {/** OPTIONS */}
            {options.options.length > 0 && (
                <Label label="Opciones" name="options">
                    <div className="p-2 bg-neutral-50 rounded border">
                        <OptionsButtonGroup
                            correctOption={options.correctOption}
                            handleDelete={handlers.handleDeleteOption}
                            handleEdit={handlers.handleEditOption}
                            options={options.options}
                            setCorrectOption={options.setCorrectOption}
                        />
                    </div>
                </Label>
            )}

            <Label label="Categoría" name="category">
                <ListBoxCategory
                    selected={category.selectedCategory}
                    setSelected={category.setSelectedCategory}
                />
            </Label>

            <Label label="Descripción" name="description">
                <TextArea
                    name="description"
                    inputProps={inputs.inputDescription.inputProps}
                />
            </Label>

            <div className="flex flex-col gap-2">
                <Button className="" type="submit">
                    Guardar {question ? " cambios" : ""}
                </Button>
                <Button
                    className="bg-red-600 hover:bg-red-500"
                    type="button"
                    onClick={goToDashboardQuestion}
                >
                    Cancelar
                </Button>
            </div>
        </form>
    );
}