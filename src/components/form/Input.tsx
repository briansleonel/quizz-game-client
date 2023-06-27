import { classNames } from "@/libs/classNames";
import { HTMLInputTypeAttribute } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
    name: string;
    type: HTMLInputTypeAttribute;
    placeholder?: string;
    className?: string;
}

export default function Input({ name, type, placeholder, className }: Props) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <input
            type={type}
            placeholder={placeholder}
            className={classNames(
                "w-full px-2 py-1 border-b border-gray-500 transition-colors ease-in-out duration-500 focus:border-gray-100 bg-transparent outline-none",
                errors.username ? "border-red-500 focus:border-red-500" : "",
                className ? className : ""
            )}
            {...register(name, {
                required: true,
            })}
        />
    );
}

/**
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

export default function Input({
    inputProps,
    name,
    type,
    className,
    placeholder,
}: Props) {
    return (
        <input
            type={type}
            id={name}
            name={name}
            className={classNames(
                "w-full px-2 py-1 border-b border-gray-500 transition-colors ease-in-out duration-500 focus:border-gray-100 bg-transparent outline-none invalid:border-red-500",
                className ? className : ""
            )}
            placeholder={placeholder}
            required={true}
            {...inputProps}
        />
    );
}
 */
