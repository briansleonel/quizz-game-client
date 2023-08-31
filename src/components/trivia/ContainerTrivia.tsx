export default function ContainerTrivia({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full min-h-[calc(100vh-4rem)] flex justify-center items-center bg-backgroundTrivia bg-no-repeat bg-cover bg-fixed">
            {children}
        </div>
    );
}
