import { classNames } from "@/libs/classNames";
import { HTMLInputTypeAttribute } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
    name: string;
    type: HTMLInputTypeAttribute;
    placeholder?: string;
    className?: string;
    style?: "underline" | "default" | undefined;
}

export default function InputFormContext({
    name,
    type,
    placeholder,
    className,
    style,
}: Props) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <input
            id={name}
            type={type}
            placeholder={placeholder}
            className={classNames(
                inputStyles,
                style === "underline"
                    ? inputStylesUnderline
                    : "rounded-md text-gray-950 border border-gray-400 bg-zinc-100 focus:border-violet-900",
                errors.username ? "border-red-500 focus:border-red-500" : "",
                className ? className : ""
            )}
            {...register(name, {
                required: true,
            })}
        />
    );
}

const inputStyles =
    "w-full px-2 py-1 transition-colors ease-in-out duration-500 outline-none";

const inputStylesUnderline =
    "border-b border-gray-500 bg-transparent focus:border-gray-100";
