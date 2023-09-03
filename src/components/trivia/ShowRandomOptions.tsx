import { useAppSelector } from "@/store/hooks.redux";
import ReplyButton from "./ReplyButton";
import { useEffect, useState } from "react";

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
     * @param option opcion
     * @returns true - false
     */
    const isCurrentCheckOption = (option: string) => {
        return (
            selectedAnswer &&
            selectedOption.toLowerCase() === option.toLowerCase()
        );
    };

    return (
        <>
            <section className="w-full grid grid-cols-2 gap-6">
                {randomOptions.length !== 0 &&
                    randomOptions.map((e, i) => (
                        <ReplyButton
                            key={i}
                            option={e}
                            onSelectAnswer={onSelectAnswer}
                            className={
                                isCurrentCheckOption(e)
                                    ? isCorrectOption()
                                        ? "!bg-green-600 hover:bg-green-600 text-white font-medium"
                                        : "!bg-red-600 hover:bg-red-600 text-white font-medium"
                                    : ""
                            }
                        />
                    ))}
            </section>
        </>
    );
}
