import { classNames } from "@/libs/classNames";
import { HTMLInputTypeAttribute } from "react";
import { useFormContext } from "react-hook-form";
import InputFormContext from "./InputFormContext";

interface Props {
    name: string;
    label: string;
    type: HTMLInputTypeAttribute;
    placeholder?: string;
    className?: string;
    style?: "underline" | "default" | undefined;
    value?: string;
}

export default function InputLabel({
    label,
    name,
    type,
    placeholder,
    className,
    style,
    value,
}: Props) {
    const {
        register,
        formState: { errors },
        setValue,
    } = useFormContext();

    if (value) setValue(name, value);

    return (
        <div className={classNames("w-full", className ? className : "")}>
            <div className="text-start mb-1 w-full">
                <label htmlFor={name}>{label}</label>
            </div>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                className={classNames(
                    inputStyles,
                    style === "underline"
                        ? inputStylesUnderline
                        : "rounded-md text-gray-950 border border-gray-400 bg-stone-50 focus:border-blue-600 drop-shadow",
                    errors[name] ? "border-red-500 focus:border-red-500" : ""
                )}
                {...register(name, {
                    required: true,
                })}
            />
            {/*
            <Input
                name={name}
                type={type}
                placeholder={placeholder}
                style={style}
    />*/}
        </div>
    );
}

const inputStyles =
    "w-full px-2 py-1 transition-colors ease-in-out duration-500 outline-none";

const inputStylesDefault = "border-gray-500";

const inputStylesUnderline =
    "border-b border-gray-500 bg-transparent focus:border-gray-100";
