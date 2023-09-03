import { MouseEvent } from "react";

export default function ButtonTrivia({
    onClickFn,
    children,
    title,
    className,
}: {
    onClickFn: (e: MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
    title: string;
    className?: string;
    //type: 'submit' | 'reset' | 'button' | undefined;
}) {
    return (
        <button
            className={`rounded backdrop-blur-sm backdrop-filter bg-zinc-950/5 text-purple-500 hover:text-purple-600 border border-purple-500 hover:border-purple-600 hover:scale-105 transition-all duration-500 mx-auto px-12 py-4 font-bold text-xl tracking-widest uppercase ${className}`}
            onClick={onClickFn}
            title={title}
        >
            {children}
        </button>
    );
}
