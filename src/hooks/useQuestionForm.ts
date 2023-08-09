import { IQuestion } from "@/types/question";
import { useState } from "react";
import { useFormInput, useFormTextArea } from "./useFormInput";
import { IQuestionCategory } from "@/types/questionCategory";
import {
    toastError,
    toastInformation,
    toastSuccess,
    toastWarning,
} from "@/libs/toast";
import { useUpdateQuestionMutation } from "./useQuestion";
import { convertToObject } from "@/libs/question";

export default function useQuestionForm(question?: IQuestion) {
    // Array con todas las opciones disponibles
    const [options, setOptions] = useState<Array<string>>(
        question ? question.options : []
    );

    // Opción correcta
    const [correctOption, setCorrectOption] = useState(
        question ? options[question.correct] : ""
    );

    // Estado para controlar cuando se edita una opción
    const [editOption, setEditOption] = useState(false);

    // Inputs de formulario
    const inputQuestion = useFormInput(question ? question.question : "");
    const inputOptions = useFormInput("");
    const inputDescription = useFormTextArea(
        question ? question.description : ""
    );

    // Select category
    const [selectedCategory, setSelectedCategory] = useState<IQuestionCategory>(
        question ? question.category : { _id: "", name: "" }
    );

    // Mutations
    const updateMutation = useUpdateQuestionMutation();

    /**
     * Evento para agregar una nueva opción a la lista de opciones
     */
    function handlerAddOption() {
        // Verifico que el input no se encuentre vacío
        if (inputOptions.inputProps.value !== "") {
            if (options.length < 4) {
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
                    toastSuccess("Opción agregada");
                } else {
                    toastError("No puede agregar opciones repetidas");
                }
            } else {
                toastInformation("No se puede agregar más opciones");
            }
        } else {
            toastInformation("Opción no válida");
        }
    }

    /**
     * Manejador para controlar cuando se edite una opción seleccionada
     * @param option opción a editar
     */
    function handlerEditOption(option: string) {
        inputOptions.setInput(option); // set value from option input
        setEditOption(!editOption);
        setOptions(quitOption(option));
        if (option === correctOption) setCorrectOption("");
    }

    /**
     * Manejador para cancelar la edición de una opción
     */
    function handlerCancelEditOption() {
        handlerAddOption();
        setEditOption(false);
        inputOptions.setInput("");
        setCorrectOption("");
    }

    /**
     * Manejador para eliminar una determinada opción de la lista de opciones
     * @param option opción a eliminar
     */
    function handlerDeleteOption(option: string) {
        setOptions(quitOption(option));
        if (option === correctOption) setCorrectOption("");
        toastWarning("Opción eliminada");
    }

    /**
     * Permite filtrar el array de opciones, para así poder quitar la opción que no se usará
     * @param option opción a quitar
     * @returns un arreglo con la lista de opciones actualizada
     */
    function quitOption(option: string) {
        return options.filter((e) => e !== option);
    }

    async function handlerUpdateQuestion(questionUpdate: IQuestion) {
        await updateMutation.mutateAsync({ question: questionUpdate });
    }

    /**
     * Permite realizar el envío de los datos del formulario
     * @param e Evento de formulario
     */
    function onSubmit(e: React.FormEvent<HTMLFormElement>, goTo: () => void) {
        e.preventDefault();
        if (inputQuestion.inputProps.value) {
            if (options.length >= 2) {
                if (correctOption !== "") {
                    if (selectedCategory._id !== "") {
                        if (question?._id) {
                            const update = convertToObject({
                                id: question._id,
                                question: inputQuestion.inputProps.value,
                                category: selectedCategory,
                                description: inputDescription.inputProps.value,
                                user: question.user,
                                correctOption,
                                options,
                            });
                            handlerUpdateQuestion(update);
                            goTo();
                        } else {
                            alert("Nueva pregunta");
                        }
                    } else {
                        toastError("Debe seleccionar una categoría");
                    }
                } else {
                    toastError("Debe seleccionar una opción como correcta");
                }
            } else {
                toastError("Debe ingresar al menos 2 opciones");
            }
        } else {
            toastError("Debe ingresar una pregunta");
        }
    }

    return {
        inputs: { inputDescription, inputOptions, inputQuestion },
        options: {
            options,
            setOptions,
            correctOption,
            setCorrectOption,
            editOption,
            setEditOption,
        },
        category: { selectedCategory, setSelectedCategory },
        handlers: {
            handleAddOption: handlerAddOption,
            handleCancelEditOption: handlerCancelEditOption,
            handleDeleteOption: handlerDeleteOption,
            handleEditOption: handlerEditOption,
            onSubmit,
        },
    };
}