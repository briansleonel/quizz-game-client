import GameForm from "@/components/forms/game/GameForm";
import { Title } from "@/components/layout/Title";
import ContentTrivia from "@/components/trivia/ContentTrivia";

export default function GamePage() {
    return (
        <ContentTrivia className="gap-4">
            <Title className="text-white">Trivia</Title>
            <GameForm />
        </ContentTrivia>
    );
}
