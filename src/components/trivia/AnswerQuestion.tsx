import { useAppSelector } from "@/store/hooks.redux";
import ButtonTrivia from "./ButtonTrivia";
import ModalGameInformation from "../modal/ModalGameInformation";

interface Props {
    question: { isCorrect: boolean; correct: string; description: string };
    nextQuestion: () => void;
}

export default function AnswerQuestion({ nextQuestion, question }: Props) {
    const { hasNext } = useAppSelector((state) => state.game);

    return (
        <div className="w-full flex flex-col gap-8 items-center">
            <div
                className={`w-fit rounded py-4 px-20 transform -skew-x-12 ${
                    question.isCorrect ? "bg-green-600" : "bg-red-600"
                }`}
            >
                <div className="transform skew-x-12">
                    <h3 className="uppercase text-2xl md:text-4xl font-light text-center text-white">
                        ¡Respuesta{" "}
                        {question.isCorrect ? "correcta" : "incorrecta"}!
                    </h3>
                </div>
            </div>

            <div className="flex items-center justify-center gap-12">
                <ModalGameInformation />

                {/** BOTONES PARA CONTINUAR O FINALIZAR LA TRIVIA */}
                {hasNext ? (
                    <ButtonTrivia
                        onClickFn={() => nextQuestion()}
                        title="Siguiente pregunta"
                        className="!bg-purple-600 text-white hover:text-white border-none shadow shadow-neutral-900"
                    >
                        Continuar
                    </ButtonTrivia>
                ) : (
                    <ButtonTrivia
                        onClickFn={() => function () {}}
                        title=""
                        className="!bg-neutral-900 text-white hover:text-white border-none shadow shadow-neutral-900"
                    >
                        Finalizar
                    </ButtonTrivia>
                )}
            </div>
        </div>
    );
}
