import { IQuestionId } from "@/types/question";
import { useState } from "react";
import { useFormInput, useFormTextArea } from "./useFormInput";
import { IQuestionCategory } from "@/types/questionCategory";
import { useQuestion } from "./useQuestion";
import {
    convertToQuestion,
    convertToQuestionwithId,
} from "@/libs/question.libs";
import {
    toastError,
    toastInformation,
    toastSuccess,
    toastWarning,
} from "@/libs/sonner/sonner.toast";

export default function useQuestionForm({
    question,
    edit,
}: {
    question?: IQuestionId;
    edit: boolean;
}) {
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
    const questionMutations = useQuestion();

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
                    setCorrectOption("");
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
        setCorrectOption("");
    }

    /**
     * Manejador para cancelar la edición de una opción
     */
    function handlerCancelEditOption() {
        handlerAddOption();
        setEditOption(false);
        inputOptions.setInput("");
    }

    /**
     * Manejador para eliminar una determinada opción de la lista de opciones
     * @param option opción a eliminar
     */
    function handlerDeleteOption(option: string) {
        const updated = quitOption(option);
        console.log(updated);
        setOptions(updated);
        toastWarning("Opción eliminada");
        setCorrectOption("");
    }

    /**
     * Permite filtrar el array de opciones, para así poder quitar la opción que no se usará
     * @param option opción a quitar
     * @returns un arreglo con la lista de opciones actualizada
     */
    function quitOption(option: string) {
        return options.filter((e) => e !== option);
    }
    /*
    useEffect(() => {
        
        //setCorrectOption("");
    }, [options]);
    */

    /**
     * Permite realizar el envío de los datos del formulario
     * @param e Evento de formulario
     */
    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (inputQuestion.inputProps.value) {
            if (options.length >= 2) {
                if (correctOption !== "") {
                    if (selectedCategory._id !== "") {
                        if (edit) {
                            console.log("Editando...", options);

                            const update = convertToQuestionwithId({
                                id: question?._id!,
                                question: inputQuestion.inputProps.value,
                                category: selectedCategory,
                                description: inputDescription.inputProps.value,
                                user: question?.user!,
                                correctOption,
                                options,
                            });
                            questionMutations.handlerUpdateQuestion(update);
                        } else {
                            console.log("Nuevo...", options);
                            const newQuestion = convertToQuestion({
                                question: inputQuestion.inputProps.value,
                                category: selectedCategory,
                                description: inputDescription.inputProps.value,
                                correctOption,
                                options,
                            });
                            questionMutations.handlerAddQuestion(newQuestion);
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
