import ContainerTrivia from "@/components/trivia/ContainerTrivia";

interface Props {
    children: React.ReactNode;
}

export default function GameLayout({ children }: Props) {
    return (
        <div className="m-0 md:ml-16 ">
            <ContainerTrivia>{children}</ContainerTrivia>
        </div>
    );
}
