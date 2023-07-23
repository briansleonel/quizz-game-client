import { classNames } from "@/libs/classNames";
import { ButtonHTMLAttributes } from "react";

interface Props {
    type?: "button" | "submit" | "reset";
    children: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ type, children, className, onClick }: Props) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={classNames(
                "uppercase font-light  p-2 rounded-md  transition-colors ease-in-out duration-500 text-white bg-blue-700 hover:bg-blue-600 drop-shadow",
                className ? className : ""
            )}
        >
            {children}
        </button>
    );
}
