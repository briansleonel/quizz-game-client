import { useAppSelector } from "@/store/hooks.redux";
import ReplyButton from "./ReplyButton";
import { useEffect, useState } from "react";
import { Check, X } from "react-bootstrap-icons";

export default function ShowRandomOptions({
    selectedAnswer,
    selectedOption,
    isCorrectOption,
    onSelectAnswer,
}: {
    selectedAnswer: boolean;
    selectedOption: string;
    isCorrectOption: () => boolean;
    onSelectAnswer: (selected: string) => void;
}) {
    const { currentQuestion } = useAppSelector((state) => state.game);
    const [randomOptions, setRandomOptions] = useState<Array<string>>([]);

    /**
     * Se usa este Hook para ver cada vez que se actualiza la pregunta que se muestra actualmente, para poder mostrar las opciones de forma aleatorio
     */
    useEffect(() => {
        const randomOrderOptions = () => {
            if (currentQuestion) {
                const newOptions = [...currentQuestion.options];
                // ordeno de forma aleatorio las opciones
                const ordered = newOptions.sort(function () {
                    return Math.random() - 0.5;
                });

                setRandomOptions(ordered);
            }
        };
        if (currentQuestion) {
            randomOrderOptions();
        }
    }, [currentQuestion]);

    /**
     * Permite verificar si la opción que se seleccionó es la misma que la opción que se envía por parámetro. En caso de que lo sea, envía "true", y envía "false" en caso contrario.
     *
     * @param option opcion
     * @returns true - false
     */
    const isCurrentCheckOption = (option: string) => {
        return (
            selectedAnswer &&
            selectedOption.toLowerCase() === option.toLowerCase()
        );
    };

    /**
     * Permite verificar si una opción ingresada por parámetro es la misma que la opción correcta de la pregunta actual.
     *
     * @param option opcion
     * @returns true - false
     */
    const isCorrect = (option: string) => {
        if (currentQuestion) {
            const correct =
                currentQuestion.options[currentQuestion.correct].toLowerCase();
            if (correct === option.toLowerCase()) return true;
        }
        return false;
    };

    return (
        <>
            <section className="w-full grid grid-cols-2 gap-4">
                {randomOptions.length !== 0 &&
                    randomOptions.map((e, i) => (
                        <ReplyButton
                            key={i}
                            option={e}
                            onSelectAnswer={onSelectAnswer}
                            className={`${
                                isCurrentCheckOption(e)
                                    ? "!bg-neutral-800 text-white"
                                    : ""
                            } ${
                                !isCurrentCheckOption(e) && selectedAnswer
                                    ? "hover:!bg-white hover:!text-black"
                                    : ""
                            }`}
                        >
                            {e}{" "}
                            {selectedAnswer && (
                                <span className="absolute right-4 top-1/2  transform -translate-y-1/2 font-bold">
                                    {isCorrect(e) ? (
                                        <Check className="w-10 h-fit text-green-500" />
                                    ) : (
                                        <X className="w-10 h-fit text-red-500" />
                                    )}
                                </span>
                            )}
                        </ReplyButton>
                    ))}
            </section>
        </>
    );
}

/*
className={
    isCurrentCheckOption(e)
        ? isCorrectOption()
            ? "!bg-green-600 hover:bg-green-600 text-white font-medium"
            : "!bg-red-600 hover:bg-red-600 text-white font-medium"
        : ""
}
*/
