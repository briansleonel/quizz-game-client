import { classNames } from "@/libs/classNames";
import { HTMLInputTypeAttribute } from "react";

interface Props {
    name: string;
    type: HTMLInputTypeAttribute;
    placeholder?: string;
    className?: string;
    inputProps: {
        value: string;
        onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    };
}

export const InputText = ({ name, type, inputProps, className }: Props) => {
    return (
        <input
            className={classNames(
                "w-full px-2 py-1 transition-colors ease-in-out duration-500 outline-none rounded-md text-gray-950 border border-gray-400 bg-zinc-100 focus:border-violet-900 drop-shadow",
                className ? className : ""
            )}
            type={type}
            name={name}
            id={name}
            {...inputProps}
        />
    );
};
