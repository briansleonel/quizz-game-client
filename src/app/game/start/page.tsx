"use client";

import AlertDanger from "@/components/alert/AlertDanger";
import ContentTrivia from "@/components/trivia/ContentTrivia";
import ReplyButton from "@/components/trivia/ReplyButton";
import ShowQuestion from "@/components/trivia/ShowQuestion";
import { toastInformation } from "@/libs/sonner/sonner.toast";
import gameService from "@/services/game.service";
import { gameStart } from "@/store/features/gameSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks.redux";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function StartPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { category, limit, questions, index, currentQuestion } =
        useAppSelector((state) => state.game);

    const [selectedAnswer, setSelectedAnswer] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [randomOptions, setRandomOptions] = useState<Array<string>>([]);

    const { data, error, isLoading } = useQuery({
        queryKey: ["game", category, limit],
        queryFn: () =>
            gameService.getQuestionsGame({ category: category._id, limit }),
    });

    /**
     * Se usa el hook en la primer carga del componente.
     * Se verifica que se tenga en la store los datos necesarios.
     */
    useEffect(() => {
        if (category._id === "") {
            toastInformation("Por favor seleccione los parámetros");
            return router.replace("/game");
        }
    });

    /**
     * Se usa este hook para ver cuando se cargan los datos recibidos desde react-query
     * Inicia la store con la configuración para iniciar la trivia
     */
    useEffect(() => {
        if (data) {
            dispatch(gameStart({ questions: data }));
        }
    }, [data, dispatch]);

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
     * Evento producido al seleccionar una respuesta
     * @param selected respuesta seleccionada
     */
    const onSelectAnswer = (selected: string) => {
        if (!selectedAnswer) {
            console.log("Se seleccionó una opción");
            // indico que el usuario ya ha seleccionado una respuesta
            setSelectedAnswer(true);
            setSelectedOption(selected);
            // verifico si la respuesta seleccionada es correcta
            //isCorrectAnswer(selected, question.correct);
        }
    };

    /**
     * Permite verificar si la opción seleccionada es correcta o no
     * @returns true si es correcta, false en caso contrario
     */
    const isCorrectOption = () => {
        if (currentQuestion) {
            const correct =
                currentQuestion.options[currentQuestion.correct].toLowerCase();
            if (correct === selectedOption.toLowerCase()) return true;
        }
        return false;
    };

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

    // SI ocurre un error en react-query lo muestro
    if (error && error instanceof Error) {
        return (
            <>
                <AlertDanger>{error.message}</AlertDanger>
            </>
        );
    }

    if (isLoading) {
        return <>Cargando preguntas</>;
    }

    return (
        <>
            {data && currentQuestion && (
                <ContentTrivia className="gap-4">
                    <ShowQuestion question={currentQuestion.question} />
                    {randomOptions.map((e, i) => (
                        <ReplyButton
                            key={i}
                            option={e}
                            onSelectAnswer={onSelectAnswer}
                            className={
                                isCurrentCheckOption(e)
                                    ? isCorrectOption()
                                        ? "!bg-green-600 hover:!bg-green-600 !text-white !font-medium"
                                        : "!bg-red-600 hover:!bg-red-600 !text-white !font-medium"
                                    : ""
                            }
                        />
                    ))}
                </ContentTrivia>
            )}
        </>
    );
}
