import ContainerTrivia from "@/components/trivia/ContainerTrivia";

interface Props {
    children: React.ReactNode;
}

export default function GameLayout({ children }: Props) {
    return <ContainerTrivia>{children}</ContainerTrivia>;
}
