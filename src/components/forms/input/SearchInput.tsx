import { classNames } from "@/libs/classNames";
import { HTMLInputTypeAttribute } from "react";
import { XLg } from "react-bootstrap-icons";

interface Props {
    name: string;
    type: HTMLInputTypeAttribute;
    placeholder?: string;
    className?: string;
    inputProps: {
        value: string;
        onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    };
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SearchInput = ({
    name,
    type,
    inputProps,
    className,
    onClick,
}: Props) => {
    return (
        <div
            className={classNames(
                "w-full flex transition-colors ease-in-out duration-500 outline-none rounded-md text-gray-950 border border-gray-400 bg-zinc-50 focus-within:border-violet-900 drop-shadow",
                className ? className : ""
            )}
        >
            <input
                className="w-full outline-none px-2 py-1 bg-transparent rounded-md text-base"
                type={type}
                name={name}
                id={name}
                {...inputProps}
            />
            <button
                className={`px-2 text-neutral-800 hover:bg-neutral-300 hover:text-neutral-950 rounded-e-md transition-colors ease-in-out duration-500 ${
                    inputProps.value === "" ? "hidden" : "inline"
                }`}
                onClick={onClick}
                title="Limpiar"
            >
                <XLg />
            </button>
        </div>
    );
};
