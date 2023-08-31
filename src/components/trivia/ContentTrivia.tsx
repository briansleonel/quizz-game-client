export default function ContentTrivia({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <section
            className={`flex flex-col p-8 rounded w-full sm:w-2/3 md:w-2/4 lg:w-2/5 backdrop-blur-sm backdrop-filter text-white bg-zinc-950/40 ${
                className ? className : ""
            }`}
        >
            {children}
        </section>
    );
}

// min-h-[26rem] md:min-h-[22rem]