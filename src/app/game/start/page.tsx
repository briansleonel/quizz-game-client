"use client";

import AlertDanger from "@/components/alert/AlertDanger";
import ModalGameInformation from "@/components/modal/ModalGameInformation";
import AnswerQuestion from "@/components/trivia/AnswerQuestion";
import ShowQuestion from "@/components/trivia/ShowQuestion";
import ShowRandomOptions from "@/components/trivia/ShowRandomOptions";
import useModal from "@/hooks/useModal";
import { toastInformation } from "@/libs/sonner/sonner.toast";
import gameService from "@/services/game.service";
import { gameNextQuestion, gameStart } from "@/store/features/gameSlice";
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

    const { data, error, isLoading } = useQuery({
        queryKey: ["game", category, limit],
        queryFn: () =>
            gameService.getQuestionsGame({ category: category._id, limit }),
    });

    const { closeModal, openModal, showModal } = useModal();

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
     * Evento producido al seleccionar una respuesta
     * @param selected respuesta seleccionada
     */
    const onSelectAnswer = (selected: string) => {
        if (!selectedAnswer) {
            // indico que el usuario ya ha seleccionado una respuesta en el estado
            setSelectedAnswer(true);
            // asigno la opción que se selecciono al estado
            setSelectedOption(selected);
            // Abro la ventana modal con la información
            openModal();
            // verifico si la respuesta seleccionada es correcta
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

    const nextQuestion = () => {
        closeModal();
        setSelectedOption("");
        dispatch(gameNextQuestion());
        setSelectedAnswer(false);
    };

    return (
        <div className="w-full h-screen p-8 flex flex-col justify-between relative">
            {error && error instanceof Error ? (
                <AlertDanger>{error.message}</AlertDanger>
            ) : isLoading ? (
                <>Cargando preguntas</>
            ) : data && currentQuestion ? (
                <>
                    <ShowQuestion question={currentQuestion.question} />
                    {selectedAnswer && (
                        <AnswerQuestion
                            nextQuestion={nextQuestion}
                            question={{
                                isCorrect: isCorrectOption(),
                                correct:
                                    currentQuestion.options[
                                        currentQuestion.correct
                                    ],
                                description: currentQuestion.description,
                            }}
                        />
                    )}
                    <ShowRandomOptions
                        isCorrectOption={isCorrectOption}
                        selectedAnswer={selectedAnswer}
                        selectedOption={selectedOption}
                        onSelectAnswer={onSelectAnswer}
                    />
                    {/*<ModalGameInformation
                        closeModal={closeModal}
                        isOpen={showModal}
                        nextQuestion={nextQuestion}
                        question={{
                            isCorrect: isCorrectOption(),
                            correct:
                                currentQuestion.options[
                                    currentQuestion.correct
                                ],
                            description: currentQuestion.description,
                        }}
                    />*/}
                </>
            ) : null}
        </div>
    );
}
