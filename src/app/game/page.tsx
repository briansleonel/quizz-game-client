import GameForm from "@/components/forms/game/GameForm";
import { Title } from "@/components/layout/Title";
import ContentTrivia from "@/components/trivia/ContentTrivia";

export default function GamePage() {
    return (
        <ContentTrivia className="gap-6">
            <Title className="text-white !text-4xl ">QUIZZ</Title>
            <GameForm />
        </ContentTrivia>
    );
}
