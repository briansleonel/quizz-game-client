export default function ContainerUtil({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full flex flex-col items-center gap-8 py-10 px-4 md:px-8 md:py-12">
            {children}
        </div>
    );
}
