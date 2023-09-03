export default function ContainerTrivia({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-backgroundTrivia bg-no-repeat bg-cover bg-fixed">
            {children}
        </div>
    );
}
