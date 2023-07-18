interface Props {
    className?: string;
    children: React.ReactNode;
}

export function Title({ className, children }: Props) {
    return (
        <div className="w-full border-b-2 border-violet-500 pb-1">
            <h1
                className={`font-medium text-2xl text-center uppercase text-neutral-800 ${
                    className ? className : ""
                }`}
            >
                {children}
            </h1>
        </div>
    );
}

export function SubTitle({ className, children }: Props) {
    return (
        <div className="w-full">
            <h2
                className={`font-semibold text-2xl text-center uppercase text-neutral-800 ${
                    className ? className : ""
                }`}
            >
                {children}
            </h2>
        </div>
    );
}
