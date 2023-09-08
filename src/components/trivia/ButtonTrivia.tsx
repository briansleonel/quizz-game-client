import { classNames } from "@/libs/classNames";
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
            className={classNames(
                "rounded bg-purple-600 text-white hover:text-white shadow shadow-neutral-900 transition-all duration-500 mx-auto px-12 py-4 font-bold text-xl tracking-widest uppercase",
                className ? className : ""
            )}
            onClick={onClickFn}
            title={title}
        >
            {children}
        </button>
    );
}
