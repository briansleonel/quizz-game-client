import { classNames } from "@/libs/classNames";
import { ButtonHTMLAttributes } from "react";

interface Props {
    type?: "button" | "submit" | "reset";
    text: string;
    className?: string;
    bgColor?: string;
    bgColorHover?: string;
    color?: string;
}

export default function Button({
    type,
    text,
    className,
    bgColor,
    bgColorHover,
    color,
}: Props) {
    return (
        <button
            type={type}
            className={classNames(
                "uppercase font-medium  p-2 rounded-md  transition-colors ease-in-out duration-500 text-white bg-blue-700 hover:bg-blue-600",
                className ? className : ""
            )}
        >
            {text}
        </button>
    );
}
