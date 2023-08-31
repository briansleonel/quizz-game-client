import GameForm from "@/components/forms/game/GameForm";
import { Title } from "@/components/layout/Title";
import ContainerTrivia from "@/components/trivia/ContainerTrivia";
import ContentTrivia from "@/components/trivia/ContentTrivia";

export default function GamePage() {
    return (
        <div className="m-0 md:ml-16 ">
            <ContainerTrivia>
                <ContentTrivia className="gap-4">
                    <Title className="text-white">Trivia</Title>

                    <GameForm />
                </ContentTrivia>
            </ContainerTrivia>
        </div>
    );
}
