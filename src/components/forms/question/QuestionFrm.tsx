import { useFormInput, useFormTextArea } from "@/hooks/useFormInput";
import { IQuestion } from "@/types/question";
import { useState } from "react";
import { InputText } from "../input/Input";
import Button from "@/components/button/ButtonPrimary";
import { TextArea } from "../input/TextArea";
import { IQuestionCategory } from "@/types/questionCategory";
import OptionsButtonGroup from "./OptionsButtonGroup";
import ListBoxCategory from "../list-box/ListBoxCategory";
import InputOption from "./InputOption";
import Label from "./Label";

export default function QuestionFormUpgrade({
    question,
}: {
    question?: IQuestion;
}) {
    // Array con todas las opciones disponibles
    const [options, setOptions] = useState<Array<string>>(
        question?.options ? question.options : []
    );

    // Opción correcta
    const [correctOption, setCorrectOption] = useState("");

    // Estado para controlar cuando se edita una opción
    const [editOption, setEditOption] = useState(false);

    // Inputs de formulario
    const inputOptions = useFormInput("");
    const inputQuestion = useFormInput(
        question?.question ? question.question : ""
    );
    const inputDescription = useFormTextArea(
        question?.description ? question.description : ""
    );

    // Select category
    const [selectedCategory, setSelectedCategory] = useState<IQuestionCategory>(
        { _id: "", name: "" }
    );

    // Eventos
    /**
     * Agrego una opción a la lista de opciones
     */
    const handleAddOption = () => {
        // Verifico que el input no se encuentre vacío
        if (inputOptions.inputProps.value !== "") {
            // Verifico que la opción a ingresar no se encuentre entre las opciones añadidas
            if (
                !options.find(
                    (e) =>
                        e.toLowerCase() ===
                        inputOptions.inputProps.value.toLowerCase()
                )
            ) {
                let opts = options;
                opts.push(inputOptions.inputProps.value);
                setOptions(opts);
                inputOptions.resetInput();
            }
        }
    };

    const handleEditOption = (option: string) => {
        inputOptions.setInput(option); // set value from option input
        setEditOption(!editOption);
        setOptions(quitOption(option));
        if (option === correctOption) setCorrectOption("");
    };

    const handleCancelEditOption = () => {
        handleAddOption();
        setEditOption(false);
        inputOptions.setInput("");
        setCorrectOption("");
    };

    const handleDeleteOption = (option: string) => {
        setOptions(quitOption(option));
        if (option === correctOption) setCorrectOption("");
    };

    const quitOption = (option: string) => {
        return options.filter((e) => e !== option);
    };

    return (
        <form action="" className="max-w-lg w-full md:w-2/3 p-8 flex flex-col gap-4">
            <Label label="Pregunta" name="question">
                <InputText
                    type="text"
                    name="question"
                    inputProps={inputQuestion.inputProps}
                />
            </Label>

            {/** INPUT OPTIONS */}
            <Label label="Opción" name="option">
                <InputOption
                    editOption={editOption}
                    handleAdd={handleAddOption}
                    handleCancelEdit={handleCancelEditOption}
                    inputProps={inputOptions.inputProps}
                />
            </Label>

            {/** OPTIONS */}
            {options.length > 0 && (
                <OptionsButtonGroup
                    correctOption={correctOption}
                    handleDelete={handleDeleteOption}
                    handleEdit={handleEditOption}
                    options={options}
                    setCorrectOption={setCorrectOption}
                />
            )}

            <Label label="Categoría" name="category">
                <ListBoxCategory
                    selected={selectedCategory}
                    setSelected={setSelectedCategory}
                />
            </Label>

            <Label label="Descripción" name="description">
                <TextArea
                    name="description"
                    inputProps={inputDescription.inputProps}
                />
            </Label>

            <Button className="" type="button">
                Guardar
            </Button>
        </form>
    );
}
