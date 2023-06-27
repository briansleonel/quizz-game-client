import { classNames } from "@/libs/classNames";
import { ButtonHTMLAttributes } from "react";

interface Props {
    type?: "button" | "submit" | "reset";
    text: string;
    className?: string;
}

export default function ButtonPrimary({ type, text, className }: Props) {
    return (
        <button
            type={type}
            className={classNames(
                "w-full uppercase font-medium bg-sky-600 p-2 rounded-md",
                className ? className : ""
            )}
        >
            {text}
        </button>
    );
}
